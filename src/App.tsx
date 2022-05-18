import React, { useReducer, useState, KeyboardEvent } from "react";

import "./App.css";
import Todo from "./components/TodoComponent";

import { FcPlus } from "react-icons/fc";

type todoItemModel = {
  id: number;
  task: string;
  isDone: boolean;
};

type todoState = {
  todoItems: todoItemModel[];
};

const initialState: todoState = {
  todoItems: [],
};

type todoAction = {
  type: "AddItem" | "RemoveItem" | "ToggleItem";
  payload: todoItemModel;
};

const TodoReducer = (state: todoState, action: todoAction) => {
  switch (action.type) {
    case "AddItem":
      return { todoItems: [...state.todoItems, action.payload] };
    case "RemoveItem":
      return {
        todoItems: state.todoItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ToggleItem":
      return {
        todoItems: state.todoItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, isDone: !item.isDone }
            : item
        ),
      };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const [id, setid] = useState<number>(1);
  const inputTask = React.useRef<HTMLInputElement>(null);

  const getNextId = () => {
    let nextId = id + 1;
    setid(nextId);
    return id;
  };

  const inputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AddItem",
        payload: {
          id: getNextId(),
          task: inputTask.current!.value,
          isDone: false,
        },
      });
      inputTask.current!.value = "";
      inputTask.current!.focus();
    }
  };

  return (
    <div className="flex flex-col justify-between items-center px-6 py-8 h-screen w-screen bg-todo-home bg-no-repeat bg-center bg-contain">
      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold text-blue-700">
          {process.env.REACT_APP_NAME}
          <span className="text-xs text-gray-600">
            {process.env.REACT_APP_VERSION}
          </span>
        </h1>
        <div className="w-full">
          <label htmlFor="todoInput" className="tracking-widest">
            Task
          </label>
          <div className="flex items-center w-full border border-gray-300 px-2 py-2 rounded-lg bg-white">
            <input
              type="text"
              placeholder="type here..."
              className="grow outline-none"
              ref={inputTask}
              onKeyPress={(event) => inputHandler(event)}
            />
            <FcPlus
              className="cursor-pointer"
              title="click to add todo"
              onClick={() => {
                dispatch({
                  type: "AddItem",
                  payload: {
                    id: getNextId(),
                    task: inputTask.current!.value,
                    isDone: false,
                  },
                });
                inputTask.current!.value = "";
                inputTask.current!.focus();
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[80%] mt-4 justify-center text-4xl  rounded-xl overflow-hidden ">
        <div className="space-y-2 px-4 overflow-y-scroll max-h-[90%]">
          {state.todoItems.map((item: todoItemModel, index: number) => (
            <Todo
              id={item.id}
              key={index}
              completed={item.isDone}
              task={item.task}
              toggleTask={() => {
                dispatch({ type: "ToggleItem", payload: item });
              }}
              removeTask={() => {
                dispatch({ type: "RemoveItem", payload: item });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
