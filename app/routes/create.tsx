import { ChevronLeftIcon } from "lucide-react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
// Update the import path to the correct location of TodoForm, for example:
import TodoForm from "../components/create-todo/TodoForm";
import { Button } from "~/components/ui/button";
import { createTodoItem, fetchTodo } from "~/services/todo";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { TodoItemRes } from "~/+types/todo";

export default function CreateTodoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [todoItem, setTodoItem] = useState<TodoItemRes>();

  const handleSubmit = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
    tags: string[];
  }) => {
    const id = searchParams.get("id");

    if(id){

        //update todo item
        const res = await updateTodoItem({

        })

    }else{
        
        //if no id found create new todo item
        //submit to API
    const res = await createTodoItem({ title, description });
    if (res) {
      toast(res.message);
      navigate("/");
    } else {
      toast("Failed to create todo item");
    }
    }
    
  };

  useEffect(() => {
    const id = searchParams.get("id");

    const fetchTodoData = async () => {
      if (id) { 
        const apiRes = await fetchTodo(id);

        if (apiRes) {
          setTodoItem(apiRes);
        }
      }
    };
    // If id is present, fetch the todo item
    fetchTodoData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center mb-4">
        <Link to="/" className=" cursor-pointer ">
          <Button variant="ghost" size="sm" className="gap-1 ">
            <ChevronLeftIcon size={16} />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Create New Todo</h1>
      </div>
      <TodoForm onSubmit={handleSubmit}
       defaultValues={{title : todoItem?.data.title,
        description: todoItem?.data.description,
        isDone: todoItem?.data.isDone,
      }} />
    </div>
  );
}
