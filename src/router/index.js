import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { useFilmStore } from "../store/film/filmStore";
import NotFound from "../components/pages/NotFoundPage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../components/pages/HomePage.vue"),
        meta: { id: 1 },
    },

    {
        path: "/film/:id",
        name: "filmById",
        component: () => import("../components/OneFilm.vue"),
        props: (route) => ({ id: route.params.id }),
        meta: { id: 1 },
    },
    {
        path: "/films",
        component: () => import("../components/pages/FilmsPage.vue"),
        meta: { id: 2 },
        children: [
            {
                path: "",
                component: () => import("../components/PopularFilms.vue"),
                alias: "",
            },
            {
                path: "serials",
                component: () => import("../components/PopularSerials.vue"),
            },
        ],
    },
    {
        path: "/library",
        component: () => import("../components/pages/LibraryPage.vue"),
        meta: { auth: "user", id: 3 },
        children: [
            {
                path: "",
                component: () => import("../components/PlannedFilms.vue"),
                //alias: "",
            },
            {
                path: "watched",
                component: () => import("../components/WatchedFilms.vue"),
            },
        ],
    },

    {
        path: "/auth/registration",
        name: "registration",
        component: () => import("../components/pages/RegistrationPage.vue"),
        meta: { auth: "guest", id: 5 },
    },
    {
        path: "/auth/login",
        name: "login",
        component: () => import("../components/pages/LogInPage.vue"),
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
    const store = useFilmStore();
    store.isLoading = true;
    if (to.path === from.path || !from.meta?.id) {
        const search = to.query?.search;
        store.searchText = search ? search : null;
        store.curentPage = to.query?.page ? +to.query.page : 1;
    } else {
        store.curentPage = 1;
        store.searchText = null;
    }

    const auth = useAuthStore();
    const authStatus = to.matched.find((record) => record.meta.auth)?.meta
        ?.auth;
    if (!authStatus) {
        next();
    } else if (
        !auth.isAuthorized &&
        (to.path === "/library" || to.path === "/library/watched")
    ) {
        auth.oldPath = to.path;
        next({ name: "home" });
    } else if (!auth.isAuthorized && authStatus === "guest") {
        next();
    } else if (auth.isAuthorized && authStatus === "user") {
        next();
    } else next({ name: "NotFound" });
});

export default router;
