import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Badge } from "~/components/ui/badge";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { updateTodoItem } from "~/services/todo";

const formSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  tags: z.array(z.string()).optional(),
});
type TodoFormProps = {
  onSubmit: (values: z.infer<typeof formSchema> & { tags: string[] }) => void;
  defaultValues?: {
    title?: string;
    description?: string;
    tags?: string[];
    isDone: boolean;
  };
};

export default function TodoForm({ onSubmit, defaultValues }: TodoFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
    values: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
  });

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const id = searchParams.get("id");
    // If an id is present, it means we are updating an existing todo
    if (id) {
      const updatedTodoItem = {
        ...form.getValues(),
        id,
        isDone: defaultValues?.isDone ?? false,};
        
      const res = await updateTodoItem(updatedTodoItem, id);
      if (res) {
        toast(res.message);
        navigate("/");
      }
      return;
    }
    onSubmit({ ...data, tags });
    form.reset();
    setTags([]);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo</FormLabel>
              <FormControl>
                <Input placeholder="Enter todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button type="button" onClick={addTag}>
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-300 rounded-md flex items-center"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <span className="text-xs">x</span>
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" className="mt-4 cursor-pointer">
          Save Todo
        </Button>
      </form>
    </Form>
  );
}
