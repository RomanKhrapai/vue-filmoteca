import { defineStore } from "pinia";
import axiosInstance from "../services/axios";

export const useGenreStore = defineStore("genre", {
    state: () => ({
        isError: false,
        genres: [],
    }),
    getters: {
        genreItems: (state) => state.genres,
    },
    actions: {
        getgenres() {
            axiosInstance
                .get("/genre/movie/list?language=uk")
                .then((res) => {
                    this.genres = res.data.genres;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
