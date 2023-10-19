<template>
    <v-card class="mx-auto" max-width="344">
        <v-img :src="getImg()" height="200px" cover></v-img>

        <v-card-title>
            {{ dataFilm.original_title }}
        </v-card-title>

        <v-card-subtitle>
            {{ getGenres() }} | {{ getYear() }}
        </v-card-subtitle>
    </v-card>
</template>
<script>
import { GENRES } from "../constants.js";


export default {
    props: ["dataFilm"],

    data() {

        return {
            show: false,
        }
    },
    methods: {
        getImg() {
            // console.log(this.dataFilm);
            return "https://image.tmdb.org/t/p/w342/" + this.dataFilm.backdrop_path
        },
        getYear() {
            return !this.dataFilm.release_date ? 'unknown' : this.dataFilm.release_date.slice(0, 4);
        },
        getGenres() {
            const genres = this.dataFilm.genre_ids.map(item => GENRES[item]);
            if (genres.length > 2) {
                return genres.splice(2).join(", ");
            }
            return genres.join(", ");
        }
    }
}
</script>
  
<style scoped></style>