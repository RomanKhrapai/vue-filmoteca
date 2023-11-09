<script setup>
import { useReviewsStore } from "../store/reviewsStore"
import { useAuthStore } from "../store/authStore"
import { ref } from 'vue'
import { computed, onMounted, watch } from "vue"
import { storeToRefs } from "pinia";

const isDialogStar = ref(false);
const rating = ref(0);
const { saveRating, getReviews } = useReviewsStore();
const { readRating } = storeToRefs(useReviewsStore());
const { addFilmToLibrary, } = useAuthStore();
const { isAuthorized, plannedFilms, favoriteFilms } = storeToRefs(useAuthStore());


const { id, film } = defineProps({
    id: String,
    film: {
        type: Object,
        default: null,
    },
});

function clickSaverating(rating) {
    saveRating(id, rating)
    isDialogStar.value = false
};

function activeColor(val) {

    return val ? 'yellow-darken-3' : 'nome'
}
const isPlanned = computed(() => plannedFilms.value.some(film => +film.id === +id))
const isFavorite = computed(() => favoriteFilms.value.some(film => +film.id === +id))
const likeText = computed(() => rating.value ? `Оцінено на ${rating.value}` : "Оцінити");
const favorite = computed(() => isFavorite.value ? `В улюблених` : "Додати в улюблені");
const planned = computed(() => isPlanned.value ? `В запланованих` : "Додати в заплановані");

onMounted(() => {
    rating.value = readRating.value;
    if (isAuthorized.value) {
        getReviews(id)
    }
});

watch(readRating, () => { rating.value = readRating.value })
watch(isAuthorized, (newVal) => { getReviews(id) })
</script>


<template>
    <div class="panel">
        <v-btn icon size="large" @click="addFilmToLibrary(film, false)" v-tooltip="planned">
            <v-icon :color="activeColor(isPlanned)">mdi-bookmark-check-outline</v-icon>
        </v-btn>
        <v-btn icon size="large" @click="addFilmToLibrary(film, true)" v-tooltip="favorite">
            <v-icon :color="activeColor(isFavorite)">mdi-heart</v-icon>
        </v-btn>
        <v-btn icon size="large" @click="isDialogStar = true" v-tooltip="likeText">
            <v-icon :color="activeColor(rating)">mdi-star</v-icon>
        </v-btn>

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