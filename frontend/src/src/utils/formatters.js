// 공지사항 데이터를 챗봇 응답 형식으로 포맷팅
export const formatNotices = (notices) => {
  if (!notices || notices.length === 0) {
    return "죄송합니다. 해당하는 공지사항을 찾을 수 없습니다. 😢";
  }

  // 공지사항이 배열이 아닌 경우 (단일 객체)
  if (!Array.isArray(notices)) {
    return formatSingleNotice(notices);
  }

  // 공지사항이 배열인 경우
  if (notices.length === 1) {
    return formatSingleNotice(notices[0]);
  }

  // 여러 개의 공지사항
  let response = `총 ${notices.length}개의 공지사항을 찾았습니다:\n\n`;

  notices.forEach((notice, index) => {
    response += `${index + 1}. ${notice.content || notice.title}\n`;
    if (notice.department) {
      response += `   📌 부서: ${notice.department}\n`;
    }
    if (notice.date) {
      response += `   📅 날짜: ${notice.date}\n`;
    }
    if (notice.priority) {
      const priorityEmoji = getPriorityEmoji(notice.priority);
      response += `   ${priorityEmoji} 우선순위: ${notice.priority}\n`;
    }
    response += `\n`;
  });

  return response.trim();
};

// 단일 공지사항 포맷팅
const formatSingleNotice = (notice) => {
  let response = `📢 공지사항을 찾았습니다!\n\n`;
  response += `제목: ${notice.content || notice.title}\n`;

  if (notice.department) {
    response += `부서: ${notice.department}\n`;
  }
  if (notice.date) {
    response += `날짜: ${notice.date}\n`;
  }
  if (notice.priority) {
    const priorityEmoji = getPriorityEmoji(notice.priority);
    response += `${priorityEmoji} 우선순위: ${notice.priority}\n`;
  }
  if (notice.description) {
    response += `\n${notice.description}`;
  }

  return response;
};

// 우선순위별 이모지 반환
const getPriorityEmoji = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "🔴";
    case "medium":
      return "🟡";
    case "low":
      return "🟢";
    default:
      return "⚪";
  }
};

// 날짜 포맷팅
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 시간 포맷팅
export const formatTime = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// 날짜와 시간 모두 포맷팅
export const formatDateTime = (date) => {
  if (!date) return "";

  return `${formatDate(date)} ${formatTime(date)}`;
};

// 우선순위별 색상 반환
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

// 우선순위별 텍스트 반환
export const getPriorityText = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "높음";
    case "medium":
      return "보통";
    case "low":
      return "낮음";
    default:
      return "미정";
  }
};
