<template>
    <AuthSection>
        <LogInForm />
    </AuthSection>
</template>

<script setup>
import LogInForm from "../auth/LogIn/LogIn.vue";
import AuthSection from "../auth/AuthSection.vue";
import { useFilmStore } from "../../store/filmStore"
import { onMounted } from "vue"

const { falseLoading } = useFilmStore();

onMounted(() => falseLoading())

</script>

<style lang="scss" scoped></style>