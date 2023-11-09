<template>
    <div>
        <FilterBox>
            <CustomSelect v-if="ganresOption.length !== 0" :options="ganresOption" v-model="selectedGanres"
                :defaultOption="{ name: 'Всі жанри', value: 'All' }" :label="'жанр:'"></CustomSelect>
        </FilterBox>
        <GridFilms v-if="films" :films="films" />
        <Pagination />

    </div>
</template>


<script setup>
import FilterBox from "./shared/FilterBox.vue"
import CustomSelect from "./shared/CustomSelect.vue"
import GridFilms from "./GridFilms.vue"
import { useFilmStore } from "../store/filmStore"
import { useGenreStore } from "../store/genresStore"
import { storeToRefs } from "pinia"
import { debounce } from "../utils/debounce"
import Pagination from "./Pagination.vue"
import { ref, watch, onMounted } from 'vue'

const filmStore = useFilmStore();
const genres = useGenreStore();

const { page, films } = storeToRefs(filmStore);
const { genreItems: ganresOption } = storeToRefs(genres)

const selectedGanres = ref("All")

watch(selectedGanres, () => {
    filmStore.getpopularFilms(selectedGanres.value);
})
watch(page, () => {
    debounce(() => { filmStore.getpopularFilms(selectedGanres.value); })
})

onMounted(() => {
    filmStore.getpopularFilms(selectedGanres.value);
})

</script>
  
<style scoped></style>