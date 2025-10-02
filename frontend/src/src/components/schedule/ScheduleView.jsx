import React from "react";
import { Clock } from "lucide-react";
import ScheduleHeader from "./ScheduleHeader";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";

const ScheduleView = ({ user, scheduleData }) => {
  const {
    tasks,
    newTask,
    setNewTask,
    addTask,
    toggleComplete,
    deleteTask,
    loading,
    error,
  } = scheduleData;

  const completedTasks = tasks.filter((t) => t.completed).length;

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
        <p>로그인 후 사용 가능합니다.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ScheduleHeader
        totalTasks={tasks.length}
        completedTasks={completedTasks}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
        {loading && <p className="text-center text-gray-500">로딩중...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {tasks.length === 0 && !loading ? (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-lg font-medium mb-1">할 일이 없습니다</p>
            <p className="text-sm">아래에서 새로운 할 일을 추가해보세요</p>
          </div>
        ) : (
          <>
            {tasks
              .filter((t) => !t.completed)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleComplete}
                  onDelete={deleteTask}
                />
              ))}
            {tasks
              .filter((t) => t.completed)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleComplete}
                  onDelete={deleteTask}
                />
              ))}
          </>
        )}
      </div>

      <TaskInput value={newTask} onChange={setNewTask} onAdd={addTask} />
    </div>
  );
};

export default ScheduleView;
