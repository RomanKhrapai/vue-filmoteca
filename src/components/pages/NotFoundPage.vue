<template>
    <div class="box-center">
        <h1>404 Такої сторінки не існує</h1>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useFilmStore } from "../../store/filmStore";

const { falseLoading } = useFilmStore()

onMounted(() => falseLoading())

</script>
  
<style scoped>
.box-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 170px);
}
</style>