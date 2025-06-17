export interface RegisterUserParams{
   name: string,
    email:string,
    password: string,
}

export interface RegisterUserResponse{
    message:string,
    isSuccessful:boolean,
    data?:{
        id: string;
        name:string;
        email:string
    };
}


//interface for login
export interface LoginUserParams{
    email: string,
    password:string
}

export interface LoginUserResponse{
    message:string
    isSuccessful:boolean,
    data?:{
        id:string,
        name:string,
        email:string,
        
    }
}



export async function loginUser(
    params: LoginUserParams
):Promise<LoginUserResponse>{
try{
    const res = await fetch("https://localhost:5000/",{
        method:"GET",
        headers:{"Content-Type": "application.json"},
        body:JSON.stringify(params),
    });
    const data = await res.json();
    return data;
} catch(error){
    return{
        message: error?.message || "Login failed",
        isSuccessful: false,
    };
};
}



export async function registerUser(
    params: RegisterUserParams
):Promise<RegisterUserResponse>{
    try{
        const res = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        });

            const data = await res.json();
            return data;
    } catch(error : any){
        return{
            message : error?.message || " Registration failed",
            isSuccessful: false,
        };
    }
}