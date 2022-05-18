export const ADD_TODO_ITEM = "ADD_TODO_ITEM";
export const REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM";
export const TOGGLE_TODO_ITEM = "TOGGLE_TODO_ITEM";

export interface todoItemModel {
  id: number;
  task: string;
  isDone: boolean;
}

export interface Action {
  type: "ADD_TODO_ITEM" | "REMOVE_TODO_ITEM" | "TOGGLE_TODO_ITEM";
  payload: todoItemModel | number;
}

export interface todoState {
  todoItems: todoItemModel[];
}

export interface AddTodoItemAction extends Action {
  payload: todoItemModel;
}

export interface RemoveTodoItemAction extends Action {
  payload: number;
}

export interface ToggleTodoItemAction extends Action {
  payload: number;
}
