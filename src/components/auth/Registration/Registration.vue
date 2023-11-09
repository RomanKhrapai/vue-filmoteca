<template>
    <AuthContainer class="registration">
        <MainTitle class="registration__title">Реєстрація</MainTitle>
        <CustomForm ref="form" class="registration__form" @submit.prevent="handleSubmit">
            <CustomInput v-model="name" autocomplete="username" placeholder="Ім`я" name="name" :label="'Ім`я'"
                :rules="nameRules" class="registration__input" />
            <CustomInput v-model="email" autocomplete="email" placeholder="Електронна пошта" name="email"
                :rules="emailRules" class="registration__input" :label="'Електронна пошта'" />
            <CustomInput v-model="password" type="password" autocomplete="current-password" placeholder="Пароль"
                name="password" :rules="passwordRules" class="registration__input" :label="'Пароль'" />
            <CustomInput v-model="confirmPassword" type="password" autocomplete="current-password"
                placeholder="Підтвердити пароль" name="password" :rules="confirmPasswordRules" class="registration__input"
                :label="'Підтвердити пароль'" />
            <CustomCheckBox v-model="agreeToRules" type="checkbox" name="rules" :rules="checkBoxRules"
                class="registration__input check-box__input" :label="'Згода з правилами сайту'"
                :labelClass="'line__label'" />
            <SubmitButton class="registration__btn" type="submit">Зареєструватися</SubmitButton>
        </CustomForm>
        <span class="link" @click="$router.push({ name: 'login' })">Вже зареєстрований</span>

    </AuthContainer>
</template>
  
<script setup>
import CustomForm from "../../shared/form/CustomForm.vue";
import AuthContainer from "../AuthContainer.vue"
import CustomInput from "../../shared/form/CustomInput/CustomInput.vue";
import CustomCheckBox from "../../shared/form/CustomInput/CustomCheckBox.vue";
import SubmitButton from "../../shared/form/SubmitButton/SubmitButton.vue";
import {
    emailValidation, passwordValidation, isRequired, nameValidation,
} from "../../../utils/validationRules";
import MainTitle from "../../shared/MainTitle.vue";
import { useAuthStore } from "../../../store/authStore"
import { storeToRefs } from "pinia"
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const agreeToRules = ref(false)


const form = ref(null)


const { registerUser } = useAuthStore()
const { isAuthorized } = storeToRefs(useAuthStore())

const nameRules = computed(() => [isRequired, nameValidation]);
const emailRules = computed(() => [isRequired, emailValidation])
const passwordRules = computed(() => [isRequired, passwordValidation])
const confirmPasswordRules = computed(() => [(val) => val !== password.value ? "Паролі не збігаються" : null])
const checkBoxRules = computed(() => [() => !agreeToRules.value ? "Згоду не підтверджено" : null])

function handleSubmit() {
    const isFormValid = form.value.validate()
    if (isFormValid) {
        registerUser({ name: name.value, email: email.value, password: password.value });
        form.value.reset()
    }
}

watch(isAuthorized, () => router.push({ name: 'home' })) 
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>