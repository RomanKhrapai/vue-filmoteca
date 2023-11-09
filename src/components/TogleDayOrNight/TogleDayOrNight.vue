<template>
    <div class='toggle-switch'>
        <div> <label>
                <input type='checkbox' :checked="modelValue" @click="$emit('update:modelValue', $event.target.checked)">
                <span class='slider'></span>
            </label>
        </div>

    </div>
</template>
  
<script setup>
const props = defineProps({ 'modelValue': Boolean })
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>