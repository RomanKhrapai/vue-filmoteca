<template>
    <label class="custom-label " :class="[labelClass]"> {{ label }}
        <input v-on="listeners" v-bind="$attrs" @blur="blurHandler" :value="props.modelValue" class="custom-input"
            :class="!isValid && 'custom-input--error'" />
        <span v-if="!isValid" class="custom-input__error">{{ error }}</span>
    </label>
</template>
  
<script setup>

import { ref, inject, computed, onBeforeUnmount, onMounted, useAttrs } from "vue"
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'input'])

const isValid = ref(true);
const error = ref("")
const isFirstInput = ref(true)

const form = inject('form', null);


const props = defineProps({
    labelClass: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    modelValue: {
        type: String,
        default: '',
    },
    errorMessage: {
        type: String,
        default: "",
    },
    rules: {
        type: Array,
        default: () => [],
    },
});

const { labelClass, label, errorMessage, rules } = props
const listeners = computed(() => ({
    ...attrs,
    input: (event) => { emit("update:modelValue", event.target.value); },
}))

onMounted(() => {
    if (!form) return;
    form.registerInput({ reset, validate });
})
onBeforeUnmount(() => {
    if (!form) return;
    form.unRegisterInput({ reset, validate });
})


function validate() {

    isValid.value = rules.every((rule) => {

        const ruleResult = rule(props.modelValue);
        const hasPassed = !ruleResult

        if (!hasPassed) {
            error.value = ruleResult || errorMessage;
        }

        return hasPassed
    });
    return isValid.value
}
function blurHandler() {
    validate();
    if (isFirstInput.value) {
        validate();
    }
    isFirstInput.value = false;
}
function reset() {
    isFirstInput.value = true;
    isValid.value = true;
    emit("input", "");
}
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>