<template>
    <div>

        <GridFilms v-if="films" :films="films" />

    </div>
</template>
<script>
import axiosInstance from "../../services/axios.js"
import GridFilms from "./GridFilms.vue"

export default {
    components: { GridFilms, },

    data() {
        return {
            films: null
        }
    },
    methods: {
        getFilms() {
            axiosInstance.get('/trending/movie/day?api_key=967c6f14dacb0ca10f1175f7851a5869&page=1').then(res => {

                this.films = res.data.results
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
  