import axiosInstance from "../../services/axios";
import { incrementpage, decrementPage, setValidPage } from "./filmMutation";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    getpopularSerials(genre) {
        const genreQuery = genre === "All" ? "" : `&with_genres=${genre}`;
        axiosInstance
            .get(
                `/discover/tv?include_adult=false&include_video=false&language=uk&page=${this.curentPage}&sort_by=popularity.desc${genreQuery}`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
                this.isLoading = false;
            })
            .catch((error) => {
                toast.error("Сталася помилка отримання даних!");
                console.log(error);
                this.isLoading = false;
            });
    },
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
                this.isLoading = false;
            })
            .catch((error) => {
                toast.error("Сталася помилка отримання даних!");
                console.log(error);
                this.isLoading = false;
            });
    },
    getSearchFilms(search) {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/search/movie?api_key=${key}&language=uk&query=${
                    search || this.searchText
                }&page=${this.curentPage}`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
                this.isLoading = false;
            })
            .catch((error) => {
                toast.error("Сталася помилка отримання даних!");
                console.log(error);
                this.isLoading = false;
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
                this.isLoading = false;
            })
            .catch((error) => {
                console.log(error);
                this.isLoading = false;
            });
    },
    getFilm(id) {
        axiosInstance
            .get(`/movie/${id}?language=uk`)
            .then((res) => {
                this.oneFilm = res.data;
                this.isLoading = false;
            })
            .catch((error) => {
                toast.error("Сталася помилка отримання даних!");
                console.log(error);
                this.isLoading = false;
            });
        axiosInstance
            .get(`/movie/${id}/videos?language=uk`)
            .then((res) => {
                this.videos = res.data.results;
            })
            .catch((error) => {
                toast.error("Сталася помилка отримання даних!");
                console.log(error);
                this.isLoading = false;
            });
    },
    setOptions(options) {
        if (options?.page) {
            this.page = options.page;
        }
    },
    falseLoading() {
        this.isLoading = false;
    },
    trueLoading() {},
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
