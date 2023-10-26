<template>
    <div class="form-box">
        <form class=form-name @submit.prevent="searchFilm">
            <input class=form-input v-model="inputValue" type=text autocomplete=off placeholder='Назва фільму' />
            <button class=form-button aria-label=search type=submit>Пошук</button>
        </form>
        <span class="form-error" v-if="error">{{ error }}</span>
    </div>
</template>

<script>

export default {
    data() {
        return {
            inputValue: '',
            error: null,
            timer: null,
        }
    },
    methods: {

        searchFilm() {
            const res = this.searchValidation(this.inputValue)
            if (!res.error) {
                this.error = null;
                alert("запит за виразом - " + res.value)
                console.log(res.value);
                return
            }
            this.error = res.errorMessage;
            this.timer = setTimeout(() => { this.error = null }, 2000)
        }
    }
};
</script>
  
<style scoped>
.form-name {
    display: flex;
    justify-content: center;
    height: 30px;
    padding: 0;
    margin-right: 10px;

}

.form-input {
    border-radius: 10px 0 0 10px;
    padding-left: 20px;
    border-right: none;
    background-color: #333333;
}

.form-button {
    border-radius: 0 10px 10px 0;
    padding-right: 10px;
    background-color: #333333;
}

.form-error {
    color: red;
}

.form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
</style>