import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(2025, 8, 30),
      title: "팀 미팅",
      type: "meeting",
    },
    {
      id: 2,
      date: new Date(2025, 9, 5),
      title: "프로젝트 마감",
      type: "deadline",
    },
    {
      id: 3,
      date: new Date(2025, 9, 15),
      title: "월례회의",
      type: "meeting",
    },
  ]);

  // 해당 월의 첫 날과 총 일수 계산
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 첫 날의 요일 (0: 일요일, 6: 토요일)
    const firstDay = new Date(year, month, 1).getDay();

    // 해당 월의 총 일수
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  // 특정 날짜의 이벤트 가져오기
  const getEventsForDate = (day) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return events.filter(
      (event) =>
        event.date.getDate() === targetDate.getDate() &&
        event.date.getMonth() === targetDate.getMonth() &&
        event.date.getFullYear() === targetDate.getFullYear()
    );
  };

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // 이벤트 추가
  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now() }]);
  };

  // 이벤트 삭제
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    currentDate,
    events,
    getDaysInMonth,
    getEventsForDate,
    prevMonth,
    nextMonth,
    addEvent,
    deleteEvent,
  };
};

export default useCalendar;
