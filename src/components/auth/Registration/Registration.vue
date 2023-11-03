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
  
<script>
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
import { mapActions, mapState } from "pinia"

export default {
    name: "RegistrationApp",
    components: {
        CustomForm,
        CustomInput,
        SubmitButton,
        AuthContainer,
        MainTitle,
        CustomCheckBox
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
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
                nameValidation,

            };
        },
        nameRules() {
            return [this.rules.isRequired, this.rules.nameValidation];
        },
        emailRules() {
            return [this.rules.isRequired, this.rules.emailValidation];
        },

        passwordRules() {
            return [this.rules.isRequired, this.rules.passwordValidation];
        },
        confirmPasswordRules() {
            return [
                (val) => {
                    return val !== this.password ? "Паролі не збігаються" : null
                },
            ];
        },
        checkBoxRules() {
            return [() => !this.agreeToRules ? "Згоду не підтверджено" : null];
        }
    },
    methods: {

        ...mapActions(useAuthStore, ["registerUser"]),

        async handleSubmit() {
            const { form } = this.$refs;
            const isFormValid = form.validate();
            if (isFormValid) {
                this.registerUser({ name: this.name, email: this.email, password: this.password });
                form.reset()
            }
        },
    },
    watch: {
        isAuthorized() {
            this.$router.push({ name: 'home' })
        }
    }
};
</script>
  
<style lang="scss" scoped>
@import "./style.module.scss";
</style>