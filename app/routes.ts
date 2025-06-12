import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("create-todo","routes/create.tsx"),
    route("sign-up","routes/login.tsx"),
    route("login","routes/signup.tsx"),
] satisfies RouteConfig;
