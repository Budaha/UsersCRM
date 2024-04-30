// default
import { createRouter, createWebHistory } from "vue-router";

// pages
import Home from "@/pages/Home";
import NotFound from "@/pages/404";
import Users from "@/pages/Users";

// routering
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/users",
        name: "users",
        component: Users,
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFound,
    },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
