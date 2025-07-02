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
import { login } from "../../services/auth";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

const loginSchema = z.object({
    email:z.string().email("Please enter a valid email address"),
    password:z.string().min(8,"Password must be at least 8 characters"),
});


export default function LoginPage() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email: "",
            password:"",
        },
    });

    //login component
    const handleSubmit = async(values:z.infer<typeof loginSchema>)=> {
        try{
            await login({
                email:values.email,
                password:values.password,
            });
            toast.success("Logged in successfully");
            navigate("/");
        } catch(error : any){
            const errorMessage = error.message || "Failed to login";
            toast.error(errorMessage);
        }
    };


    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
         <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
           <h1 className="text-3xl font-semibold">Login</h1>
           <h3>Login with credentials to get started</h3>
         </div>
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
                <FormField 
                control={form.control} 
                name="email"
                 render={({field}) =>( 
                 <FormItem>
                     <FormControl>
                         <div className="flex flex-col gap-2"> 
                          <FormLabel>Email</FormLabel>
                            <Input placeholder="email"
                             {...field} className="bg-white" />
                              </div> 
                              </FormControl>
                               <FormMessage /> 
                     </FormItem> 
            )} />
            <FormField 
            control={form.control}
             name="password"
             render={({field}) =>(
                 <FormItem> 
                <FormControl> 
                <div className="flex flex-col gap-2">
                  <FormLabel>Password</FormLabel>
                 <Input 
                 type="password"
                 placeholder="••••••••"
                  {...field} 
                  className="bg-white" />
                   </div>
                    </FormControl>
                     <FormMessage />
                      </FormItem>
                       )} 
                    />

              <div className="flex flex-col gap-4">
                <Button 
                type="submit"
                 className="mt-2 w-full"
                >
                 Login
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Don't have an account? Click here to</p>
            <a
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
    </form>
    </Form>
  );
}
