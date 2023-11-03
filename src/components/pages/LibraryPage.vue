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


<script>
import { useAuthStore } from "../../store/authStore";
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, } from "pinia"
export default {

    data() {
        return {

        }
    },
    methods: {
        ...mapActions(useFilmStore, ['falseLoading']),
        ...mapActions(useAuthStore, ['getLibrari']),

        redirectTo(path) {
            this.$router.push({
                path,
            })
        },
    },
    mounted() {
        this.falseLoading();
    }
}
</script>
  
<style scoped></style>