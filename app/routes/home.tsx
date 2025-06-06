import { HomePage } from "~/components/homepage/HomePage";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { TodoPreviewCard } from "~/components/homepage/TodoPreviewCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="w-screen h-screen">

<HomePage/>
{/* <TodoPreviewCard title={""} description={""} id={""}/> */}

    </main>


 )
}
