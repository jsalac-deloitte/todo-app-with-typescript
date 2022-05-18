import React, { MouseEventHandler } from "react";
import { FcFullTrash } from "react-icons/fc";

type task = {
  id: number;
  completed: boolean;
  task: string;
  toggleTask: MouseEventHandler<HTMLDivElement>;
  removeTask: MouseEventHandler<HTMLDivElement>;
};

const Todo: React.FC<task> = ({
  id,
  completed,
  task,
  toggleTask,
  removeTask,
}) => {
  return (
    <div
      className={`flex items-center justify-between px-2 space-x-2 bg-blue-700 ${
        completed && "bg-gray-300 text-gray-700"
      } backdrop-blur-sm bg-opacity-20 rounded-lg hover:bg-yellow-200 py-2 border-b`}
    >
      <input type="checkbox" onClick={toggleTask} />
      <div className="text-xl">{id}</div>
      <div
        className={`grow text-lg tracking-wider   ${
          completed ? "line-through" : "font-bold"
        }`}
      >
        {task}
      </div>
      <div className="cursor-pointer" onClick={removeTask}>
        <FcFullTrash />
      </div>
    </div>
  );
};

export default Todo;
