<template>
    <div>

        <GridFilms v-if="films" :films="films" />
        <NoFilms v-if="films.length === 0 && !isLoading" />
        <Pagination />

    </div>
</template>
<script>
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, mapState } from "pinia"
import GridFilms from "../GridFilms.vue"
import Pagination from "../Pagination.vue"
import NoFilms from "../NoFilms.vue"
import { debounce } from "../../utils/debounce"


export default {
    components: { GridFilms, Pagination, NoFilms },

    methods: {
        ...mapActions(useFilmStore, ["getFilms", 'getSearchFilms']),
        getNewsFilms() {
            if (this.search) { this.getSearchFilms() }
            else { this.getFilms() }
        }

    },
    computed: {
        ...mapState(useFilmStore, ['page', 'films', 'search', "isLoading"])
    },

    watch: {
        page() {
            debounce(() => { this.getNewsFilms() })
        },
        isLoading() {
            this.getNewsFilms()
        }
    },

    mounted() {
        this.getNewsFilms()
    }
}
</script>
  
<style scoped></style>
  