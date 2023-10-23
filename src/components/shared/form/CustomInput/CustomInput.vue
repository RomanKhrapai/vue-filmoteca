<template>
    <label class="custom-label " :class="[labelClass]"> {{ label }}
        <input v-on="listeners" v-bind="$attrs" @blur="blurHandler" :value="modelValue" class="custom-input"
            :class="!isValid && 'custom-input--error'" />
        <span v-if="!isValid" class="custom-input__error">{{ error }}</span>
    </label>
</template>
  
<script>
export default {
    name: "CustomInput",
    data() {
        return {
            isValid: true,
            error: "",
            isFirstInput: true,
        };
    },
    inject: {
        form: {
            default: null,
        }
    },
    inheritAttrs: false,
    props: {
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
            default: "",
        },
        errorMessage: {
            type: String,
            default: "",
        },
        rules: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        listeners() {

            return {
                ...this.$attrs,
                input: (event) => { this.$emit("update:modelValue", event.target.value); },
            };
        },
    },
    watch: {
        value() {
            if (this.isFirstInput) return;

            this.validate();
        },
    },

    mounted() {
        if (!this.form) return;
        this.form.registerInput(this);
    },
    beforeUnmount() {
        if (!this.form) return;
        this.form.unRegisterInput(this);
    },
    methods: {
        validate() {
            this.isValid = this.rules.every((rule) => {
                const ruleResult = rule(this.modelValue);

                const hasPassed = !ruleResult

                if (!hasPassed) {
                    this.error = ruleResult || this.errorMessage;
                }
                return hasPassed;
            });
        },
        blurHandler() {
            this.validate();
            if (this.isFirstInput) {
                this.validate();
            }
            this.isFirstInput = false;
        },
        reset() {
            this.isFirstInput = true;
            this.isValid = true;
            this.$emit("input", "");
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>