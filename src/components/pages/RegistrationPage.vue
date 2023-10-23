<template>
    <AuthSection>
        <RegistrationForm />
    </AuthSection>
</template>

<script>
import RegistrationForm from "../auth/Registration/Registration.vue";
import AuthSection from "../auth/AuthSection.vue";

export default {
    name: 'RegistrationPage',
    components: {
        RegistrationForm,
        AuthSection,
    }
}
</script>

<style lang="scss" scoped></style>