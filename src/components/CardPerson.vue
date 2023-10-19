<template>
    <v-card class="mx-auto" max-width="344">
        <v-img :src="getImg()" height="200px" cover></v-img>

        <v-card-title>

            {{ dataPerson.name }}
        </v-card-title>

        <v-card-subtitle>

            <!-- {{ getGenres() }} | {{ getYear() }} -->
        </v-card-subtitle>
    </v-card>
</template>
<script>
import { GENRES } from "../constants.js";

export default {
    props: ["dataPerson"],

    data() {

        return {
            show: false,
        }
    },
    methods: {
        getImg() {
            // console.log(this.dataPerson);
            return "https://image.tmdb.org/t/p/w342/" + this.dataPerson.profile_path
        },
        getYear() {
            return !this.dataPerson.release_date ? 'unknown' : this.dataPerson.release_date.slice(0, 4);
        },
        getGenres() {
            const genres = this.dataPerson.genre_ids.map(item => GENRES[item]);
            if (genres.length > 2) {
                return genres.splice(2).join(", ");
            }
            return genres.join(", ");
        }
    },
    mounted() {
        console.log(this.dataPerson);
    }
}
</script>
  
<style scoped></style>