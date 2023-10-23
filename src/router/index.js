import { createRouter, createWebHistory } from "vue-router";
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
        path: "/admin",
        component: Admin,
        meta: { auth: "admin", id: 4 },
    },
    {
        path: "/auth/registration",
        component: Registration,
        meta: { id: 5 },
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
    const currentUser = localStorage.getItem("status");
    const authStatus = to.matched.find((record) => record.meta.auth)?.meta
        ?.auth;

    if (!authStatus || authStatus === currentUser) {
        next();
    } else next({ name: "NotFound" });
});

export default router;
