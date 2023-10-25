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
  
<script>
import CustomForm from "../../shared/form/CustomForm.vue";
import AuthContainer from "../AuthContainer.vue"
import CustomInput from "../../shared/form/CustomInput/CustomInput.vue";
import SubmitButton from "../../shared/form/SubmitButton/SubmitButton.vue";
import {
    emailValidation, passwordValidation, isRequired,
} from "../../../utils/validationRules";
import MainTitle from "../../shared/MainTitle.vue";
import { useAuthStore } from "../../../store/auth/authStore"
import { mapActions, mapState } from "pinia"

export default {
    name: "LogInApp",
    components: {
        CustomForm,
        CustomInput,
        SubmitButton,
        AuthContainer,
        MainTitle,
    },
    data() {
        return {
            email: "",
            password: "",
            agreeToRules: false,
        };
    },
    computed: {
        ...mapState(useAuthStore, ['isAuthorized']),
        rules() {
            return {
                emailValidation,
                passwordValidation,
                isRequired,
            };
        },

        emailRules() {
            return [this.rules.isRequired, this.rules.emailValidation];
        },

        passwordRules() {
            return [this.rules.isRequired, this.rules.passwordValidation];
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["loginUser"]),

        handleSubmit() {
            const { form } = this.$refs;
            const isFormValid = form.validate();
            if (isFormValid) {
                this.loginUser({ email: this.email, password: this.password });
                form.reset()
            }
        },
    },
    watch: {
        isAuthorized() {
            if (this.isAuthorized) {
                this.$router.push({ name: 'home' }
                )
            }
        }
    }
};
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>