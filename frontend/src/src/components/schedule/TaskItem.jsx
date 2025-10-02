import React from "react";
import { Check, Trash2 } from "lucide-react";
import { getPriorityColor, getPriorityText } from "../../utils/formatters";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-gray-50 border-gray-200 opacity-75"
          : "bg-white border-gray-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between">
        {/* 왼쪽: 체크박스와 내용 */}
        <div className="flex items-start space-x-3 flex-1">
          {/* 체크박스 */}
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              task.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 hover:border-green-500 hover:bg-green-50"
            }`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* 할 일 내용 */}
          <div className="flex-1">
            <h3
              className={`font-medium mb-2 ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>

            {/* 메타 정보 */}
            <div className="flex items-center flex-wrap gap-2">
              {/* 우선순위 뱃지 */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityText(task.priority)}
              </span>

              {/* 마감일 */}
              <span className="text-xs text-gray-500 flex items-center">
                📅 {task.dueDate}
              </span>

              {/* 완료 상태 뱃지 */}
              {task.completed && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  ✓ 완료됨
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 삭제 버튼 */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
          title="삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
