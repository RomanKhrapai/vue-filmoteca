<template>
    <v-card class="mx-auto" max-width="344">
        <v-img v-if="dataFilm.posterUrl" :src="dataFilm.posterUrl" height="390" cover></v-img>
        <v-img v-if="!dataFilm.posterUrl" cover :src="'/src/assets/images/fix-poster.jpg'"></v-img>
        <v-card-title>
            {{ dataFilm.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ getGenres() }} | {{ dataFilm.releaseYear }}
        </v-card-subtitle>
        <StarsRating :rating="dataFilm.rating"></StarsRating>
        <v-btn v-if="dataFilm?.idDoc" @click.stop="delfilm(dataFilm.idDoc)">
            видалити
        </v-btn>
    </v-card>
</template>
<script>
import { useAuthStore } from '../store/auth/authStore';
import { mapActions } from 'pinia';
import StarsRating from './shared/StarsRating.vue'

export default {
    components: { StarsRating },

    props: ["dataFilm"],

    methods: {
        ...mapActions(useAuthStore, ['delfilm']),
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