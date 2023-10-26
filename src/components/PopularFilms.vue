<template>
    <div>
        <FilterBox>
            <CustomSelect v-if="ganresOption.length !== 0" :options="ganresOption" v-model="selectedGanres"
                :defaultOption="{ name: 'Всі жанри', value: 'All' }" :label="'жанр:'"></CustomSelect>
        </FilterBox>
        <GridFilms v-if="films" :films="films" />
    </div>
</template>


<script>
import axiosInstance from "../services/axios"
import FilterBox from "./shared/FilterBox.vue"
import CustomSelect from "./shared/CustomSelect.vue"
import GridFilms from "./GridFilms.vue"
import { useFilmStore } from "../store/film/filmStore"
import { useGenreStore } from "../store/genresStore"
import { mapActions, mapState } from "pinia"
export default {
    components: { GridFilms, FilterBox, CustomSelect },

    data() {
        return {
            selectedGanres: "All",

        }
    },
    methods: {
        ...mapActions(useFilmStore, ["getpopularFilms"]),
    },
    computed: {
        ...mapState(useFilmStore, ['page', 'films',]),
        ...mapState(useGenreStore, { ganresOption: 'genreItems' })

    },
    watch: {
        selectedGanres() {
            this.getpopularFilms(this.selectedGanres);
        }
    },
    mounted() {
        this.getpopularFilms(this.selectedGanres);
    }
}
</script>
  
<style scoped></style>