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
import { useFilmStore } from '../../../store/film/filmStore';
import { mapState, mapActions } from "pinia"

export default {
    data() {
        return {
            inputValue: '',
            error: null,
            timer: null,
        }
    },
    methods: {
        ...mapActions(useFilmStore, ['getSearchFilms']),
        searchFilm(e) {
            const res = this.searchValidation(this.inputValue)
            if (!res.error) {
                this.error = null;

                const routeName = this.$route?.name === 'home' ? {} : { name: "home" }
                this.$router.push({ ...routeName, query: { search: res.value } })
                this.getSearchFilms(res.value)
                return
            }
            this.error = res.errorMessage;
            this.timer = setTimeout(() => { this.error = null }, 2000)
        }
    },
    computed: {
        ...mapState(useFilmStore, ["searchText"])
    },
    watch: {
        searchText() {
            this.inputValue = this.searchText
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