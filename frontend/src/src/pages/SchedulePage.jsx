import React from "react";
import ScheduleView from "./ScheduleView";
import CalendarView from "./CalendarView";
import useScheduleCalendar from "../../hooks/useScheduleCalendar";

const SchedulePage = ({ user, onLoginClick }) => {
  const {
    tasks = [], // 기본값 빈 배열
    newTask = "",
    setNewTask,
    addTask,
    toggleComplete,
    deleteTask,
    currentDate,
    prevMonth,
    nextMonth,
  } = useScheduleCalendar(user);

  return (
    <div className="flex h-full">
      {/* 왼쪽: 일정 리스트 */}
      <div className="w-1/2 border-r">
        <ScheduleView
          user={user}
          onLoginClick={onLoginClick}
          tasks={tasks}
          newTask={newTask}
          setNewTask={setNewTask}
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
