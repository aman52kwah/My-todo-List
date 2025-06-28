import { Button } from "~/components/ui/button";
import { TodoPreviewCard } from "./TodoPreviewCard";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { TodoPreviewCardType } from "~/+types/TodoPreviewCardType";
import { fetchAllTodo } from "~/services/todo";
import {logout} from "~/services/auth";

export function HomePage() {
 const [todoItems, setTodoItems] = useState<TodoPreviewCardType[]>([]);
  useEffect(() => {
    // This effect runs once when the component mounts  
    const fetchData = async() => {
      const data = await fetchAllTodo();
      if(data){
        setTodoItems(data);
      }
    }
 fetchData();
  }, []);




  return (
    <section className="w-screen h-screen relative flex flex-row justify-center items-center">
      <div
        className="w-3/5 bg-background h-9/12 
            overflow-auto ring-1 rounded-sm shadow-xl
             ring-slate-400 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] 
             p-4"
      >
        {/* heading and buton */}
        <div className="flex flex-row justify-between">
          <Link to={"/login"}>
          <Button onClick={() => logout()}>Logout </Button>
          </Link>
          <h1 className="text-3xl font-bold">Todo</h1>
          <Link to={"/create-todo"} className="text-white">
            <Button className="cursor-pointer">Create Todo</Button>
          </Link>
        </div>
        {/* todo preiview card */}

        <div className=" my-4 flex flex-col gap-2 ">
          {todoItems.map((item) => (
            <TodoPreviewCard
               key={item.id}
              {...item} // Spread the item properties
            />
          ))}
        </div>
      </div>
    </section>
  );
}
