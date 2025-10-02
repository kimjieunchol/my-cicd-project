import React from "react";

const ChatInput = ({ input, setInput, onSend, isConnected, suggestions }) => {
  // Enter 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
      {/* 입력창과 전송 버튼 */}
      <div className="flex space-x-3 items-end">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isConnected
                ? "공지사항에 대해 궁금한 것을 물어보세요..."
                : "서버 연결을 기다리는 중..."
            }
            disabled={!isConnected}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50 text-gray-800 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          onClick={onSend}
          disabled={!input.trim() || !isConnected}
          className={`px-4 py-3 rounded-xl transition-all duration-200 ${
            input.trim() && isConnected
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          전송
        </button>
      </div>

      {/* 추천 질문 버튼들 */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setInput(suggestion)}
              disabled={!isConnected}
              className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* 연결 상태 표시 */}
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
        <span>상태: {isConnected ? "연결됨" : "연결 끊김"}</span>
        <span>REST API 연결</span>
      </div>
    </div>
  );
};

export default ChatInput;
