import { useGenreStore } from "../genresStore";
import { baseImgUrl, posterImgSizes } from "../../constants";

export default {
    films: (state) => {
        const genre = useGenreStore();

        const newArrFilms = state.filmsState.map((film) => {
            const {
                id,
                title,
                poster_path,
                release_date,
                genre_ids,
                vote_average: rating,
            } = film;
            const posterUrl = baseImgUrl + posterImgSizes[2] + poster_path;
            const releaseYear = !release_date
                ? "(не відомо)"
                : release_date.slice(0, 4);
            const genres = genre_ids.map(
                (id) => genre.genres.find((obj) => obj.id === id).name
            );
            return { id, title, posterUrl, releaseYear, rating, genres };
        });

        return newArrFilms;
    },
    pages: (state) => state.totalPages,
    page: (state) => state.curentPage,
};
