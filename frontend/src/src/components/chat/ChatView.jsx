import React, { useRef, useEffect } from "react";
import { Bot, User, RefreshCw } from "lucide-react";
import useChat from "../../hooks/useChat";
import useConnection from "../../hooks/useConnection";

const ChatView = () => {
  const { messages, isTyping, sendMessage } = useChat();
  const { status, error, check } = useConnection();
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const suggestions = [
    "최신 공지 알려줘",
    "중요 공지가 뭐야?",
    "내 부서 공지는?",
  ];
  const isConnected = status === "connected";

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                A_hub 공지 어시스턴트
              </h3>
              <p className="text-blue-100 text-sm">
                {status === "connected"
                  ? "항상 도움을 드릴 준비가 되어있어요"
                  : status === "connecting"
                  ? "서버에 연결하는 중..."
                  : "연결이 끊어졌습니다"}
              </p>
            </div>
          </div>
          <button
            onClick={check}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              {msg.type === "bot" && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              {/* 메시지 버블: content만 표시 */}
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                    : msg.error
                    ? "bg-red-50 text-red-800 rounded-bl-md border border-red-200"
                    : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                }`}
              >
                {/* 메시지 버블: text가 없으면 content 앞부분 사용 */}
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.text ||
                    (msg.content ? msg.content.slice(0, 50) + "..." : "")}
                </p>

                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {msg.type === "user" && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
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
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder={
              isConnected
                ? "공지사항에 대해 궁금한 것을 물어보세요..."
                : "서버 연결을 기다리는 중..."
            }
            disabled={!isConnected}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !isConnected}
            className={`px-6 py-3 rounded-xl transition-all ${
              input.trim() && isConnected
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            전송
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setInput(suggestion)}
              disabled={!isConnected}
              className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 border border-blue-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
