<template>
    <div>
        <GridFilms v-if="films" :films="films">

        </GridFilms>
        <Pagination />
    </div>
</template>


<script>
import GridFilms from "./GridFilms.vue";
import Pagination from "./Pagination.vue";
import { useFilmStore } from "../store/film/filmStore"
import { useGenreStore } from "../store/genresStore"
import { mapActions, mapState } from "pinia"
import { debounce } from "../utils/debounce"


export default {
    components: { GridFilms, Pagination },


    methods: {
        ...mapActions(useFilmStore, ["getpopularSerials"]),
    },
    computed: {
        ...mapState(useFilmStore, ['page', 'films',]),
        ...mapState(useGenreStore, { ganresOption: 'genreItems' })

    },
    watch: {
        page() {
            debounce(() => { this.getpopularSerials(this.selectedGanres); })
        }
    },
    mounted() {
        this.getpopularSerials(this.selectedGanres);
    }
}
</script>
  
<style scoped></style>