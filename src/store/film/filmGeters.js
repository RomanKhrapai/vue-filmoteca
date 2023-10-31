import { useGenreStore } from "../genresStore";
import { BASE_IMG_URL, POSTER_IMG_SIZES } from "../../constants";

export default {
    films: (state) => {
        const genre = useGenreStore();

        const newArrFilms = state.filmsState.map((film) => {
            const {
                id,
                title = film?.name || "Назва не відома",
                poster_path,
                release_date = film?.first_air_date || "/-/-/",
                genre_ids,
                vote_average: rating,
            } = film;
            const posterUrl = poster_path
                ? BASE_IMG_URL + POSTER_IMG_SIZES[2] + poster_path
                : null;
            const releaseYear = !release_date
                ? "(не відомо)"
                : release_date.slice(0, 4);
            const genres = genre_ids.map(
                (id) => genre.genres.find((obj) => obj.id === id)?.name
            );
            return { id, title, posterUrl, releaseYear, rating, genres };
        });

        return newArrFilms;
    },
    film: (state) => {
        if (!state.oneFilm) {
            return null;
        }

        const {
            id,
            title = state.oneFilm?.name || "Назва не відома",
            tagline,
            backdrop_path,
            overview,
            poster_path,
            release_date: releaseDate,
            genres: genresArr,
            vote_count: count,
            vote_average,
        } = state.oneFilm;

        const posterUrl = poster_path
            ? BASE_IMG_URL + POSTER_IMG_SIZES[2] + poster_path
            : null;
        const backdropUrl = backdrop_path
            ? BASE_IMG_URL + POSTER_IMG_SIZES[5] + backdrop_path
            : null;

        const genres = genresArr?.map((genre) => genre.name).join(", ");
        const rating = Math.round(vote_average * 5) / 10;
        const videosArr = state.videos
            .filter((video) => video.site === "YouTube")
            .map((video) => ({
                name: video.name,
                url: `https://www.youtube.com/embed/${video.key}`,
            }));
        const videos = videosArr.length === 0 ? null : videosArr;
        return {
            id,
            title,
            posterUrl,
            rating,
            genres,
            tagline,
            overview,
            releaseDate,
            backdropUrl,
            videos,
            count,
        };
    },
    pages: (state) => state.totalPages,
    page: (state) => state.curentPage,
    search: (state) => state.searchText,
    isShowLoading: (state) => state.isLoading,
};
