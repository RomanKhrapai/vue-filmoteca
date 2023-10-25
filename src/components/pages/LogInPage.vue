<template>
    <AuthSection>
        <LogInForm />
    </AuthSection>
</template>

<script>
import LogInForm from "../auth/LogIn/LogIn.vue";
import AuthSection from "../auth/AuthSection.vue";

export default {
    name: 'LogInPage',
    components: {
        LogInForm,
        AuthSection,
    }
}
</script>

<style lang="scss" scoped></style>