// src/components/layout/Header.jsx
import React from "react";

const Header = ({ user, logout }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          A_hub 통합 관리 시스템
        </h1>
        <p className="text-gray-500 text-sm">
          공지사항, 일정, 챗봇을 한 곳에서 관리하세요
        </p>
      </div>

      {user ? (
        <button
          onClick={logout}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          로그아웃
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
