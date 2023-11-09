<template>
    <div class='stars-container'>

        <div class="stars-box">
            <v-icon size="large" :icon="starShow(1)" color="yellow" />
            <v-icon size="large" :icon="starShow(2)" color="yellow" />
            <v-icon size="large" :icon="starShow(3)" color="yellow" />
            <v-icon size="large" :icon="starShow(4)" color="yellow" />
            <v-icon size="large" :icon="starShow(5)" color="yellow" />
        </div>


    </div>
</template>
  
<script setup>

const props = defineProps(['rating'])

function starShow(index) {
    const num = Math.round(props.rating) - index * 2;
    if (num < -1) {
        return 'mdi-star-outline'
    } else if (num === -1) {
        return 'mdi-star-half-full'
    } else {
        return 'mdi-star'
    }
}

</script>
  
<style lang="scss" scoped>
.stars-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
}
</style>