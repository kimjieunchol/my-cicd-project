import React from "react";
import { Bot, User, AlertCircle } from "lucide-react";

const Avatar = ({ type, error }) => {
  if (type === "bot") {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          error
            ? "bg-red-100 text-red-600"
            : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
        }`}
      >
        {error ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
      </div>
    );
  }

  if (type === "user") {
    return (
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 text-white">
        <User className="w-5 h-5" />
      </div>
    );
  }

  return null;
};

export default Avatar;
