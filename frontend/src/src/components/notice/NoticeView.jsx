import React from "react";
import { Bell } from "lucide-react";
import NoticeHeader from "./NoticeHeader";
import NoticeItem from "./NoticeItem";
import useNotices from "../../hooks/useNotices";

const NoticeView = () => {
  const { notices, searchTerm, setSearchTerm, loading } = useNotices();

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <NoticeHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        count={notices.length}
      />

      {/* 공지 목록 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {loading ? (
          // 로딩 상태
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-3"></div>
            <p>공지사항을 불러오는 중...</p>
          </div>
        ) : notices.length === 0 ? (
          // 검색 결과 없음
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-lg font-medium mb-1">검색 결과가 없습니다</p>
            <p className="text-sm">다른 키워드로 검색해보세요</p>
          </div>
        ) : (
          // 공지사항 목록
          <div className="p-6 space-y-4">
            {notices.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeView;
