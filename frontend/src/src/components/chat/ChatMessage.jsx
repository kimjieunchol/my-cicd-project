import React from "react";
import Avatar from "../common/Avatar";

const ChatMessage = ({ msg }) => {
  const getBubbleStyle = () => {
    if (msg.type === "user")
      return "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md";
    if (msg.error)
      return "bg-red-50 text-red-800 rounded-bl-md border border-red-200";
    return "bg-white text-gray-800 rounded-bl-md border border-gray-100";
  };

  // 메시지 텍스트 결정: message > text > content 순서로 체크
  const displayText =
    msg.message || msg.text || msg.content || "메시지가 없습니다.";

  return (
    <div
      className={`flex ${
        msg.type === "user" ? "justify-end" : "justify-start"
      } animate-fade-in`}
    >
      <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
        {msg.type === "bot" && <Avatar type="bot" error={msg.error} />}
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${getBubbleStyle()}`}>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {displayText}
          </p>
          <p className="text-xs opacity-70 mt-1">
            {msg.timestamp.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {msg.type === "user" && <Avatar type="user" />}
      </div>
    </div>
  );
};

export default ChatMessage;
