<template>
    <v-card class="mx-auto" max-width="344">

        <v-img v-if="dataFilm.posterUrl" :src="dataFilm.posterUrl" height="390" width="262" cover></v-img>
        <!-- <v-img v-if="!dataFilm.posterUrl" cover :src="'@/assets/images/fix-poster.jpg  '"></v-img> -->
        <img v-if="!dataFilm.posterUrl" height="390" width="262" src="/src/assets/images/fix-poster.jpg"
            alt="Постер фільму відсутній">
        <v-card-title>
            {{ dataFilm.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ getGenres() }} | {{ dataFilm.releaseYear }}
        </v-card-subtitle>
        <StarsRating :rating="dataFilm.rating"></StarsRating>
        <div class="btn-box" v-if="dataFilm?.idDoc">
            <v-btn v-if="dataFilm?.idDoc" @click.stop="delfilm(dataFilm.idDoc)">
                видалити
            </v-btn>
        </div>

    </v-card>
</template>
<script setup>
import StarsRating from './shared/StarsRating.vue'
import { useAuthStore } from '../store/authStore';

const { delfilm } = useAuthStore();
const { dataFilm } = defineProps(["dataFilm"])

function getGenres() {
    const genres = dataFilm.genres
    if (!genres) {
        return
    }
    if (genres.length > 2) {
        return genres.splice(2).join(", ");
    }
    return genres.join(", ");
}
</script>
  
<style scoped>
.btn-box {
    padding: 5px;
    display: flex;
    justify-content: center;
}

img {
    display: block;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
}
</style>