<template>
    <div class="menu-container">
        <div class="menu-btn" @click="useLogOut()">
            <v-icon size="large" :icon="'mdi-account'"></v-icon>
            {{ name }}
        </div>
    </div>
</template>
  
<script>
import { useAuthStore } from "../../store/authStore"
import { mapActions, mapState } from "pinia"

export default {
    name: 'UserMenu',

    computed: {
        ...mapState(useAuthStore, ['name']),

    },
    methods: {
        ...mapActions(useAuthStore, ['logOut']),
        useLogOut() {

            this.logOut();
            if (this.$route.meta?.auth === 'user') {
                this.$router.push({ name: 'home' })
            }
        }
    },

};
</script>
  
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.menu-container {
    position: absolute;
    right: 20px;
    top: 0;
}

.menu-list {
    background-color: $card-bg;
}

.menu-item {
    list-style: none;
    padding: 2px 5px;
}

.menu-btn {
    color: $secondary-color;
    display: flex;
    padding: 0 5px;
    align-items: center;
    height: 48px;
    min-width: 90px;

}
</style>