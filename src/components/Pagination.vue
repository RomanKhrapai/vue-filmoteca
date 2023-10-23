<template>
    <div class="container">
        <button @click="prevPage"><v-icon icon="mdi-chevron-left-circle-outline" color="" size="50px"></v-icon></button>
        <input type="text" :value="modelValue" @keypress="checkKeyEnter($event.key);"
            @focusout="changeModalValue($event.target.value)" @input="validationInput($event)">
        <button @click="nextPage"><v-icon icon="mdi-chevron-right-circle-outline" color="" size="50px"></v-icon></button>
    </div>
</template>
<script>

// return () => { $emit('update:modelValue', num) } 
export default {
    props: { 'modelValue': Number, "totalPages": Number },
    data() {
        return {
            count: 1,
        }
    },
    methods: {
        checkKeyEnter(key) { if (key === "Enter" && this.count !== null) this.changeModalValue(+this.count) },
        changeModalValue(val) { if (val !== this.modelValue) this.$emit('update:modelValue', val) },
        validationInput(e) {
            const str = +e.target.value;
            if (Number.isFinite(str) && str !== 0) { return this.count = str <= this.totalPages ? str : this.totalPages }
            e.target.value = this.count
        },
        nextPage() {
            if (this.modelValue >= this.totalPages) { return }
            this.changeModalValue(this.modelValue + 1)
        },
        prevPage() {
            if (this.modelValue <= 1) { return }
            this.changeModalValue(this.modelValue - 1)
        }
    }
}
</script>

<style scoped>
input {
    text-align: center;
    width: 40px;
    background-color: rgb(255, 255, 255);
}

button {
    display: flex;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    justify-content: center;
}
</style>