package com.a_hub.service;

import com.a_hub.entity.Notice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatBotService {

    private final NoticeSearchService noticeSearchService;
    private final OpenAIService openAIService;  // 우리가 만든 래퍼 사용

    /**
     * 사용자 질문에 대한 답변 생성
     */
    public String answerUserQuestion(String userMessage) {
        try {
            // 1. 사용자 질문을 벡터로 변환
            float[] queryVector = noticeSearchService.getEmbedding(userMessage);
            
            // 2. "최신", "최근", "오늘", "이번주" 등의 키워드 체크
            boolean isRecentQuery = userMessage.matches(".*(?:최신|최근|오늘|이번주|이번달|요즘).*");
            
            List<Notice> similarNotices;
            if (isRecentQuery) {
                // 최근 30일 이내 공지만 검색
                log.info("Detected recent query, searching last 30 days");
                similarNotices = noticeSearchService.searchRecentNotices(queryVector, 3, 30);
            } else {
                // 일반 검색 (최신성 가중치 적용)
                similarNotices = noticeSearchService.searchSimilarNotices(queryVector, 3);
            }
            
            if (similarNotices.isEmpty()) {
                return "죄송합니다. 관련된 공지사항을 찾을 수 없습니다.";
            }
            
            // 3. 검색된 공지사항들을 컨텍스트로 구성
            StringBuilder context = new StringBuilder();
            context.append("다음은 관련된 공지사항들입니다:\n\n");
            
            for (int i = 0; i < similarNotices.size(); i++) {
                Notice notice = similarNotices.get(i);
                
                // content의 앞부분을 제목처럼 사용 (최대 50자)
                String contentPreview = notice.getContent();
                if (contentPreview.length() > 50) {
                    contentPreview = contentPreview.substring(0, 50) + "...";
                }
                
                context.append(String.format("=== 공지 %d ===\n", i + 1));
                context.append(String.format("요약: %s\n", contentPreview));
                
                if (notice.getDepartment() != null) {
                    context.append(String.format("부서: %s\n", notice.getDepartment()));
                }
                
                if (notice.getPostDate() != null) {
                    context.append(String.format("작성일: %s\n", notice.getPostDate()));
                }
                
                if (notice.getContact() != null) {
                    context.append(String.format("연락처: %s\n", notice.getContact()));
                }
                
                context.append(String.format("전체 내용:\n%s\n\n", notice.getContent()));
            }
            
            // 4. GPT에게 질문과 컨텍스트 전달
            String prompt = String.format(
                "당신은 A_hub 공지사항 어시스턴트입니다. 다음 공지사항들을 참고하여 사용자의 질문에 자연스럽게 답변해주세요.\n\n" +
                "%s\n" +
                "사용자 질문: %s\n\n" +
                "답변 작성 지침:\n" +
                "- 이모지를 적절히 사용하여 친근하게 답변 (예: 📢, ✅, 📅, 📞)\n" +
                "- 찾은 공지사항의 핵심 내용을 간단명료하게 설명\n" +
                "- 부서, 날짜, 연락처 등 중요 정보는 반드시 포함\n" +
                "- 여러 공지가 있으면 번호를 매겨 구분\n" +
                "- 자연스럽고 대화체로 작성",
                context.toString(),
                userMessage
            );
            
            String answer = openAIService.chat(prompt);
            
            log.info("User question: {}", userMessage);
            log.info("Found {} similar notices", similarNotices.size());
            log.info("Generated answer length: {}", answer.length());
            
            return answer;
            
        } catch (Exception e) {
            log.error("Error answering question: {}", e.getMessage(), e);
            return "❌ 죄송합니다. 답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
    }
    
    /**
     * 간단한 답변 (GPT 없이 검색 결과만 반환) - 테스트용
     */
    public String simpleAnswer(String userMessage) {
        try {
            float[] queryVector = noticeSearchService.getEmbedding(userMessage);
            List<Notice> notices = noticeSearchService.searchSimilarNotices(queryVector, 3);
            
            if (notices.isEmpty()) {
                return "관련된 공지사항을 찾을 수 없습니다.";
            }
            
            StringBuilder response = new StringBuilder();
            response.append("📢 공지사항을 찾았습니다!\n\n");
            
            for (int i = 0; i < notices.size(); i++) {
                Notice notice = notices.get(i);
                
                // content 앞부분 추출
                String preview = notice.getContent();
                if (preview.length() > 100) {
                    preview = preview.substring(0, 100) + "...";
                }
                
                response.append(String.format("%d. ", i + 1));
                
                if (notice.getDepartment() != null) {
                    response.append(String.format("[%s] ", notice.getDepartment()));
                }
                
                response.append(preview);
                
                if (notice.getPostDate() != null) {
                    response.append(String.format("\n   📅 %s", notice.getPostDate()));
                }
                
                if (notice.getUrl() != null) {
                    response.append(String.format("\n   🔗 %s", notice.getUrl()));
                }
                
                response.append("\n\n");
            }
            
            return response.toString();
            
        } catch (Exception e) {
            log.error("Error in simple answer: {}", e.getMessage(), e);
            return "❌ 공지사항 검색 중 오류가 발생했습니다.";
        }
    }
}