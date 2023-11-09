<template>
    <label class="custom-label "> {{ label }}
        <select class="custom-select" name="number" @input="selectedOption($event)">
            <option v-if="defaultOption" :value="defaultOption.value" :selected="modelValue === defaultOption.value">{{
                defaultOption.name }}</option>
            <option v-for="(option) of options" :key="option.id" :value="option.id" :selected="modelValue === option.id">{{
                option.name }}</option>
        </select></label>
</template>
  
<script setup>
const emit = defineEmits(['update:modelValue'])
const { defaultOption, label, options, modelValue } = defineProps({
    defaultOption: {
        type: Object,
        required: false,
        default: null,
        validator: function (value) {
            return value && typeof value.name === 'string' && typeof value.value === 'string';
        }
    },
    label: {
        type: String,
        required: false,
        default: '',
    },
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: String,
        default: "",
    },
})

function selectedOption(e) {
    emit("update:modelValue", e.target.value);
}
</script>
  
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.custom-label {
    display: flex;
    font-size: 18px;
    align-items: center;
}

.custom-select {
    height: 40px;
    border: 2px solid $border-color;
    outline: none;
    padding: 5px 15px;
    margin-left: 10px;
}
</style>
  