import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarView = ({ user, scheduleData }) => {
  const {
    currentDate,
    events,
    getDaysInMonth,
    getEventsForDate,
    prevMonth,
    nextMonth,
  } = scheduleData;

  const { firstDay, daysInMonth } = getDaysInMonth();

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const getEventColor = (event) => {
    if (event.type === "schedule") {
      if (event.completed) return "bg-gray-400";
      switch (event.priority) {
        case "high":
          return "bg-red-500";
        case "medium":
          return "bg-yellow-500";
        case "low":
          return "bg-green-500";
        default:
          return "bg-blue-500";
      }
    }
    return "bg-purple-500";
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b">
        {dayNames.map((day, idx) => (
          <div key={idx} className="py-3 text-center text-sm font-semibold">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {calendarDays.map((day, idx) => {
          const dayEvents = day ? getEventsForDate(day) : [];
          const isToday =
            day &&
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={idx}
              className={`border-r border-b p-2 ${!day ? "bg-gray-50" : ""}`}
            >
              {day && (
                <>
                  <span
                    className={
                      isToday
                        ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                        : ""
                    }
                  >
                    {day}
                  </span>
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`text-xs px-2 py-1 rounded text-white truncate ${getEventColor(
                          event
                        )}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 px-2">
                        +{dayEvents.length - 3} 더보기
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
