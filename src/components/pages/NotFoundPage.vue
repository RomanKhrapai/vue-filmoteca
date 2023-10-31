<template>
    <div class="box-center">
        <h1>404 Такої сторінки не існує</h1>
    </div>
</template>
<script>
import { mapActions } from "pinia";
import { useFilmStore } from "../../store/film/filmStore";

export default {

    methods: {
        ...mapActions(useFilmStore, ['falseLoading'])
    },
    mounted() {
        this.falseLoading()
    }
}


</script>
  
<style scoped>
.box-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 170px);
}
</style>