<template>
    <AuthContainer class="registration">
        <MainTitle class="registration__title">Авторизація</MainTitle>
        <CustomForm ref="form" class="login__form" @submit.prevent="handleSubmit">
            <CustomInput v-model="email" autocomplete="email" placeholder="Електронна пошта" name="email"
                :rules="emailRules" class="login__input" :label="'Електронна пошта'" />
            <CustomInput v-model="password" type="password" autocomplete="current-password" placeholder="Пароль"
                name="password" :rules="passwordRules" class="login__input" :label="'Пароль'" />
            <SubmitButton class="login__btn" type="submit">Увійти</SubmitButton>
        </CustomForm>
        <span class="link" @click="$router.push({ name: 'registration' })"> Зареєструватися</span>

    </AuthContainer>
</template>
  
<script setup>
import CustomForm from "../../shared/form/CustomForm.vue";
import AuthContainer from "../AuthContainer.vue"
import CustomInput from "../../shared/form/CustomInput/CustomInput.vue";
import SubmitButton from "../../shared/form/SubmitButton/SubmitButton.vue";
import {
    emailValidation, passwordValidation, isRequired,
} from "../../../utils/validationRules";
import MainTitle from "../../shared/MainTitle.vue";
import { useAuthStore } from "../../../store/authStore"
import { storeToRefs } from "pinia"
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router";

const router = useRouter()

const email = ref("")
const password = ref("")
const form = ref(null)
const { isAuthorized } = storeToRefs(useAuthStore())
const { loginUser } = useAuthStore()

const emailRules = computed(() => [isRequired, emailValidation])

const passwordRules = computed(() => [isRequired, passwordValidation]);

function handleSubmit() {

    const isFormValid = form.value.validate()
    if (isFormValid) {
        loginUser({ email: email.value, password: password.value });
        form.value.reset()
    }
}
watch(isAuthorized, () => { if (isAuthorized) { router.push({ name: 'home' }) } })

</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>