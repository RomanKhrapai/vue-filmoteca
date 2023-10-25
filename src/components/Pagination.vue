<template>
    <div class="container">
        <button @click="prevPage"><v-icon icon="mdi-chevron-left-circle-outline" color="" size="50px"></v-icon></button>
        <input type="text" :value="page" @input="validation($event)">
        <button @click="nextPage"><v-icon icon="mdi-chevron-right-circle-outline" color="" size="50px"></v-icon></button>
    </div>
</template>
<script>
import { useFilmStore } from '../store/film/filmStore'
import { mapActions, mapState } from "pinia"

export default {
    props: { 'modelValue': Number, "totalPages": Number },
    methods: {
        ...mapActions(useFilmStore, ["nextPage", 'prevPage', 'setPage']),

        validation(e) {
            if (!Number.isFinite(+e.target.value)) {
                e.target.value = this.page
                return;
            }
            this.setPage(e.target.value)
        },

    },
    computed: {
        ...mapState(useFilmStore, ['page', "pages"])
    },
}
</script>

<style scoped>
input {
    text-align: center;
    width: 40px;
    background-color: rgb(255, 255, 255);
}

button {
    display: flex;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    justify-content: center;
}
</style>