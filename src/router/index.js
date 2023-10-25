import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth/authStore";
import Home from "../components/pages/HomePage.vue";
import Films from "../components/pages/FilmsPage.vue";
import OneFilm from "../components/OneFilm.vue";
import PopularFilms from "../components/PopularFilms.vue";
import PopularSerials from "../components/PopularSerials.vue";
import Persons from "../components/Persons.vue";
import NotFound from "../components/pages/NotFoundPage.vue";
import Admin from "../components/pages/AdminPage.vue";
import User from "../components/pages/UserPage.vue";
import Registration from "../components/pages/RegistrationPage.vue";
import LogIn from "../components/pages/LogInPage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { id: 1 },
    },

    {
        path: "/film/:id",
        name: "filmById",
        component: OneFilm,
        props: (route) => ({ id: route.params.id }),
        meta: { id: 1 },
    },
    {
        path: "/films",
        component: Films,
        meta: { id: 2 },
        children: [
            {
                path: "",
                component: PopularFilms,
                alias: "",
            },
            {
                path: "serials",
                component: PopularSerials,
            },
            {
                path: "persons",
                component: Persons,
            },
        ],
    },
    {
        path: "/user",
        component: User,
        meta: { auth: "user", id: 3 },
    },

    {
        path: "/auth/registration",
        name: "registration",
        component: Registration,
        meta: { auth: "guest", id: 5 },
    },
    {
        path: "/auth/login",
        name: "login",
        component: LogIn,
        meta: { auth: "guest", id: 6 },
    },
    {
        path: "/not-found",
        alias: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: { id: null },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const { isAuthorized } = useAuthStore();
    const authStatus = to.matched.find((record) => record.meta.auth)?.meta
        ?.auth;
    if (!authStatus) {
        next();
    } else if (!isAuthorized && authStatus === "guest") {
        next();
    } else if (isAuthorized && authStatus === "user") {
        next();
    } else next({ name: "NotFound" });
});

export default router;
