import { useState, useEffect } from "react";
import { getAllSchedules } from "../services/api";

const useSchedule = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 공통 입력 핸들러
  const handleInputChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  // 초기 작업 불러오기
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllSchedules();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError("작업을 불러오는데 실패했습니다.");

        // 에러 시 샘플 데이터
        const sampleData = [
          {
            id: 1,
            title: "프로젝트 기획서 작성",
            priority: "high",
            dueDate: "2025-09-30",
            completed: false,
          },
          {
            id: 2,
            title: "회의 준비",
            priority: "medium",
            dueDate: "2025-10-01",
            completed: false,
          },
          {
            id: 3,
            title: "이메일 확인",
            priority: "low",
            dueDate: "2025-10-02",
            completed: true,
          },
        ];
        setTasks(sampleData);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // 작업 추가
  const addTask = () => {
    if (!newTask.title.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
    };

    setTasks((prev) => [newTaskObj, ...prev]);
    setNewTask({
      title: "",
      priority: "medium",
      dueDate: new Date().toISOString().split("T")[0],
    });
  };

  // 작업 완료 토글
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 작업 삭제
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 새로고침
  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getAllSchedules();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("새로고침 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    newTask,
    setNewTask,
    handleInputChange,
    loading,
    error,
    addTask,
    toggleComplete,
    deleteTask,
    refresh,
  };
};

export default useSchedule;
