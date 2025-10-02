import React from "react";
import Avatar from "../common/Avatar";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start space-x-3">
        {/* 봇 아바타 */}
        <Avatar type="bot" />

        {/* 타이핑 애니메이션 */}
        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
          <div className="flex space-x-1">
            {[0, 0.1, 0.2].map((delay, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
