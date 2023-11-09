<template>
    <form v-bind="$attrs" class="form">
        <slot></slot>
    </form>
</template>
  
<script setup >
import { provide, ref, onUnmounted } from 'vue';

provide('form', { registerInput, unRegisterInput })


const inputs = ref([])

defineExpose({
    validate,
    reset
})

function registerInput(input) {
    inputs.value.push(input);
}

function unRegisterInput(input) {
    inputs.value.filter((item) => item !== input);
}

function validate() {
    return inputs.value.reduce((isValid, input) => {

        const isInputValid = input.validate();
        return isValid && isInputValid;
    }, true);
}

function reset() {
    inputs.value.forEach((input) => input.reset());
}

onUnmounted(() => unRegisterInput())
</script>
  
<style lang="scss" scoped></style>