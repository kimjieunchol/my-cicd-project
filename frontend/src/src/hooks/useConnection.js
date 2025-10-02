import { useState, useEffect, useCallback } from "react";
import { checkServerStatus } from "../services/api";

const useConnection = () => {
  const [status, setStatus] = useState("disconnected");
  const [error, setError] = useState(null);

  // 서버 상태 확인 함수
  const check = useCallback(async () => {
    setStatus("connecting");
    setError(null);

    try {
      const isConnected = await checkServerStatus();

      if (isConnected) {
        setStatus("connected");
        setError(null);
      } else {
        throw new Error("서버 응답 없음");
      }
    } catch (err) {
      console.error("Server check failed:", err);
      setStatus("disconnected");
      setError("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
    }
  }, []);

  // 컴포넌트 마운트 시 서버 상태 확인
  useEffect(() => {
    check();
  }, [check]);

  return {
    status,
    error,
    check,
  };
};

export default useConnection;
