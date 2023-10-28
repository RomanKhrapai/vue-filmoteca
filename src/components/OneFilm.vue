<template>
    <div class="">

        <v-card class="mx-auto my-12">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>
            <div v-if="film">
                <v-img v-if="film.backdropUrl" cover :src="film.backdropUrl"></v-img>
                <v-img v-if="!film.backdropUrl" cover :src="'/src/assets/images/fix-backdrop.jpg'"></v-img>
                <v-card-item>
                    <v-card-title>{{ film.title }}</v-card-title>

                    <v-card-subtitle>
                        <span class="me-1">{{ film.tagline }}</span>
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :model-value="film.rating" color="amber" density="compact" half-increments readonly
                            size="large"></v-rating>

                        <div class="text-grey ms-4">
                            {{ film.rating }} ({{ film.count }})
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        {{ film.genres }}
                    </div>
                    <div class="my-4 text-subtitle-1">
                        Дата релізу: {{ film.releaseDate }}
                    </div>

                    <div>{{ film.overview }} </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>
                <template v-if="film.videos">
                    <v-card-title>Дивитися</v-card-title>
                    <v-card-actions v-for="video, i in film.videos">
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
                            <span class="me-1">{{ film.tagline }}</span>
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
import { mapActions, mapState } from "pinia"

export default {
    props: ['id'],
    components: { Modal },
    data() {

        return {
            showModal: false,
            curentVideo: null,

        }
    },
    methods: {
        ...mapActions(useFilmStore, ["getFilm"]),

        showVideo(index) {
            this.curentVideo = this.film.videos[index]
            this.showModal = true
        }
    },
    computed: {
        ...mapState(useFilmStore, ['film'])
    },

    async created() {
        await this.getFilm(this.id)
    }
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