<template>
    <div>

        <GridFilms v-if="plannedFilms" :films="plannedFilms" />
        <NoFilms v-if="plannedFilms.length === 0 && !isLoading" />
    </div>
</template>


<script setup>
import GridFilms from "./GridFilms.vue"
import NoFilms from "./NoFilms.vue"
import { useAuthStore } from "../store/authStore"
import { useFilmStore } from "../store/filmStore"
import { onMounted } from "vue"
import { storeToRefs } from "pinia"

const { plannedFilms } = storeToRefs(useAuthStore());
const { falseLoading } = useFilmStore()
const { isLoading } = storeToRefs(useFilmStore())

onMounted(() => {
    falseLoading();
})
</script>
  
<style scoped></style>