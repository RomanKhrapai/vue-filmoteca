<template>
    <component :is="tagName" class="main-title">
        <slot></slot>
    </component>
</template>
  
<script setup>
import { computed, defineProps } from "vue"

const props = defineProps({
    level: {
        type: Number,
        default: 1,
    },
})
const tagName = computed(() => `h${props.level}`)
</script>
  
<style lang="scss" scoped>
.main-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.5em;
}
</style>