<template>
    <div>
        <div>
            <v-btn @click="redirectTo('/films')">
                Фільми
            </v-btn>
            <v-btn @click="redirectTo('/films/serials')">
                Серіали
            </v-btn>
            <router-view></router-view>
        </div>
        <NotFoundPageVue v-if="!isLoading && isError"></NotFoundPageVue>
    </div>
</template>

<script setup>
import NotFoundPageVue from './NotFoundPage.vue';
import { useRouter } from 'vue-router'
import { useFilmStore } from '../../store/filmStore';
import { storeToRefs } from 'pinia';

const { isLoading, isError } = storeToRefs(useFilmStore())

const router = useRouter();

function redirectTo(path) {

    router.push({
        path,
    })
}

</script>
  
<style scoped></style>