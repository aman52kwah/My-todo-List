import type { createTodoParam, ITodoItem, TodoItemRes } from "~/+types/todo";

const TODO_API = "http://localhost:5000";

export async function fetchAllTodo(): Promise<ITodoItem[] | undefined> {
  try {
    const res = await fetch(`${TODO_API}`, {
      method: "GET",
    });

    if (res.status !== 200) {
      // Handle non-200 responses
      throw new Error("Network response was not ok");
    }

    const data: ITodoItem[] = await res.json();

    return data;
  } catch (error) {
    console.error("failed to fetch data", error);
    return [];
  }
}

// fecth a todo from backend
export async function fetchTodo(id: string): Promise<TodoItemRes | undefined> {
  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
      method: "GET",
    });
    // if the response is not ok, throw an error
    if (res.status !== 200) {
      throw new Error();
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch todo item");
  }
}

export async function createTodoItem(
  item: createTodoParam
): Promise<TodoItemRes | undefined> {
  try {
    const res = await fetch(`${TODO_API}/todo`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        authorization: "qwertyuiop",
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 201) {
      throw new Error();
    }

    const data: TodoItemRes = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//update todo item
export async function updateTodoItem(
  todoItem: ITodoItem, id : string,
  isDone: boolean
): Promise<TodoItemRes | undefined> {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(todoItem);

    const res = await fetch(`http://localhost:5000/todo?id=${id}`, {
      method: "PUT",
      headers,
      body,
    });
    if (res.status !== 200) {
      throw new Error();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }

}
