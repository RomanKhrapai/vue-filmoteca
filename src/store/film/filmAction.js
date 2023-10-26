import axiosInstance from "../../services/axios";
import { incrementpage, decrementPage, setValidPage } from "./filmMutation";

export default {
    getpopularFilms(genre) {
        const genreQuery = genre === "All" ? "" : `&with_genres=${genre}`;
        axiosInstance
            .get(
                `/discover/movie?include_adult=false&include_video=false&language=uk&page=${this.curentPage}&sort_by=popularity.desc${genreQuery}`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
            });
    },
    getSearchFilms() {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/search/movie?api_key=${key}&language=uk&query=${this.searchText}&page=${this.curentPage}`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
            });
    },
    getFilms() {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/trending/movie/day?api_key=${key}&page=${this.curentPage}&language=uk`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
            });
    },
    getFilm(id) {
        axiosInstance
            .get(`/movie/${id}?language=uk`)
            .then((res) => {
                this.oneFilm = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
        axiosInstance
            .get(`/movie/${id}/videos?language=uk`)
            .then((res) => {
                this.videos = res.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    nextPage() {
        incrementpage();
    },
    prevPage() {
        console.log(1111);
        decrementPage();
    },
    setPage(val) {
        console.log(val);
        setValidPage(+val);
    },
};
