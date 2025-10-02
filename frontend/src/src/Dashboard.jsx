// Dashboard.js
import React, { useState } from "react";
import { TABS } from "./utils/constants";
import TabNavigation from "./components/layout/TabNavigation";
import ChatView from "./components/chat/ChatView";
import NoticeView from "./components/notice/NoticeView";
import CalendarView from "./components/calendar/CalendarView";
import ScheduleView from "./components/schedule/ScheduleView";
import useScheduleCalendar from "./hooks/useScheduleCalendar";

const Dashboard = ({ user, logout, onLoginClick }) => {
  const [activeTab, setActiveTab] = useState(TABS.CHAT);

  // ✅ 여기서 한 번만 호출
  const scheduleData = useScheduleCalendar(user);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.CHAT:
        return <ChatView />;
      case TABS.NOTICES:
        return <NoticeView />;
      case TABS.CALENDAR:
        return <CalendarView user={user} scheduleData={scheduleData} />;
      case TABS.MY_SCHEDULE:
        return (
          <ScheduleView
            user={user}
            onLoginClick={onLoginClick}
            scheduleData={scheduleData}
          />
        );
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              A_hub 통합 관리 시스템
            </h1>
            <p className="text-gray-600">
              공지사항, 일정, 챗봇을 한 곳에서 관리하세요
            </p>
            {user && (
              <p className="mt-2 text-gray-700 font-medium">
                안녕하세요, <span className="font-bold">{user.username}</span>{" "}
                님!
              </p>
            )}
          </div>

          <div>
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                로그인
              </button>
            )}
          </div>
        </div>

        {/* 탭 */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 탭 콘텐츠 */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ height: "calc(100vh - 240px)" }}
        >
          {renderContent()}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 A_hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
