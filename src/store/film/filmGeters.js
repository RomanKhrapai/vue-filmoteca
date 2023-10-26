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
                (id) => genre.genres.find((obj) => obj.id === id)?.name
            );
            return { id, title, posterUrl, releaseYear, rating, genres };
        });

        return newArrFilms;
    },
    film: (state) => {
        const {
            id,
            title,
            tagline,
            backdrop_path,
            overview,
            poster_path,
            release_date: releaseDate,
            genres: genresArr,
            vote_count: count,
            vote_average,
        } = state.oneFilm;

        const posterUrl = baseImgUrl + posterImgSizes[2] + poster_path;
        const backdropUrl = backdrop_path
            ? baseImgUrl + posterImgSizes[5] + backdrop_path
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
};
