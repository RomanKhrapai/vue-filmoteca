<template>
    <div class="menu-container">
        <div class="menu-btn" @click="useLogOut()" v-tooltip="'Вийти'">
            <v-icon size="large" :icon="'mdi-account'"></v-icon>
            {{ name }}
        </div>
    </div>
</template>
  
<script setup>
import { useAuthStore } from "../../store/authStore"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { name } = storeToRefs(useAuthStore())
const { logOut } = useAuthStore()

function useLogOut() {

    logOut();
    if (route.meta?.auth === 'user') {
        router.push({ name: 'home' })
    }
}

</script>
  
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.menu-container {
    position: absolute;
    right: 20px;
    top: 0;
}

.menu-list {
    background-color: $card-bg;
}

.menu-item {
    list-style: none;
    padding: 2px 5px;
}

.menu-btn {
    color: $secondary-color;
    display: flex;
    padding: 0 5px;
    align-items: center;
    height: 48px;
    min-width: 90px;

}
</style>