<template>
    <v-container class="bg-surface-variant">
        <v-card-title :class="['text-h6', `bg-purple-lighten-2`]">
            Parametr ID {{ id }}
        </v-card-title>
        <v-card :loading="loading" class="mx-auto my-12">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>
            <div v-if="film">
                <v-img cover height="250" :src="getBackdropImg()"></v-img>

                <v-card-item>
                    <v-card-title>{{ film.title }}</v-card-title>

                    <v-card-subtitle>
                        <span class="me-1">Local Favorite</span>

                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
                            size="small"></v-rating>

                        <div class="text-grey ms-4">
                            4.5 (413)
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        $ • Italian, Cafe
                    </div>

                    <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
                    </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>

                <v-card-title>Tonight's availability</v-card-title>

                <div class="px-4">
                    <v-chip-group v-model="selection">
                        <v-chip>5:30PM</v-chip>

                        <v-chip>7:30PM</v-chip>

                        <v-chip>8:00PM</v-chip>

                        <v-chip>9:00PM</v-chip>
                    </v-chip-group>
                </div>

                <v-card-actions>
                    <v-btn color="deep-purple-lighten-2" variant="text">
                        Reserve
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-container>
</template>
<script>
import { GENRES } from "../constants.js";
import axiosInstance from "../services/axios";


export default {
    props: ['id'],

    data() {

        return {
            show: false,
            loading: true,
            selection: '',
            film: null

        }
    },
    methods: {
        getFilm() {
            axiosInstance.get(`/movie/${this.id}?language=en-US`).then(res => {

                this.film = res.data
                this.loading = false;
            }).catch(error => {
                console.log(error)
            })
        },
        getBackdropImg() {
            return "https://image.tmdb.org/t/p/w1280/" + this.film.backdrop_path
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
        },
        getTitle() {
            console.log(this.film.title);
            return this.film.title
        }

    },

    async created() {
        await this.getFilm()
    }
}
</script>
    
<style scoped></style>