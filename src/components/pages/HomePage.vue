<template>
    <div>

        <GridFilms v-if="films" />
        <Pagination />

    </div>
</template>
<script>
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, mapState } from "pinia"
import GridFilms from "../GridFilms.vue"
import Pagination from "../Pagination.vue"
import { debounce } from "../../utils/debounce"

export default {
    components: { GridFilms, Pagination },

    methods: {
        ...mapActions(useFilmStore, ["getFilms"]),

    },
    computed: {
        ...mapState(useFilmStore, ['page', 'films'])
    },

    watch: {
        page() {
            debounce(() => { this.getFilms() })
        }
    },

    mounted() {
        this.getFilms()
    }
}
</script>
  
<style scoped></style>
  