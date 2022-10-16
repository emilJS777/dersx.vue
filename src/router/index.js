import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/v-home.vue")
    },
    {
        path: "/components",
        name: "components",
        component: () => import("@/views/v-components.vue")
    },
    {
        path: "/vacancies",
        name: "vacancies",
        component: () => import("@/views/v-vacancies.vue")
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/v-profile.vue")
    },
    {
        path: "/users",
        name: "users",
        component: () => import("@/views/v-users.vue")
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router