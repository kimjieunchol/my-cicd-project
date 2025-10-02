import React from "react";
import { MessageCircle, Bell, Calendar, List } from "lucide-react";
import { TABS } from "../../utils/constants";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  // 탭 목록 정의
  const tabs = [
    {
      id: TABS.CHAT,
      icon: MessageCircle,
      label: "챗봇",
      color: "from-blue-600 to-purple-600",
    },
    {
      id: TABS.NOTICES,
      icon: Bell,
      label: "공지사항",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: TABS.CALENDAR,
      icon: Calendar,
      label: "캘린더",
      color: "from-indigo-600 to-purple-600",
    },
    {
      id: TABS.MY_SCHEDULE,
      icon: List,
      label: "내 일정",
      color: "from-green-600 to-teal-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex space-x-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              isActive
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
