<template>
    <div class="container">
        <label>
            Введіть назви класів через пробіл
            <input type="text" v-model="classesText">
        </label>
        <div :class="classesText" class="block">Якийсь блок</div>
    </div>
</template>
<script>



export default {

    data() {
        return {
            classesText: ''
        }
    },
    methods: {

    }
}
</script>
  
<style scoped>
input {
    background-color: rgb(210, 166, 101);
}

.container {
    padding: 20px;
    border: solid;
    background-color: antiquewhite;
}

.block {
    height: 100px;
    width: 100px;
    background-color: aqua;
}
</style>