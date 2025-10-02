// src/hooks/useScheduleCalendar.js
import { useState, useEffect, useCallback } from "react";
import {
  getUserSchedules,
  createSchedule,
  toggleCompleteSchedule,
  deleteSchedule,
  getUserEvents,
} from "../services/api";

const useScheduleCalendar = (user) => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // ---------- 1️⃣ 초기 데이터 로드 ----------
  const loadSchedules = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const schedules = await getUserSchedules(user.id);
      setTasks(schedules);

      const scheduleEvents = schedules.map((schedule) => ({
        id: `schedule-${schedule.id}`,
        date: new Date(schedule.dueDate),
        title: schedule.title,
        type: "schedule",
        priority: schedule.priority,
        completed: schedule.completed,
      }));

      setEvents((prev) => {
        const nonScheduleEvents = prev.filter((e) => e.type !== "schedule");
        return [...nonScheduleEvents, ...scheduleEvents];
      });
    } catch (err) {
      console.error("Failed to load schedules:", err);
      setError("스케줄을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadEvents = useCallback(async () => {
    if (!user) return;
    try {
      const calendarData = await getUserEvents(user.id);
      const calendarEvents = calendarData.map((event) => ({
        id: `event-${event.id}`,
        date: new Date(event.eventDate),
        title: event.title,
        type: event.eventType || "event",
        time: event.eventTime,
      }));

      setEvents((prev) => {
        const scheduleEvents = prev.filter((e) => e.type === "schedule");
        return [...scheduleEvents, ...calendarEvents];
      });
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  }, [user]);

  // ---------- 2️⃣ useEffect로 초기 로드 ----------
  useEffect(() => {
    loadSchedules();
    loadEvents();
  }, [loadSchedules, loadEvents]);

  // ---------- 3️⃣ 이벤트/스케줄 추가 (수정됨) ----------
  const addTask = async ({ title, priority, dueDate }) => {
    if (!title?.trim() || !user) return;

    try {
      const savedTask = await createSchedule({
        userId: user.id,
        title: title,
        priority: priority,
        dueDate: dueDate,
        description: "",
      });

      setTasks((prev) => [savedTask, ...prev]);

      const newEvent = {
        id: `schedule-${savedTask.id}`,
        date: new Date(savedTask.dueDate),
        title: savedTask.title,
        type: "schedule",
        priority: savedTask.priority,
        completed: savedTask.completed,
      };

      setEvents((prev) => {
        const filtered = prev.filter((e) => e.id !== newEvent.id);
        return [...filtered, newEvent];
      });

      setNewTask("");
    } catch (err) {
      console.error(err);
      setError("작업 추가에 실패했습니다.");
    }
  };

  // ---------- 4️⃣ 완료 토글 ----------
  const toggleComplete = async (id) => {
    try {
      const updatedTask = await toggleCompleteSchedule(id);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );

      setEvents((prev) =>
        prev.map((event) =>
          event.id === `schedule-${id}`
            ? { ...event, completed: updatedTask.completed }
            : event
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- 5️⃣ 삭제 ----------
  const deleteTaskById = async (id) => {
    try {
      await deleteSchedule(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setEvents((prev) =>
        prev.filter((event) => event.id !== `schedule-${id}`)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- 6️⃣ 캘린더 헬퍼 ----------
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

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

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );

  return {
    tasks,
    newTask,
    setNewTask,
    addTask,
    toggleComplete,
    deleteTask: deleteTaskById,
    currentDate,
    events,
    getDaysInMonth,
    getEventsForDate,
    prevMonth,
    nextMonth,
    loading,
    error,
    refresh: () => {
      loadSchedules();
      loadEvents();
    },
  };
};

export default useScheduleCalendar;
