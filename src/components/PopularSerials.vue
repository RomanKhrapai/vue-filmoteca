<template>
    <div>
        <GridFilms v-if="films" :films="films">
        </GridFilms>
        <Pagination />
    </div>
</template>


<script setup>
import GridFilms from "./GridFilms.vue";
import Pagination from "./Pagination.vue";
import { useFilmStore } from "../store/filmStore"
import { storeToRefs } from "pinia"
import { debounce } from "../utils/debounce"
import { watch, onMounted } from 'vue'

const film = useFilmStore();

const { page, films } = storeToRefs(film);

watch(page, () => {
    debounce(() => { film.getpopularSerials(); })
})

onMounted(() => {
    film.getpopularSerials();
})

</script>
  
<style scoped></style>