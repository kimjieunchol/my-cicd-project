// API URL
export const API_URL = "http://localhost:8080/api/chat";

// 탭 정의
export const TABS = {
  CHAT: "chat",
  NOTICES: "notices",
  CALENDAR: "calendar",
  MY_SCHEDULE: "my_schedule",
};

// 우선순위 색상
export const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

// 우선순위 텍스트
export const PRIORITY_TEXT = {
  high: "긴급",
  medium: "중요",
  low: "일반",
};

// 연결 상태 색상
export const CONNECTION_COLORS = {
  connected: "bg-green-400",
  connecting: "bg-yellow-400 animate-pulse",
  disconnected: "bg-red-400",
};
