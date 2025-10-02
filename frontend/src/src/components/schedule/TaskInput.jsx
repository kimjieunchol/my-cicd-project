import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

const TaskInput = ({ value, onChange, onAdd }) => {
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showOptions, setShowOptions] = useState(false);

  // Enter 키 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd({ title: value, priority, dueDate });
    // 초기화
    setPriority("medium");
    setDueDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="p-4 border-t bg-white flex-shrink-0">
      <div className="flex space-x-2">
        {/* 입력창 */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 할 일 추가..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 text-gray-800 placeholder-gray-500"
        />

        {/* 추가 버튼 */}
        <button
          onClick={handleAdd}
          disabled={!value.trim()}
          className={`px-4 py-2 rounded-xl transition-all ${
            value.trim()
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          title="할 일 추가"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* 상세 옵션 토글 버튼 */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="mt-2 flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            showOptions ? "rotate-180" : ""
          }`}
        />
        <span>상세 옵션</span>
      </button>

      {/* 상세 옵션 (접히는 영역) */}
      {showOptions && (
        <div className="mt-3 space-y-3">
          {/* 중요도 선택 */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              중요도
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setPriority("high")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  priority === "high"
                    ? "bg-red-50 text-red-600 border-2 border-red-300"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                높음
              </button>
              <button
                onClick={() => setPriority("medium")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  priority === "medium"
                    ? "bg-yellow-50 text-yellow-600 border-2 border-yellow-300"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                보통
              </button>
              <button
                onClick={() => setPriority("low")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  priority === "low"
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-300"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                낮음
              </button>
            </div>
          </div>

          {/* 마감일 선택 */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              마감일
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setDueDate(new Date().toISOString().split("T")[0])
                }
                className="px-3 py-1.5 text-xs bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                오늘
              </button>
              <button
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setDueDate(tomorrow.toISOString().split("T")[0]);
                }}
                className="px-3 py-1.5 text-xs bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                내일
              </button>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 도움말 텍스트 */}
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
        <span>Enter 키를 눌러 빠르게 추가</span>
        <span>총 {value.length}자</span>
      </div>
    </div>
  );
};

export default TaskInput;
