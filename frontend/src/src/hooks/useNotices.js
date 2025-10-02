import { useState, useEffect } from "react";
import { getAllNotices, searchNotice } from "../services/api";

const useNotices = () => {
  const [notices, setNotices] = useState([]);
  const [allNotices, setAllNotices] = useState([]); // 전체 데이터 보관
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 초기 공지사항 불러오기
  useEffect(() => {
    const loadNotices = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllNotices();

        // 우선순위가 없는 경우 추가
        const noticesWithPriority = data.map((notice, index) => ({
          ...notice,
          priority:
            notice.priority ||
            (index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low"),
          // date 필드가 없으면 추가
          date:
            notice.date ||
            notice.postDate ||
            notice.registerDate ||
            new Date().toISOString().split("T")[0],
        }));

        setAllNotices(noticesWithPriority);
        setNotices(noticesWithPriority);
      } catch (err) {
        console.error("Failed to load notices:", err);
        setError("공지사항을 불러오는데 실패했습니다.");

        // 에러 시 샘플 데이터
        const sampleData = [
          {
            id: 1,
            seq: "2024-001",
            department: "개발팀",
            content: "시스템 업데이트 안내",
            date: "2024-03-15",
            priority: "high",
          },
          {
            id: 2,
            seq: "2024-002",
            department: "인사팀",
            content: "신입사원 환영회 개최",
            date: "2024-03-14",
            priority: "medium",
          },
          {
            id: 3,
            seq: "2024-003",
            department: "총무팀",
            content: "사무용품 신청 안내",
            date: "2024-03-13",
            priority: "low",
          },
        ];
        setAllNotices(sampleData);
        setNotices(sampleData);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  // 검색어가 변경될 때 필터링 (로컬 필터링)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setNotices(allNotices);
      return;
    }

    // 로컬에서 필터링
    const filtered = allNotices.filter(
      (notice) =>
        notice.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.seq?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setNotices(filtered);
  }, [searchTerm, allNotices]);

  // 서버에서 검색 (필요한 경우)
  const searchFromServer = async (query) => {
    if (!query.trim()) {
      setNotices(allNotices);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchNotice(query);

      const noticesWithPriority = data.map((notice, index) => ({
        ...notice,
        priority:
          notice.priority ||
          (index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low"),
        date:
          notice.date ||
          notice.postDate ||
          notice.registerDate ||
          new Date().toISOString().split("T")[0],
      }));

      setNotices(noticesWithPriority);
    } catch (err) {
      console.error("Failed to search notices:", err);
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 공지사항 추가 (로컬)
  const addNotice = (notice) => {
    const newNotice = {
      ...notice,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setAllNotices((prev) => [newNotice, ...prev]);
    setNotices((prev) => [newNotice, ...prev]);
  };

  // 공지사항 삭제 (로컬)
  const deleteNotice = (id) => {
    setAllNotices((prev) => prev.filter((n) => n.id !== id));
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // 새로고침
  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getAllNotices();
      const noticesWithPriority = data.map((notice, index) => ({
        ...notice,
        priority:
          notice.priority ||
          (index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low"),
        date:
          notice.date ||
          notice.postDate ||
          notice.registerDate ||
          new Date().toISOString().split("T")[0],
      }));
      setAllNotices(noticesWithPriority);
      setNotices(noticesWithPriority);
      setError(null);
    } catch (err) {
      setError("새로고침 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    notices,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    addNotice,
    deleteNotice,
    searchFromServer,
    refresh,
  };
};

export default useNotices;
