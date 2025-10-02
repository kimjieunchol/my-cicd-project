import React from "react";
import { Clock } from "lucide-react";

const ScheduleHeader = ({ totalTasks, completedTasks }) => {
  // 완료율 계산
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 왼쪽: 제목과 설명 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">나의 일정 관리</h2>
            <p className="text-green-100 text-xs">
              할 일을 체크하고 관리하세요
            </p>
          </div>
        </div>

        {/* 오른쪽: 진행률 표시 */}
        <div className="text-right">
          <div className="text-white/90 text-xs font-medium mb-1">완료율</div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="text-white font-bold text-sm">
              {completionRate}%
            </span>
          </div>
          <div className="text-white/70 text-xs mt-1">
            {completedTasks} / {totalTasks} 완료
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
