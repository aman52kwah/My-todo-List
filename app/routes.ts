import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("create-todo","routes/create.tsx"),
    route("login","routes/auth/login.tsx"),
    route("sign-up","routes/auth/signup.tsx"),
] satisfies RouteConfig;
