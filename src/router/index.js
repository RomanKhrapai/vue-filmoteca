import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { useFilmStore } from "../store/filmStore";
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
                path: "favorite",
                component: () => import("../components/FavoriteFilms.vue"),
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

function query(store, to, from) {
    if (
        to.path === from.path ||
        !from.meta?.id ||
        to.fullPath.includes("/?search")
    ) {
        const search = to.query?.search;

        store.setSearch(search ? search : null);
        store.setPage(to.query?.page ? to.query.page : 1);
    } else {
        store.setPage(1);
        store.setSearch(null);
    }
    setTimeout(store.startFetch, 1);
}

router.beforeEach((to, from, next) => {
    const store = useFilmStore();
    if (to.path !== from.path) {
        store.clearStore();
    }

    const auth = useAuthStore();
    const authStatus = to.matched.find((record) => record.meta.auth)?.meta
        ?.auth;

    if (!authStatus) {
        query(store, to, from);
        next();
    } else if (
        !auth.isAuthorized &&
        (to.path === "/library" || to.path === "/library/favorite")
    ) {
        auth.setPath(to.path);
        next({ name: "home" });
    } else if (!auth.isAuthorized && authStatus === "guest") {
        query(store, to, from);
        next();
    } else if (auth.isAuthorized && authStatus === "user") {
        query(store, to, from);
        next();
    } else next({ name: "NotFound" });
});

export default router;
