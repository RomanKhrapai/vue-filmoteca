<template>
    <AuthSection>
        <RegistrationForm />
    </AuthSection>
</template>

<script setup>
import RegistrationForm from "../auth/Registration/Registration.vue";
import AuthSection from "../auth/AuthSection.vue";
import { useFilmStore } from "../../store/filmStore"
import { onMounted, } from "vue"

const { falseLoading } = useFilmStore()

onMounted(() => falseLoading())
</script>
