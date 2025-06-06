import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";
// Update the import path to the correct location of TodoForm, for example:
import TodoForm from "../components/create-todo/TodoForm";
import { Button } from "~/components/ui/button";


export default function CreateTodoPage(){
const handleSubmit = (data: {
    title:string,
    description:string, 
    tags:string}) => {
    console.log(data)
}
    return(
        <div className="max-w-md mx-auto p-4">
            <div className="flex items-center mb-4">
            <Link to="/" className=" cursor-pointer ">
            <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeftIcon size={16} />
                Back
                </Button>
                </Link>
                <h1 className="text-2xl font-bold ml-2">Create New Todo</h1>
            </div>
            <TodoForm onSubmit={handleSubmit} />
        </div>
    )
}