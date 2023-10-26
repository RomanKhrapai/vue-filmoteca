<template>
    <GridFilms v-if="films" :films="films">

    </GridFilms>
</template>


<script>
import axiosInstance from "../services/axios.js"
import GridFilms from "./GridFilms.vue"
import CardFilm from "./CardFilm.vue"

export default {
    components: { GridFilms, CardFilm },

    data() {
        return {
            films: null,
            text: 'qqqqqqqqqqqqqq',
        }
    },
    methods: {
        getFilms() {
            console.log(1111);
            axiosInstance.get('/discover/tv?include_adult=false&include_video=false&language=uk&page=1&sort_by=popularity.desc').then(res => {
                console.log(res.data);
                this.films = res.data.results
                console.log(this.films);
            }).catch(error => {
                console.log(error)
            })
        },
    },
    mounted() {
        this.getFilms()
    }
}
</script>
  
<style scoped></style>