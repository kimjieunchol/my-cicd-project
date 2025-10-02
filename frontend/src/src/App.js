// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./Dashboard";

// DashboardWrapper에서 navigate 호출
const DashboardWrapper = ({ user, logout, setUser }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Dashboard user={user} logout={logout} onLoginClick={handleLoginClick} />
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  // 앱 시작 시 localStorage에서 로그인 상태 확인
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={
          user ? (
            <DashboardWrapper user={user} logout={logout} setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
