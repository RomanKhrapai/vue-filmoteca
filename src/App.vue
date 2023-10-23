
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
          <router-link v-if="status === 'guest'" to="/auth/registration">
            <v-tab :value="5">реестрація</v-tab>
          </router-link>
          <router-link v-if="status === 'user'" to="/user">
            <v-tab :value="3">user</v-tab>
          </router-link>
          <router-link v-if="status === 'admin'" to="/admin">
            <v-tab :value="4">admin</v-tab>
          </router-link>
        </v-tabs>
      </div>


    </div>
    <main class="container">
      <RouterView />
    </main>
    <TogleDayOrNight v-model="isNightMode" />
    <h3 class="text-day-night">{{ !isNightMode ? "Зараз ніч" : "Зараз день" }}</h3>
    <DynamicClass />
    <div class="select-role"><v-radio-group v-model="status">
        <v-radio label="guest" value="guest" @click="pushToHome()"></v-radio>
        <v-radio label="user" value="user" @click="pushToHome()"></v-radio>
        <v-radio label="admin" value="admin" @click="pushToHome()"></v-radio>
      </v-radio-group></div>
  </div>
</template>
<script>

import TogleDayOrNight from "@/components/TogleDayOrNight";
import DynamicClass from "./components/DynamicClass.vue"
export default {
  components: { TogleDayOrNight, DynamicClass },

  data() {
    return {
      isNightMode: false,
      tab: null,
      status: null,
    }
  },
  methods: {
    pushToHome() {
      this.tab = 1
      this.$router.push({ name: "home" })
    },
  },
  computed: {

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
    this.status = localStorage.getItem("status") || "guest"
  }

}
</script>

<style scoped>
.container {
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

.select-role {
  position: absolute;
  top: 10px;
  background-color: beige;
  right: 10px;
  height: 120px;
  width: 100px;
}
</style>
