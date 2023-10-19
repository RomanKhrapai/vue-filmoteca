
<template>
  <div class="container-app">
    <div class="conainer">
      <v-container class="header">
        <v-row>
          <v-col cols="8">
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
              <router-link to="/hw_vue_5/">
                <v-tab :value="1" size="x-large" hide-slider variant="text">
                  <span class="logo">
                    <v-icon size="x-large" :icon="'mdi-video-vintage'"></v-icon>
                    Filmoteka
                  </span>
                </v-tab>
              </router-link>
              <router-link to="/hw_vue_5/films">
                <v-tab :value="2"> фільми</v-tab>
              </router-link>
              <router-link v-if="status === 'user'" to="/hw_vue_5/user">
                <v-tab :value="3">user</v-tab>
              </router-link>
              <router-link v-if="status === 'admin'" to="/hw_vue_5/admin">
                <v-tab :value="4">admin</v-tab>
              </router-link>
            </v-tabs>
          </v-col>
          <v-col cols="4">
            <v-radio-group v-model="status" inline>
              <v-radio label="guest" value="guest" @click="pushToHome()"></v-radio>
              <v-radio label="user" value="user" @click="pushToHome()"></v-radio>
              <v-radio label="admin" value="admin" @click="pushToHome()"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="bg-surface-variant main">
      <RouterView />
    </v-container>
    <h1>dsda</h1>
    <TogleDayOrNight />
  </div>
</template>
<script>

import TogleDayOrNight from "./components/TogleDayOrNight.vue";
export default {
  components: { TogleDayOrNight },

  data() {
    return {
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
.logo {
  padding: 9px 10px;
  background: radial-gradient(ellipse at 50%, #3333337e, #33333300 75%);

}

.header {
  height: 70px;
  background-color: rgba(238, 238, 238, 0.6);
  border-radius: 0 0 100px 100px / 0 0 50px 50px;

}



.conainer {
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

.container-app {
  height: 100%;
}
</style>
