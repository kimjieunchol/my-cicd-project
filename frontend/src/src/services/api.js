// src/services/api.js
import axios from "axios";

// ==================== Axios 인스턴스 ====================
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // ✅ 쿠키/세션 허용
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== API Base URLs ====================
const NOTICE_API_BASE = "/api/notices";
const CHAT_API_BASE = "/api/chat";
const SCHEDULE_API_BASE = "/api/schedules";
const CALENDAR_API_BASE = "/api/calendar";
const USER_API_BASE = "/api/users";

// ==================== 공통 에러 핸들러 ====================
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.status, error.response.data);
    return {
      status: error.response.status,
      message: error.response.data.message || "서버 오류가 발생했습니다.",
    };
  } else if (error.request) {
    console.error("Network Error:", error.request);
    return {
      status: 0,
      message: "네트워크 연결을 확인해주세요.",
    };
  } else {
    console.error("Error:", error.message);
    return {
      status: -1,
      message: error.message,
    };
  }
};

// ==================== 공지사항 API ====================
export const getAllNotices = async () => {
  try {
    const res = await api.get(NOTICE_API_BASE);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const searchNotice = async (query) => {
  try {
    const res = await api.get(`${NOTICE_API_BASE}/search`, {
      params: { q: query },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createNotice = async (noticeData) => {
  try {
    const res = await api.post(NOTICE_API_BASE, noticeData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateNotice = async (id, noticeData) => {
  try {
    const res = await api.put(`${NOTICE_API_BASE}/${id}`, noticeData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteNotice = async (id) => {
  try {
    const res = await api.delete(`${NOTICE_API_BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ==================== 챗봇 API ====================
export const sendChatMessage = async (message) => {
  try {
    const res = await api.post(`${CHAT_API_BASE}/query`, { message });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const checkServerStatus = async () => {
  try {
    const res = await api.get(`${CHAT_API_BASE}/status`);
    return res.status === 200;
  } catch (error) {
    console.warn("Chat server is unavailable:", error.message);
    return false;
  }
};

// ==================== 스케줄 API ====================
export const getAllSchedules = async () => {
  try {
    const res = await api.get(SCHEDULE_API_BASE);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSchedulesByDate = async (date) => {
  try {
    const res = await api.get(`${SCHEDULE_API_BASE}/date/${date}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createSchedule = async (scheduleData) => {
  try {
    const res = await api.post(SCHEDULE_API_BASE, scheduleData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateSchedule = async (id, scheduleData) => {
  try {
    const res = await api.put(`${SCHEDULE_API_BASE}/${id}`, scheduleData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteSchedule = async (id) => {
  try {
    const res = await api.delete(`${SCHEDULE_API_BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ✅ 추가: 특정 유저 스케줄
export const getUserSchedules = async (userId) => {
  try {
    const res = await api.get(`${SCHEDULE_API_BASE}/user/${userId}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ✅ 추가: 스케줄 완료 토글
export const toggleCompleteSchedule = async (id) => {
  try {
    const res = await api.put(`${SCHEDULE_API_BASE}/${id}/toggle`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ==================== 캘린더/이벤트 API ====================
export const getAllEvents = async () => {
  try {
    const res = await api.get(`${CALENDAR_API_BASE}/events`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getEventsByMonth = async (year, month) => {
  try {
    const res = await api.get(`${CALENDAR_API_BASE}/events/${year}/${month}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createEvent = async (eventData) => {
  try {
    const res = await api.post(`${CALENDAR_API_BASE}/events`, eventData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const res = await api.put(`${CALENDAR_API_BASE}/events/${id}`, eventData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await api.delete(`${CALENDAR_API_BASE}/events/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ✅ 추가: 특정 유저 이벤트
export const getUserEvents = async (userId) => {
  try {
    const res = await api.get(`/api/events/user/${userId}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ✅ 추가: 특정 유저 날짜별 이벤트
export const getUserEventsByDate = async (userId, date) => {
  try {
    const res = await api.get(`/api/events/user/${userId}/date/${date}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ✅ 추가: 특정 유저 월별 이벤트
export const getUserEventsByMonth = async (userId, year, month) => {
  try {
    const res = await api.get(
      `/api/events/user/${userId}/month/${year}/${month}`
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ==================== 사용자 인증 API ====================
export const loginUser = async (username, password) => {
  try {
    const res = await api.post(`${USER_API_BASE}/login`, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await api.post(`${USER_API_BASE}/register`, userData);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post(`${USER_API_BASE}/logout`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
