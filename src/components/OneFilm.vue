<script setup>
import Modal from './shared/Modal.vue';
import NoFilm from './NoFilm.vue';
import Reviews from './Reviews.vue'
import ActivPanel from './ActivPanel.vue';
import { useFilmStore } from "../store/filmStore";
import { useAuthStore } from '../store/authStore';
import { useReviewsStore } from '../store/reviewsStore';
import useComputed from '../utils/useComputed';
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia';


const { id } = defineProps({
    id: String,
});

const { isAuthorized } = storeToRefs(useAuthStore());
const { getFilm } = useFilmStore();
const { oneFilm, isLoading } = storeToRefs(useFilmStore())
const { getReviews } = useReviewsStore();
const { readRating } = storeToRefs(useReviewsStore())
const showModal = ref(false);
const curentVideo = ref(null);

const { rating, count } = useComputed(oneFilm, readRating)
const showVideo = (index) => {
    curentVideo.value = oneFilm.videos[index];
    showModal.value = true;
}

getFilm(id);
getReviews(id);

</script>

<template>
    <div class="">

        <v-card v-if="oneFilm" class="mx-auto my-12">
            <div>
                <div class="film_box" :style="{ 'background-image': 'url(' + oneFilm.backdropUrl + ') ' }">
                    <div class="film_box-background">

                        <div class="film_img-box">
                            <div class="film_img">
                                <v-img v-if="oneFilm.posterUrl" height="390" width="262" cover
                                    :src="oneFilm.posterUrl"></v-img>
                                <v-img v-if="!oneFilm.posterUrl" cover :src="'@/assets/images/fix-poster.jpg'"></v-img>
                            </div>

                        </div>
                        <div class='film_info'>
                            <div class="box">
                                <v-card-title>{{ oneFilm.title }}</v-card-title>

                                <v-card-subtitle>
                                    <span class="me-1">{{ oneFilm.tagline }}</span>
                                </v-card-subtitle>
                                <ActivPanel v-if="isAuthorized && !isLoading" :id="id" :film="oneFilm" />
                            </div>


                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :model-value="rating" color="amber" density="compact" half-increments readonly
                                        size="large"></v-rating>

                                    <div class=" ms-4">
                                        {{ rating }} ({{ count }})
                                    </div>
                                </v-row>

                                <div class="my-4 text-subtitle-1">
                                    {{ oneFilm.genres }}
                                </div>
                                <div class="my-4 text-subtitle-1">
                                    Дата релізу: {{ oneFilm.releaseDate }}
                                </div>
                            </v-card-text>
                        </div>
                    </div>
                </div>
                <v-card-title>Опис</v-card-title>
                <v-card-text>
                    <div>{{ oneFilm.overview }} </div>
                </v-card-text>

                <template v-if="oneFilm.videos">
                    <v-card-title>Дивитися</v-card-title>
                    <v-card-actions v-for="video, i in oneFilm.videos">
                        <v-btn color="deep-purple-lighten-2" variant="text" @click="showVideo(i)">
                            {{ video.name }}
                        </v-btn>
                    </v-card-actions>
                </template>
                <Reviews :id="+id" />
                <Modal v-if="showModal" @close="showModal = false">
                    <template v-slot:header>
                        <h3>{{ curentVideo.name }}</h3>
                    </template>
                    <template v-slot:body>
                        <div class="show-video">
                            <iframe class="show-video__playr" :src='curentVideo.url' frameborder="0" allow="accelerometer;
    autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </template>
                    <template v-slot:footer="slotProps">
                        <div class="modal-footer">
                            <span class="me-1">{{ oneFilm.tagline }}</span>
                            <button class="modal-default-button" @click="() => showModal = false">
                                {{ slotProps.btnCloseText }}
                            </button>
                        </div>

                    </template>
                </Modal>
            </div>
        </v-card>
        <NoFilm v-if="!oneFilm && !isLoading" />
    </div>
</template>

    
<style scoped>
.btn-box {
    padding: 5px;
    display: flex;
    justify-content: center;
}

.box {
    padding: 5px;
}

.show-video__playr {
    height: 70vh;
    width: 70vw
}

.modal-footer {
    display: flex;
    justify-content: space-around;
}

.film_box {
    background-size: cover;
    background-repeat: no-repeat;
}

.film_box-background {
    background-image: linear-gradient(to right, rgba(220.5, 220.5, 220.5, 1) calc((50vw - 170px) - 340px), rgba(220.5, 220.5, 220.5, 0.44) 50%, rgba(220.5, 220.5, 220.5, 0.84) 100%);
    display: flex;
    align-items: flex-end;
}

.film_img-box {
    padding: 15px;

}

.film_img {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.film_info {
    border-radius: 30px 30px 0 0;
    background-image: linear-gradient(to right, rgba(220.5, 220.5, 220.5, 1) 0, rgba(220.5, 220.5, 220.5, 0.44) 50%, rgba(220.5, 220.5, 220.5, 0.84) 100%);
    box-shadow: 0px -14px 32px 3px rgba(220.5, 220.5, 220.5, 1), 0px 0px 0px -4px rgba(220.5, 220.5, 220.5, 1)
}
</style>