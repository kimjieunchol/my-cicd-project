import React from "react";
import { Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import ConnectionBadge from "../common/ConnectionBadge";

const ChatHeader = ({ status, error, onRefresh }) => {
  // 상태별 메시지
  const getStatusMessage = () => {
    switch (status) {
      case "connected":
        return "항상 도움을 드릴 준비가 되어있어요";
      case "connecting":
        return "서버에 연결하는 중...";
      case "disconnected":
        return "연결이 끊어졌습니다";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* 왼쪽: 봇 아이콘과 제목 */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <ConnectionBadge status={status} />
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">
              A_hub 공지 어시스턴트
            </h3>
            <p className="text-blue-100 text-sm">{getStatusMessage()}</p>
          </div>
        </div>

        {/* 오른쪽: 상태 아이콘들 */}
        <div className="flex items-center space-x-2">
          {error && (
            <AlertCircle className="w-5 h-5 text-red-300" title={error} />
          )}
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="서버 상태 확인"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
