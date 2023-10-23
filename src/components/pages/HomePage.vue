<template>
    <div>

        <GridFilms v-if="films" :films="films" />
        <Pagination v-model="page" :totalPages="totalPages" />

    </div>
</template>
<script>
import axiosInstance from "../../services/axios"
import GridFilms from "../GridFilms.vue"
import Pagination from "../Pagination.vue"

export default {
    components: { GridFilms, Pagination },

    data() {
        return {
            films: null,
            page: 1,
            totalPages: null,
            timeout: null
        }
    },

    methods: {
        getFilms(page) {
            axiosInstance.get(`/trending/movie/day?api_key=967c6f14dacb0ca10f1175f7851a5869&page=${page}`).then(res => {

                this.totalPages = res.data.total_pages <= 500 ? res.data.total_pages : 500;
                this.films = res.data.results
            }).catch(error => {
                console.log(error)
            })
        },
        createDebounce(fnc, delayMs) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                fnc();
            }, delayMs || 500);

        },
    },

    watch: {
        page() {
            this.createDebounce(() => { this.getFilms(this.page) })
        }
    },

    mounted() {
        this.getFilms(this.page)
    }
}
</script>
  
<style scoped></style>
  