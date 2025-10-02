import React, { useState } from "react";
import ScheduleView from "./ScheduleView";
import CalendarView from "./CalendarView";

const SchedulePage = ({ user, onLoginClick }) => {
  // --- 할 일 상태 ---
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // --- 새 할 일 추가 ---
  const addTask = () => {
    if (!newTask.trim()) return;

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const newItem = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: "medium",
      date: dateStr,
      type: "schedule",
      dueDate: dateStr,
    };

    setTasks([newItem, ...tasks]);
    setNewTask("");
  };

  // --- 완료 토글 ---
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // --- 삭제 ---
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // --- 달력 월 이동 ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const prevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prev);
  };
  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(next);
  };

  return (
    <div className="flex h-screen">
      {/* 왼쪽: 할 일 관리 */}
      <div className="w-1/2 border-r">
        <ScheduleView
          user={user}
          onLoginClick={onLoginClick}
          tasks={tasks}
          newTask={newTask}
          setNewTask={setNewTask} // 반드시 여기서 내려줘야 함
          addTask={addTask}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      </div>

      {/* 오른쪽: 달력 */}
      <div className="w-1/2">
        <CalendarView
          tasks={tasks}
          currentDate={currentDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
