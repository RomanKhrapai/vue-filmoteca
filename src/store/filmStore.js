import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useGenreStore } from "./genresStore";
import axiosInstance from "../services/axios";
import { useToast } from "vue-toastification";
import { BASE_IMG_URL, POSTER_IMG_SIZES } from "../constants";
import { pageValidation } from "../utils/validationRules";

export const useFilmStore = defineStore("film", () => {
    const toast = useToast();
    const genreStore = useGenreStore();
    const film = ref({
        videos: [],
        film: null,
        filmsState: [],
        totalPages: null,
        curentPage: 1,
        genres: "",
        searchText: "",
        isLoading: false,
        isError: false,
    });

    const films = computed(() => {
        const newArrFilms = film.value.filmsState.map((film) => {
            const {
                id,
                title = film?.name || "Назва не відома",
                poster_path,
                release_date = film?.first_air_date || "/-/-/",
                genre_ids,
                vote_average: rating,
            } = film;
            return {
                id,
                title,
                posterUrl: poster_path
                    ? BASE_IMG_URL + POSTER_IMG_SIZES[2] + poster_path
                    : null,
                releaseYear: !release_date
                    ? "(не відомо)"
                    : release_date.slice(0, 4),
                rating,
                // genres: [],
                genres: genre_ids.map(
                    (id) =>
                        genreStore.genreItems.find((obj) => obj.id === id)?.name
                ),
            };
        });

        return newArrFilms;
    });

    const oneFilm = computed(() => {
        if (!film.value.film) {
            return null;
        }

        const {
            id,
            title = film.value.film?.name || "Назва не відома",
            tagline,
            backdrop_path,
            overview,
            poster_path,
            release_date: releaseDate,
            genres: genresArr,
            vote_count: count,
            vote_average,
        } = film.value.film;

        const videosArr = film.value.videos
            .filter((video) => video.site === "YouTube")
            .map((video) => ({
                name: video.name,
                url: `https://www.youtube.com/embed/${video.key}`,
            }));
        return {
            id,
            title,
            posterUrl: poster_path
                ? BASE_IMG_URL + POSTER_IMG_SIZES[2] + poster_path
                : null,
            rating: Math.round(vote_average * 5) / 10,
            genres: genresArr?.map((genre) => genre.name).join(", "),
            tagline,
            overview,
            releaseDate,
            backdropUrl: backdrop_path
                ? BASE_IMG_URL + POSTER_IMG_SIZES[5] + backdrop_path
                : null,
            videos: videosArr.length === 0 ? null : videosArr,
            count,
        };
    });
    const pages = computed(() => film.value.totalPages);
    const page = computed(() => film.value.curentPage);
    const search = computed(() => film.value.searchText);
    const isLoading = computed(() => film.value.isLoading);
    const isError = computed(() => film.value.isError);

    function getpopularSerials(genre) {
        const genreQuery = genre === "All" ? "" : `&with_genres=${genre}`;
        axiosInstance
            .get(
                `/discover/tv?include_adult=false&include_video=false&language=uk&page=${film.value.curentPage}&sort_by=popularity.desc${genreQuery}`
            )
            .then(({ data }) => {
                film.value.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                film.value.filmsState = data.results;
                film.value.isLoading = false;
            })
            .catch(setError);
    }
    function getpopularFilms(genre) {
        const genreQuery = genre === "All" ? "" : `&with_genres=${genre}`;
        axiosInstance
            .get(
                `/discover/movie?include_adult=false&include_video=false&language=uk&page=${film.value.curentPage}&sort_by=popularity.desc${genreQuery}`
            )
            .then(({ data }) => {
                film.value.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                film.value.filmsState = data.results;
                film.value.isLoading = false;
            })
            .catch(setError);
    }
    function getSearchFilms(search) {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/search/movie?api_key=${key}&language=uk&query=${
                    search || film.value.searchText
                }&page=${film.value.curentPage}`
            )
            .then(({ data }) => {
                film.value.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                film.value.filmsState = data.results;
                film.value.isLoading = false;
            })
            .catch(setError);
    }
    function getFilms() {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/trending/movie/day?api_key=${key}&page=${film.value.curentPage}&language=uk`
            )
            .then(({ data }) => {
                film.value.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                film.value.filmsState = data.results;
                film.value.isLoading = false;
            })
            .catch(setError);
    }
    function getFilm(id) {
        axiosInstance
            .get(`/movie/${id}?language=uk`)
            .then((res) => {
                film.value.film = { ...res.data };
                film.value.isLoading = false;
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    toast.error("Такого фільму не знайдено!");
                    film.value.film = null;
                    return;
                }
                setError(error);
            });
        axiosInstance
            .get(`/movie/${id}/videos?language=uk`)
            .then((res) => {
                film.value.videos = res.data.results;
            })
            .catch((error) => {
                toast.error("помилка отримання відео!");
                film.value.isLoading = false;
            });
    }

    function falseLoading() {
        film.value.isLoading = false;
    }
    function setLoading() {
        film.value.isLoading = true;
    }
    function nextPage() {
        if (film.value.curentPage < film.value.totalPages) {
            film.value.curentPage += 1;
        }
    }
    function prevPage() {
        if (film.value.curentPage >= 2) {
            film.value.curentPage -= 1;
        }
    }
    function setPage(num) {
        const error = pageValidation(num);
        if (error) {
            toast.error(error);
            film.value.curentPage = 1;
            return;
        }
        if (!film.value.totalPages) {
            film.value.curentPage = +num;
            return;
        }
        film.value.curentPage =
            num <= film.value.totalPages ? +num : +film.value.totalPages;
    }

    function setSearch(search) {
        if (search) {
            const text = search.replace(
                /[{}[\]\%/\\&\?\,\|'\;:+!@#\$\^*)(]/g,
                ""
            );
            if (text?.trim()) {
                film.value.searchText = text;
                return;
            }
        }
        film.value.searchText = null;
    }
    function setError(error) {
        toast.error("Сталася помилка отримання даних!");
        film.value.isError = true;
        film.value.isLoading = false;
    }
    function startFetch() {
        film.value.isError = false;
        film.value.isLoading = true;
    }
    function clearStore() {
        film.value.film = null;
        film.value.filmsState = [];
        film.value.totalPages = null;
    }
    return {
        film,
        films,
        oneFilm,
        pages,
        page,
        search,
        isLoading,
        isError,
        getpopularSerials,
        getpopularFilms,
        getSearchFilms,
        getFilms,
        getFilm,
        falseLoading,
        setLoading,
        nextPage,
        prevPage,
        setPage,
        setSearch,
        startFetch,
        clearStore,
    };
});
