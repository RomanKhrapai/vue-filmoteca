<template>
    <div class="container" v-if="pages !== 1 && pages">
        <button v-tooltip="'Попередння сторінка'" @click="prevPage"><v-icon icon="mdi-chevron-left-circle-outline" color=""
                size="50px"></v-icon></button>
        <input type="text" :value="page" @input="validation($event)">
        <p class="bg">/</p>
        <p class="pages bg">{{ pages }}</p>
        <button v-tooltip="'Наступна сторінка'" @click="nextPage"><v-icon icon="mdi-chevron-right-circle-outline" color=""
                size="50px"></v-icon></button>
    </div>
</template>
<script setup>
import { useFilmStore } from '../store/filmStore'
import { storeToRefs } from "pinia"
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const { nextPage, prevPage, setPage } = useFilmStore();
const { page, pages } = storeToRefs(useFilmStore())

function validation(e) {
    if (!Number.isFinite(+e.target.value)) {
        e.target.value = page.value
        return;
    }
    setPage(e.target.value)
}

watch(page, () => {
    router.push({
        query: { ...router.query, page: page.value }
    })
})

</script>

<style scoped>
.pages {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg {
    background-color: rgb(255, 255, 255);
}

p {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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
    margin-left: 10px;
    margin-right: 10px;
}

.container {
    display: flex;
    justify-content: center;
}
</style>