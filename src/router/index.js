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
        component: () => import("@/views/vacancy/v-vacancies.vue")
    },
    {
        path: "/vacancy",
        name: "vacancy",
        component: () => import("@/views/vacancy/v-vacancy.vue")
    },
    {
        path: "/vacancyEdit",
        name: "vacancyEdit",
        component: () => import("@/views/vacancy/v-vacancy-edit.vue")
    },
    {
        path: "/vacancyCreate",
        name: "vacancyCreate",
        component: () => import("@/views/vacancy/v-vacancy-create.vue")
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
    },
    {
        path: "/forums",
        name: "forums",
        component: () => import("@/views/v-forums.vue")
    },
    {
        path: "/services",
        name: "services",
        component: () => import("@/views/service/v-services.vue")
    },
    {
        path: "/service",
        name: "service",
        component: () => import("@/views/service/v-service.vue")
    },
    {
        path: "/serviceEdit",
        name: "serviceEdit",
        component: () => import("@/views/service/v-service-edit.vue")
    },
    {
        path: "/serviceCreate",
        name: "serviceCreate",
        component: () => import("@/views/service/v-service-create.vue")
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router