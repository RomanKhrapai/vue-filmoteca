<template>
    <AuthSection>
        <RegistrationForm />
    </AuthSection>
</template>

<script>
import RegistrationForm from "../auth/Registration/Registration.vue";
import AuthSection from "../auth/AuthSection.vue";
import { useFilmStore } from "../../store/film/filmStore"
import { mapActions, } from "pinia"


export default {
    name: 'RegistrationPage',
    components: {
        RegistrationForm,
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