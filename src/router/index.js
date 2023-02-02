import { createRouter, createWebHistory } from "vue-router";
import guest_middleware from "@/router/middlewares/guest_middleware";
import auth_middleware from "@/router/middlewares/auth_middleware";


const routes = [
    {
        path: "/guest",
        name: "guest",
        component: () => import("@/views/v-guest.vue"),
        beforeEnter: [guest_middleware]
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/v-home.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/components",
        name: "components",
        component: () => import("@/views/v-components.vue")
    },
    {
        path: "/vacancies",
        name: "vacancies",
        component: () => import("@/views/vacancy/v-vacancies.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/vacancy",
        name: "vacancy",
        component: () => import("@/views/vacancy/v-vacancy.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/vacancyEdit",
        name: "vacancyEdit",
        component: () => import("@/views/vacancy/v-vacancy-edit.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/vacancyCreate",
        name: "vacancyCreate",
        component: () => import("@/views/vacancy/v-vacancy-create.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/v-profile.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/users",
        name: "users",
        component: () => import("@/views/v-users.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/forums",
        name: "forums",
        component: () => import("@/views/v-forums.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/services",
        name: "services",
        component: () => import("@/views/service/v-services.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/service",
        name: "service",
        component: () => import("@/views/service/v-service.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/serviceEdit",
        name: "serviceEdit",
        component: () => import("@/views/service/v-service-edit.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/serviceCreate",
        name: "serviceCreate",
        component: () => import("@/views/service/v-service-create.vue"),
        beforeEnter: [auth_middleware]
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router