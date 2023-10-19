<template>
    <v-row no-gutters>
        <v-col v-for="person in persons" :key="person.id" cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">

                <CardPerson :dataPerson="person" @click="redirectTo(person.id)"></CardPerson>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import CardPerson from "./CardPerson.vue"

export default {
    components: { CardPerson },
    props: ["persons"],
    data() {

        return {

        }
    },
    methods: {
        redirectTo(id) {
            this.$router.push({
                name: 'personById',
                params: {
                    id: id,
                }
            })
        },
    },
    mounted() {
        console.log(this.persons);
    }
}
</script>
  
<style scoped></style>