<template>
    <AuthSection>
        <LogInForm />
    </AuthSection>
</template>

<script>
import LogInForm from "../auth/LogIn/LogIn.vue";
import AuthSection from "../auth/AuthSection.vue";
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, } from "pinia"

export default {
    name: 'LogInPage',
    components: {
        LogInForm,
        AuthSection,
    },
    methods: {
        ...mapActions(useFilmStore, ['falseLoading']),
    },
    mounted() {
        this.falseLoading();
    }
}
</script>

<style lang="scss" scoped></style>