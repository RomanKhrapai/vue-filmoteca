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
export default {
    components: { GridFilms, FilterBox, CustomSelect },

    data() {
        return {
            films: null,
            ganresOption: [],
            selectedGanres: "All",

        }
    },
    methods: {
        getFilms() {
            const genres = this.selectedGanres === 'All' ? '' : `&with_genres=${this.selectedGanres}`;
            axiosInstance.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genres}`).then(res => {

                this.films = res.data.results
            }).catch(error => {
                console.log(error)
            })
        },
        getGenres() {
            axiosInstance.get('/genre/movie/list?language=uk').then(res => {
                this.ganresOption = res.data.genres
            }).catch(error => {
                console.log(error)
            })
        },


    },
    watch: {
        selectedGanres() {
            this.getFilms();
        }
    },
    mounted() {
        this.getFilms();
        this.getGenres()
    }
}
</script>
  
<style scoped></style>