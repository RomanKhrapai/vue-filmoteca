<template>
    <div>
        <slot></slot>
    </div>
</template>


<script>


export default {
    components: {},

    data() {
        return {
            films: null
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>
  
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

div {
    padding: 5px;
    background-color: $secondary-bg-color
}
</style>