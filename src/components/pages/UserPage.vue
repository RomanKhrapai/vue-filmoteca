<template>
    <div>

        <h3>Сторінка доступна лише Користувачу</h3>

    </div>
</template>


<script>
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, } from "pinia"
export default {

    data() {
        return {

        }
    },
    methods: {
        ...mapActions(useFilmStore, ['falseLoading']),
    },
    mounted() {
        this.falseLoading();
    }
}
</script>
  
<style scoped></style>