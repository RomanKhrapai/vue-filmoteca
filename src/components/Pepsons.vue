<template>
    <GridPersons v-if="persons" :persons="persons">

    </GridPersons>
</template>


<script>
import axiosInstance from "../../services/axios.js"
import GridPersons from "./GridPersons.vue"
import CardFilm from "./CardFilm.vue"

export default {
    components: { GridPersons, CardFilm },

    data() {
        return {
            persons: null
        }
    },
    methods: {
        getPersons() {
            axiosInstance.get('/person/popular?language=en-US&page=1').then(res => {
                console.log(res.data.results);
                this.persons = res.data.results
            }).catch(error => {
                console.log(error)
            })
        },
    },
    mounted() {
        this.getPersons()
    }
}
</script>
  
<style scoped></style>