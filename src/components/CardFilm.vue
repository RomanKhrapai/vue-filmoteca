<template>
    <v-card class="mx-auto" max-width="344">
        <v-img :src="dataFilm.posterUrl" cover></v-img>

        <v-card-title>
            {{ dataFilm.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ getGenres() }} | {{ dataFilm.releaseYear }}
        </v-card-subtitle>
        <StarsRating :rating="dataFilm.rating"></StarsRating>
    </v-card>
</template>
<script>
import StarsRating from './shared/StarsRating.vue'

export default {
    components: { StarsRating },

    props: ["dataFilm"],

    methods: {

        getGenres() {
            const genres = this.dataFilm.genres
            if (genres.length > 2) {
                return genres.splice(2).join(", ");
            }
            return genres.join(", ");
        }
    }
}
</script>
  
<style scoped></style>