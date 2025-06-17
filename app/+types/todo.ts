export interface ITodoItem {
  title: string;
  description: string;
  id: string;
  isDone: boolean;
}

export interface createTodoParam {
  title: string;
  description: string;
  //tags?: string[];
  isDone: boolean;
}

export interface TodoApiRes {
  message: string;
  isSuccessful: boolean;
}

export interface TodoItemRes extends TodoApiRes {
  data: {
    title: string;
    description: string;
    isDone: boolean;
    id: string;
  };
}
