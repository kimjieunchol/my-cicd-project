import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({ currentDate, onPrev, onNext }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 왼쪽: 캘린더 아이콘과 제목 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">캘린더</h2>
            <p className="text-indigo-100 text-xs">월간 일정 보기</p>
          </div>
        </div>

        {/* 오른쪽: 월 네비게이션 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrev}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="이전 달"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <span className="text-white font-medium px-4 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>

          <button
            onClick={onNext}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="다음 달"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
