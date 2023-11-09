<template>
    <div>
        <v-btn @click="redirectTo('/library')">
            Заплановані
        </v-btn>
        <v-btn @click="redirectTo('/library/favorite')">
            Улюблені
        </v-btn>
        <router-view></router-view>

    </div>
</template>


<script setup>
import { useRouter, } from "vue-router"

const router = useRouter();
function redirectTo(path) {
    router.push({
        path,
    })
}

</script>
  