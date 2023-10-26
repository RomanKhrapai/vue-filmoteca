import { defineStore } from "pinia";
import actions from "./filmAction";
import getters from "./filmGeters";

export const useFilmStore = defineStore("film", {
    state: () => ({
        videos: [],
        oneFilm: {},
        filmsState: [],
        totalPages: null,
        curentPage: 1,
        genres: "",
    }),
    getters,
    actions,
});
