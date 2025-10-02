import React from "react";

const ConnectionBadge = ({ status }) => {
  // 상태별 색상 결정
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-400";
      case "connecting":
        return "bg-yellow-400 animate-pulse";
      case "disconnected":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="absolute -bottom-0.5 -right-0.5">
      <div
        className={`w-3 h-3 rounded-full border-2 border-white ${getStatusColor()}`}
        title={status}
      />
    </div>
  );
};

export default ConnectionBadge;
