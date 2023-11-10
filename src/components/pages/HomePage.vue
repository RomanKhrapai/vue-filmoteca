<template>
    <div>

        <GridFilms v-if="films" :films="films" />
        <NoFilms class="full-box" v-if="films.length === 0 && !isLoading" />
        <Pagination />

    </div>
</template>

<script setup>
import { useFilmStore } from "../../store/filmStore"
import GridFilms from "../GridFilms.vue"
import Pagination from "../Pagination.vue"
import NoFilms from "../NoFilms.vue"
import { debounce } from "../../utils/debounce"
import { watch, onMounted } from 'vue'
import { storeToRefs } from "pinia"

const { getFilms, getSearchFilms } = useFilmStore()
const { page, search, isLoading, films } = storeToRefs(useFilmStore())

function getNewsFilms() {
    if (search.value) { getSearchFilms() }
    else { getFilms() }
}
onMounted(() => { getNewsFilms() })

watch(page, () => debounce(() => getNewsFilms()))
watch(isLoading, () => { getNewsFilms() })
</script>
  