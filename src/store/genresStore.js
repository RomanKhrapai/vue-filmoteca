import { defineStore } from "pinia";
import axiosInstance from "../services/axios";
import { ref, computed } from "vue";

export const useGenreStore = defineStore("genre", () => {
    const genre = ref({
        isError: false,
        genres: [],
    });

    const genreItems = computed(() => genre.value.genres);

    const getgenres = () => {
        axiosInstance
            .get("/genre/movie/list?language=uk")
            .then((res) => {
                genre.value.genres = res.data.genres;
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return { genre, genreItems, getgenres };
});
