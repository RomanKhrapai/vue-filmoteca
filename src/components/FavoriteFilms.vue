<template>
    <div>
        <GridFilms v-if="favoriteFilms" :films="favoriteFilms" />
        <NoFilms v-if="favoriteFilms.length === 0 && !isLoading" />
    </div>
</template>

<script setup>
import GridFilms from "./GridFilms.vue"
import NoFilms from "./NoFilms.vue"
import { useAuthStore } from "../store/authStore"
import { useFilmStore } from "../store/filmStore"
import { storeToRefs } from "pinia"
import { onMounted } from 'vue'

const { falseLoading } = useFilmStore()
const { favoriteFilms } = storeToRefs(useAuthStore())
const { isLoading } = storeToRefs(useFilmStore())

onMounted(() => falseLoading())
</script>
  
<style scoped></style>