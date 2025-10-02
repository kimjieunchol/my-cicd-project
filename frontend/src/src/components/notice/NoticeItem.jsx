import React from "react";
import { MessageCircle } from "lucide-react";
import { getPriorityColor, getPriorityText } from "../../utils/formatters";

const NoticeItem = ({ notice }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:shadow-md cursor-pointer group">
      {/* 상단: 우선순위, 번호, 날짜 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* 우선순위 뱃지 */}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
              notice.priority
            )}`}
          >
            {getPriorityText(notice.priority)}
          </span>

          {/* 공지 번호 */}
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {notice.seq}
          </span>
        </div>

        {/* 날짜 */}
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
          {notice.date}
        </span>
      </div>

      {/* 하단: 내용과 부서 */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* 공지 내용 */}
          <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
            {notice.content}
          </h3>

          {/* 부서 정보 */}
          <p className="text-sm text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            {notice.department}
          </p>
        </div>

        {/* 호버 시 나타나는 아이콘 */}
        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageCircle className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default NoticeItem;
