
<template>
  <div class="container-app">
    <div class="bg-heder">
      <div class="container">
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
          <router-link to="/">
            <v-tab :value="1" size="x-large" hide-slider variant="text">
              <span class="logo">
                <v-icon size="x-large" :icon="'mdi-video-vintage'"></v-icon>
                Filmoteka
              </span>
            </v-tab>
          </router-link>
          <router-link to="/films">
            <v-tab :value="2"> фільми</v-tab>
          </router-link>

          <router-link v-if="isAuthorized" to="/user">
            <v-tab :value="3">user</v-tab>
          </router-link>
          <div class="auth">
            <router-link v-if="!isAuthorized" to="/auth/login">
              <v-tab :value="6">Увійти</v-tab>
            </router-link>

          </div>

        </v-tabs>
        <UserMenu v-if="isAuthorized"> </UserMenu>
      </div>

    </div>
    <main class="container">
      <RouterView />
    </main>
    <TogleDayOrNight v-model="isNightMode" />
    <h3 class="text-day-night">{{ !isNightMode ? "Зараз ніч" : "Зараз день" }}</h3>

  </div>
</template>
<script>

import TogleDayOrNight from "@/components/TogleDayOrNight";
import DynamicClass from "./components/DynamicClass.vue"
import UserMenu from "./components/auth/UserMenu.vue";
import { useAuthStore } from "./store/auth/authStore"
import { mapActions, mapState } from "pinia"
import { useGenreStore } from "./store/genresStore";
export default {
  components: { TogleDayOrNight, DynamicClass, UserMenu },

  data() {
    return {
      isNightMode: false,
      tab: null,

    }
  },
  methods: {
    ...mapActions(useGenreStore, ['getgenres']),

  },
  computed: {
    ...mapState(useAuthStore, ['isAuthorized']),

  },
  watch: {
    '$route.meta.id'(id) {
      this.tab = id
    },

    status(newStatus) {
      localStorage.setItem("status", newStatus);
    }
  },
  created() {
    this.getgenres()
  }

}
</script>

<style scoped>
.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 20px;
  padding-left: 20px;
  width: 320px;

  @media screen and (min-width: 768px) {
    width: 768px;
    padding-left: 75px;
    padding-right: 75px;
  }

  @media screen and (min-width: 1024px) {
    width: 1024px;
    padding-left: 71px;
    padding-right: 71px;
  }
}

.logo {
  padding: 9px 10px;
  background: radial-gradient(ellipse at 50%, #3333337e, #33333300 75%);

}

.header {
  height: 70px;
  background-color: rgba(238, 238, 238, 0.6);
  border-radius: 0 0 100px 100px / 0 0 50px 50px;

}



.bg-heder {
  min-width: 320px;
  height: 230px;
  animation: show 2s;

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  background: linear-gradient(90deg, rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26)),
  center / auto no-repeat url('../src/images/header/filmoteka-desktop-x2.jpg'),
  #000103;
}

.text-day-night {
  position: fixed;
  bottom: 0px;
  right: 30px;
}

.auth {
  position: absolute;
  right: 20px;
}
</style>
