<template>
    <div class="panel">
        <v-btn icon size="large" @click="addFilmToLibrary(film, false)">
            <v-icon :color="activeColor(isPlanned)">mdi-bookmark-check-outline</v-icon>
        </v-btn>
        <v-btn icon size="large" @click="addFilmToLibrary(film, true)">
            <v-icon :color="activeColor(isFavorite)">mdi-heart</v-icon>
        </v-btn>
        <v-btn icon size="large" @click="isDialogStar = true">
            <v-icon :color="activeColor(rating)">mdi-star</v-icon>
        </v-btn>
        <div v-if="false">


        </div>
        <v-dialog v-model="isDialogStar" width="auto" :scrim="false">
            <v-card>
                <v-card-text>
                    <div class="star_dox">
                        <v-btn icon="mdi-minus-circle-outline" variant="text" size="large"
                            @click="clickSaverating(0)"></v-btn>
                        <v-rating v-model="rating" color="yellow-darken-3" half-increments
                            @click="clickSaverating(rating)"></v-rating>
                    </div>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { useReviewsStore } from "../store/reviewsStore"
import { useAuthStore } from "../store/authStore"
import { mapActions, mapState } from "pinia"

export default {
    props: ['id', 'film'],
    data() {
        return {
            isDialogStar: false,
            rating: null,
        }
    },
    methods: {
        ...mapActions(useReviewsStore, ["saveRating", "getReviews"]),
        ...mapActions(useAuthStore, ["addFilmToLibrary"]),

        clickSaverating(rating) {
            this.saveRating(this.id, rating)
            this.isDialogStar = false
        },

        activeColor(val) {
            return val ? 'yellow-darken-3' : 'nome'
        }
    },
    computed: {
        ...mapState(useReviewsStore, ['readRating',]),
        ...mapState(useAuthStore, ['isAuthorized', 'plannedFilms', 'favoriteFilms']),

        isPlanned() {

            return this.plannedFilms.some(film => +film.id === +this.id)
        },

        isFavorite() {
            return this.favoriteFilms.some(film => +film.id === +this.id)
        },
    },
    mounted() {
        this.rating = this.readRating
    },
    watch: {
        readRating() {
            this.rating = this.readRating
        },
        page() {
            this.$router.push({
                query: { ...this.$router.query, page: this.page }
            })
        },
        isAuthorized() {
            this.getReviews(id)
        }
    }
}
</script>

<style scoped>
.panel {
    display: flex;
    justify-content: space-around;
    padding: 5px;
}

.star_dox {
    display: flex;
}
</style>