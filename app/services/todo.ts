import type {
  createTodoParam,
  GetAllTodoRes,
  TodoItemRes,
} from "~/+types/todo";

const TODO_API = "http://localhost:5000";

export async function fetchAllTodo(): Promise<GetAllTodoRes[] | undefined> {
  try {
    const res = await fetch(`${TODO_API}`, {
      method: "GET",
      
    });

    if (res.status !== 200) {
      // Handle non-200 responses
      throw new Error("Network response was not ok");
    }

    const data: GetAllTodoRes[] = await res.json();

    return data;
  } catch (error) {
    console.error("failed to fetch data", error);
    return [];
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
