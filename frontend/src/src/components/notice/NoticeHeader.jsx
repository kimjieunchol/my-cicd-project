import React from "react";
import { Bell, Search } from "lucide-react";

const NoticeHeader = ({ searchTerm, setSearchTerm, count }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 px-6 py-5">
      {/* 제목과 카운트 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl">전체 공지사항</h2>
            <p className="text-blue-100 text-sm">최신 공지를 확인하세요</p>
          </div>
        </div>

        <div className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
          {count}개
        </div>
      </div>

      {/* 검색 바 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="공지사항 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-0 outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default NoticeHeader;
