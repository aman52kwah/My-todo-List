import type { createTodoParam, ITodoItem, TodoItemRes } from "~/+types/todo";
import { fetchWrapper } from "~/utils/fetchWrapper";
const TODO_API =
  process.env.NODE_ENV === "production"
    ? "https://nodejs-production-b940.up.railway.app"
    : "http://localhost:5000";

export async function fetchAllTodo(): Promise<ITodoItem[] | undefined> {
  try {
    console.log("Fetching todos from API...");
    const data = await fetchWrapper<ITodoItem[]>(`${TODO_API}/todo`, {
      method: "GET",
      credentials: "include",
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

// fecth a todo from backend
export async function fetchTodo(id: string): Promise<TodoItemRes | undefined> {
  try {
    const data = await fetchWrapper<TodoItemRes>(`${TODO_API}/todo/${id}`, {
      method: "GET",
      credentials: "include",
    });
    // if the response is not ok, throw an error
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function createTodoItem(
  item: createTodoParam
): Promise<TodoItemRes | undefined> {
  try {
    const data = await fetchWrapper<TodoItemRes>(`${TODO_API}/todo`, {
      method: "POST",
      credentials: "include", // Include credentials for session management
      // This is important if your API requires authentication
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

//update todo item
export async function updateTodoItem(
  todoItem: ITodoItem,
  id: string
): Promise<TodoItemRes | undefined> {
  try {
    const data = await fetchWrapper<TodoItemRes>(`${TODO_API}/todo?id=${id}`, {
      method: "PUT",
      credentials: "include", // Include credentials for session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
