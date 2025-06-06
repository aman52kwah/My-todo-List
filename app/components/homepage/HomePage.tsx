import { Button } from "~/components/ui/button";
import { TodoPreviewCard } from "./TodoPreviewCard";
import { Link } from "react-router";

const todoItem = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Purchase milk, eggs, and bread from the supermarket.",
  },
  {
    id: "2",
    title: "Finish project report",
    description:
      "Complete the final draft of the project report and send it to the manager.",
  },
  {
    id: "3",
    title: "Call plumber",
    description: "Schedule a visit to fix the leaking kitchen sink.",
  },
  {
    id: "4",
    title: "Read a book",
    description: "Read at least 30 pages of the new novel.",
  },
  {
    id: "5",
    title: "Workout",
    description: "Go for a 30-minute run in the park.",
  },
  {
    id: "6",
    title: "Plan vacation",
    description: "Research destinations and book flights for summer vacation.",
  },
  {
    id: "7",
    title: "Pay bills",
    description: "Pay electricity and internet bills online.",
  },
  {
    id: "8",
    title: "Clean house",
    description: "Vacuum the living room and organize the closet.",
  },
  {
    id: "9",
    title: "Attend meeting",
    description: "Join the team meeting at 10 AM via Zoom.",
  },
  {
    id: "10",
    title: "Update resume",
    description: "Add recent work experience and skills to the resume.",
  },
];

export function HomePage() {
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
          <h1 className="text-3xl font-bold">Todo</h1>
          <Link to={"/create-todo"} className="text-white">
            <Button className="cursor-pointer">Create Todo</Button>
          </Link>
        </div>
        {/* todo preiview card */}

        <div className=" my-4 flex flex-col gap-2 ">
          {todoItem.map((item) => (
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
