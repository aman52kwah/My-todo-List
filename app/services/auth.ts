export interface RegisterUserParams{
   username: string,
    email:string,
    password: string,
}

export interface RegisterUserResponse{
    message:string,
    isSuccessful:boolean,
    data?:{
        id: string;
        username:string;
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
        username:string,
        email:string,
        
    }
}



export async function loginUser(
    params: LoginUserParams
):Promise<LoginUserResponse>{
try{
    const res = await fetch("https://localhost:5000/db/index",{
        method:"GET",
        headers:{"Content-Type": "application.json"},
        body:JSON.stringify(params),
    });
    const data = await res.json();
    return data;
} catch(error : any){
    return{
        message: error.message || "Login failed",
        isSuccessful: false,
    };
};
}



export async function registerUser(
    params: RegisterUserParams
):Promise<RegisterUserResponse>{
    try{
        const res = await fetch("http://localhost:5000/db/index", {
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