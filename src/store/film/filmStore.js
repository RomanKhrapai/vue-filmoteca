import { defineStore } from "pinia";
import actions from "./filmAction";
import getters from "./filmGeters";

export const useFilmStore = defineStore("film", {
    state: () => ({
        videos: [],
        oneFilm: {},
        filmsState: [],
        totalPages: 1,
        curentPage: 1,
        genres: "",
        searchText: null,
        isLoading:false,
    }),
    getters,
    actions,
});
