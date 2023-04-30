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
    {
        path: "/companies",
        name: "companies",
        component: () => import("@/views/company/v-companies.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/companyCreate",
        name: "companyCreate",
        component: () => import("@/views/company/v-company-create.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/company",
        name: "company",
        component: () => import("@/views/company/v-company.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/resumes",
        name: "resumes",
        component: () => import("@/views/resume/v-resumes.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/resumeCreate",
        name: "resumeCreate",
        component: () => import("@/views/resume/v-resume-create.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/groups",
        name: "groups",
        component: () => import("@/views/group/v-groups.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/group",
        name: "group",
        component: () => import("@/views/group/v-group.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/groupCreate",
        name: "groupCreate",
        component: () => import("@/views/group/v-group-create.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/messages/:userId?",
        name: "messages",
        component: () => import("@/views/v-messages.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/notifications",
        name: "notifications",
        component: () => import("@/views/v-notifications.vue"),
        beforeEnter: [auth_middleware]
    },
    {
        path: "/email",
        name: "email",
        component: () => import("@/views/v-email.vue"),
        beforeEnter: [auth_middleware]
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router