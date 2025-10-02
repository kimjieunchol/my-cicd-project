import axios from "axios";

const API_BASE = "http://localhost:8080/api/notices";
const WS_URL = "ws://localhost:8080/ws";

// 기존 API 함수들
export const getAllNotices = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const searchNotice = async (query) => {
  const res = await axios.get(`${API_BASE}/search?q=${query}`);
  return res.data;
};

// WebSocket 연결 함수 추가
export const connectWebSocket = (onMessageCallback) => {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageCallback(data);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};
