import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("create-todo","routes/create.tsx")
] satisfies RouteConfig;
