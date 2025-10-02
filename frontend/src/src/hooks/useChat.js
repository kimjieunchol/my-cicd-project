import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    // 사용자 메시지 추가
    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text,
      message: text, // message 필드도 추가
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // 백엔드 API 호출
      const response = await fetch("http://localhost:8080/api/chat/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 봇 응답 추가
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: data.message, // 백엔드에서 온 message 필드
        message: data.message, // message 필드도 저장
        timestamp: new Date(),
        error: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // 에러 메시지 추가
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "죄송합니다. 서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
        message: "죄송합니다. 서버와의 연결에 문제가 있습니다.",
        timestamp: new Date(),
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
};

export default useChat;
