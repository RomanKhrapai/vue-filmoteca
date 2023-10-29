<template>
    <v-row no-gutters>
        <v-col v-for="film in films" :key="film.id" cols="12" sm="4" v-tooltip="textTooltip">
            <v-sheet class="ma-2 pa-2">
                <CardFilm :dataFilm="film" @click="redirectTo(film.id)"></CardFilm>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import CardFilm from "./CardFilm.vue"
// import { useFilmStore } from "../../src/store/film/filmStore"
// import { mapState } from "pinia"

export default {
    components: { CardFilm },
    props: ['films'],
    methods: {
        redirectTo(id) {
            if (this.$route.path === "/films/serials") {
                return
            }
            this.$router.push({
                name: 'filmById',
                params: {
                    id: id,
                }
            })
        },
    },
    computed: {
        //  ...mapState(useFilmStore, ['films']),
        textTooltip() {
            return this.$route.path === "/films/serials" ? "Серіал не містить деталей" : "Натисніть щоб відкрити деталі"
        }
    }
}
</script>
  
<style scoped></style>