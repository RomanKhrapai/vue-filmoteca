<template>
    <v-row no-gutters>
        <v-col v-for="film in films" :key="film.id" cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
                <CardFilm :dataFilm="film" @click="redirectTo(film.id)"></CardFilm>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import CardFilm from "./CardFilm.vue"
import { useFilmStore } from "../../src/store/film/filmStore"
import { mapState } from "pinia"

export default {
    components: { CardFilm },

    methods: {
        redirectTo(id) {
            this.$router.push({
                name: 'filmById',
                params: {
                    id: id,
                }
            })
        },
    },
    computed: {
        ...mapState(useFilmStore, ['films']),
    }
}
</script>
  
<style scoped></style>