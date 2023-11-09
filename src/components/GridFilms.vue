<template>
    <v-row no-gutters>
        <v-col v-for="film in films" :key="film.id" cols="12" sm="4" v-tooltip="textTooltip">
            <v-sheet class="ma-2 pa-2">
                <CardFilm :dataFilm="film" @click="redirectTo(film.id)"></CardFilm>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script setup>
import CardFilm from "./CardFilm.vue"
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const router = useRouter()

const { films } = defineProps(['films'])

function redirectTo(id) {
    if (route.path === "/films/serials") {
        return
    }
    router.push({
        name: 'filmById',
        params: {
            id
        }
    })
}
const textTooltip = computed(() => route.path === "/films/serials" ?
    "Серіал не містить деталей" : "Натисніть щоб відкрити деталі")


</script>
  
<style scoped></style>