import React from "react";

const CalendarGrid = ({ getDaysInMonth, getEventsForDate, currentDate }) => {
  const { firstDay, daysInMonth } = getDaysInMonth();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  // 오늘 날짜 확인
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();
  const todayDate = isCurrentMonth ? today.getDate() : null;

  // 이벤트 타입별 색상
  const getEventColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-green-100 text-green-700";
      case "deadline":
        return "bg-red-100 text-red-700";
      case "task":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-semibold py-2 ${
              index === 0
                ? "text-red-500"
                : index === 6
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {/* 빈 공간 (이전 달) */}
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="min-h-20" />
          ))}

        {/* 날짜 */}
        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1;
            const events = getEventsForDate(day);
            const isToday = day === todayDate;
            const dayOfWeek = (firstDay + i) % 7;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={day}
                className={`min-h-20 p-2 rounded-lg border transition-all cursor-pointer ${
                  isToday
                    ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                    : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                {/* 날짜 숫자 */}
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday
                      ? "text-blue-600 font-bold"
                      : isWeekend
                      ? dayOfWeek === 0
                        ? "text-red-500"
                        : "text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  {day}
                </div>

                {/* 이벤트 목록 */}
                <div className="space-y-1">
                  {events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-1.5 py-0.5 rounded truncate ${getEventColor(
                        event.type
                      )}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}

                  {/* 더 많은 이벤트가 있을 경우 */}
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{events.length - 2} 더보기
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarGrid;
