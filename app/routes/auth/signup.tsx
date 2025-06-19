import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { registerUser } from "../../services/auth";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //signup component
  const handleSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await registerUser({
        username: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success("Account created successfully!");
      
      navigate("/login");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to create account";
      toast.error(errorMessage);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
           
             <h1 className="text-3xl font-semibold">create Account</h1>
          </div>
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <FormField
              control={form.control}
              name="name"
              render={({field}) =>(
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                       <Input
                       placeholder="username"
                       {...field} 
                       className="bg-white" /> 
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
              />
             
              <FormField 
              control={form.control} 
              name="email" 
              render={({field}) =>( 
              <FormItem> 
                <FormControl> 
                <div className="flex flex-col gap-2">
                  <Input placeholder="email"
                  {...field}
                   className="bg-white" /> 
                   </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem> )} 
              />
              <FormField 
              control={form.control} 
              name="password" 
              render={({field}) =>( 
              <FormItem>
                 <FormControl> 
                  <div className="flex flex-col gap-2"> 
                    <Input placeholder="........"
                    type="password"
                    {...field}
                     className="bg-white" />
                      </div>
                       </FormControl>
                       <FormMessage /> 
              </FormItem>
               )} 
              />

              <FormField
               control={form.control} 
               name="confirmPassword"
                render={({field}) =>( 
                <FormItem> 
                  <FormControl>
                     <div className="flex flex-col gap-2"> 
                      <Input placeholder="......."
                      type="password"
                      {...field}
                       className="bg-white" />
                       </div> 
                       </FormControl>
                       <FormMessage />
                        </FormItem> )}
               />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="mt-2 w-full cursor-pointer">
              SIGN UP
                </Button>
                
                  
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Already have an account? click to</p>
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
    </form>
    </Form>
  );
}
