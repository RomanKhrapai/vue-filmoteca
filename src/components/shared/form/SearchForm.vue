<template>
    <div class="form-box">
        <form class=form-name @submit.prevent="searchFilm">
            <input class=form-input :value="search" @input="updateValue" type=text autocomplete=off
                placeholder='Назва фільму' />
            <button v-tooltip="'Шукати'" class=form-button aria-label=search type=submit>Пошук</button>
        </form>
        <span class="form-error" v-if="error">{{ error }}</span>
    </div>
</template>

<script setup>
import { useFilmStore } from '../../../store/filmStore';
import { searchValidation } from '../../../utils/searchValidation'
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();

const inputValue = ref('')
const error = ref(null)
const timer = ref(null)

const { getSearchFilms } = useFilmStore();
const { search } = storeToRefs(useFilmStore());

function updateValue(e) {
    inputValue.value = e.target.value;
}

function searchFilm(e) {
    const res = searchValidation(inputValue.value)
    if (!res.error) {
        error.value = null;

        const routeName = route?.name === 'home' ? {} : { name: "home" }
        router.push({ ...routeName, query: { search: res.value } })

        getSearchFilms(res.value)
        return
    }
    error.value = res.errorMessage;
    timer.value = setTimeout(() => { error.value = null }, 2000)
}
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
    height: 40px;
    padding-left: 20px;
    border-right: none;
    font-size: 20px;
    background-color: #333333;
}

.form-button {
    height: 40px;
    border-radius: 0 10px 10px 0;
    padding: 0 20px 0 10px;
    font-size: 20px;
    background-color: #333333;
}

.form-error {
    margin-top: 5px;
    color: red;
}

.form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
}
</style>