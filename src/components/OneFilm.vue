<template>
    <div class="">

        <v-card class="mx-auto my-12">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>
            <div v-if="filmsStore.film">
                <v-img v-if="filmsStore.film.backdropUrl" cover :src="filmsStore.film.backdropUrl"></v-img>
                <v-img v-if="!filmsStore.film.backdropUrl" cover :src="'/src/assets/images/fix-backdrop.jpg'"></v-img>
                <v-card-item>
                    <v-card-title>{{ filmsStore.film.title }}</v-card-title>

                    <v-card-subtitle>
                        <span class="me-1">{{ filmsStore.film.tagline }}</span>
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :model-value="filmsStore.film.rating" color="amber" density="compact" half-increments
                            readonly size="large"></v-rating>

                        <div class="text-grey ms-4">
                            {{ filmsStore.film.rating }} ({{ filmsStore.film.count }})
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        {{ filmsStore.film.genres }}
                    </div>
                    <div class="my-4 text-subtitle-1">
                        Дата релізу: {{ filmsStore.film.releaseDate }}
                    </div>

                    <div>{{ filmsStore.film.overview }} </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>
                <template v-if="filmsStore.film.videos">
                    <v-card-title>Дивитися</v-card-title>
                    <v-card-actions v-for="video, i in filmsStore.film.videos">
                        <v-btn color="deep-purple-lighten-2" variant="text" @click="showVideo(i)">
                            {{ video.name }}
                        </v-btn>
                    </v-card-actions>
                </template>

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
                            <span class="me-1">{{ filmsStore.film.tagline }}</span>
                            <button class="modal-default-button" @click="$emit('close')">
                                {{ slotProps.btnCloseText }}
                            </button>
                        </div>

                    </template>
                </Modal>
            </div>
        </v-card>
    </div>
</template>
<script>
import Modal from './shared/Modal.vue'
import { useFilmStore } from "../store/film/filmStore"
import { ref, toRefs } from 'vue'

export default {

    props: ['id'],
    components: { Modal },
    setup(props) {
        const { id } = (props);
        const filmsStore = useFilmStore();
        const showModal = ref(false);
        const curentVideo = ref(null);
        const showVideo = (index) => {
            curentVideo.value = filmsStore.film.videos[index];
            showModal.value = true;
        }

        filmsStore.getFilm(id);
        return { filmsStore, showModal, curentVideo, showVideo }
    },


}
</script>
    
<style scoped>
.show-video__playr {
    height: 70vh;
    width: 70vw
}

.modal-footer {
    display: flex;
    justify-content: space-around;
}
</style>