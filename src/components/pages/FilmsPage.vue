<template>
    <div>

        <v-btn @click="redirectTo('/films')">
            Фільми
        </v-btn>
        <v-btn @click="redirectTo('/films/serials')">
            Серіали
        </v-btn>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

    data() {
        return {

        }
    },
    methods: {
        redirectTo(path) {
            this.$router.push({
                path,

            })
        },
    }
}
</script>
  
<style scoped></style>