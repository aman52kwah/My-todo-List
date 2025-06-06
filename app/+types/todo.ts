export interface GetAllTodoRes{
    title: string;
    description: string;
    id: string;
    idDone: boolean;
}

export interface createTodoParam {
    title: string;
    description: string;
    tags?: string[];
}


export interface TodoApiRes{
    message:string;
    isSuccessful: boolean;
   
}

export interface TodoItemRes extends TodoApiRes {
   data: {

     title: string;
    description: string;
    isDone: boolean;
    id: string;
   }
    
}

