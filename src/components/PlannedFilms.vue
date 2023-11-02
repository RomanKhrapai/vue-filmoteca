<template>
    <div>

        <GridFilms v-if="plannedFilms" :films="plannedFilms" />
        <NoFilms v-if="plannedFilms.length === 0 && !isLoading" />
    </div>
</template>


<script>
import GridFilms from "./GridFilms.vue"
import NoFilms from "./NoFilms.vue"
import { useAuthStore } from "../store/authStore"
import { useFilmStore } from "../store/film/filmStore"
import { mapState, mapActions } from "pinia"

export default {
    components: { GridFilms, NoFilms },
    methods: { ...mapActions(useFilmStore, ['falseLoading']) },
    computed: {
        ...mapState(useAuthStore, ['plannedFilms']),
        ...mapState(useFilmStore, ['isLoading']),
    },
    mounted() {
        this.falseLoading();
    }

}
</script>
  
<style scoped></style>