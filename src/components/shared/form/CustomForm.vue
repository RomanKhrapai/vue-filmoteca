<template>
    <form v-bind="$attrs" class="form">
        <slot></slot>
    </form>
</template>
  
<script>
export default {
    name: 'FormApp',
    provide() {
        return {
            form: this,
        };
    },
    data() {
        return {
            inputs: [],
        };
    },
    methods: {
        registerInput(input) {
            this.inputs.push(input);
        },
        unRegisterInput(input) {
            this.inputs.filter((item) => item !== input);
        },
        validate() {

            return this.inputs.reduce((isValid, input) => {
                const isInputValid = input.validate();

                return isValid && !isInputValid;
            }, true);
        },
        reset() {
            this.inputs.forEach((input) => input.reset());
        },
    },
    unmounted() {
        this.unRegisterInput()
    }
};
</script>
  
<style lang="scss" scoped></style>