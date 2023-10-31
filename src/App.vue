
<template>
  <div class="container-app" :style="{ backgroundColor: !isNightMode ? '#fff' : '#000000e0' }">
    <div class="bg-heder">
      <div class="container heder-nav">
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

          <router-link v-if="isAuthorized" to="/library">
            <v-tab :value="3">Бібліотека</v-tab>
          </router-link>
          <div class="auth">
            <router-link v-if="!isAuthorized" to="/auth/login">
              <v-tab :value="6">Увійти</v-tab>
            </router-link>

          </div>

        </v-tabs>
        <UserMenu v-if="isAuthorized"> </UserMenu>
      </div>
      <SearchForm />
    </div>
    <main class="container">
      <RouterView />
      <Loader v-if="isLoading" />
    </main>
    <TogleDayOrNight v-model="isNightMode" />
    <!-- <h3 class="text-day-night">{{ !isNightMode ? "Зараз ніч" : "Зараз день"}}</h3> -->
    <p>{{ `Vision not fully realised, but still a template of sorts. \r\n\r\nIt could never have lived up to the hype back
      in
      1989, it was hailed as the film to rival the impact of \"Jaws\" & \"Star Wars\" as regards historical cinema
      conventions, it was, we were led to believe, a new age in cinema, or so it seemed.As it was, the film went down a
      treat for the modern cinema going audience, it raked in cash galore and spawned a raft of very inferior sequels,
      even though ultimately critics of the time were less than impressed.\r\n\r\nSo it makes for something of an
      interesting experience viewing it again as each decade passes.More so in light of Christopher Nolan's bank busting
      \"Dark Knight\" series of films. I remember the hype and marketing campaign (T-Shirts and toys bonanza) that ensured
      that the film could never live up to the gargantuan hype, and I'm honest enough to say that I was a little
      underwhelmed on first viewing.Yet time has been very kind to it, now showing that Burton had the nous and foresight
      to reignite a genre without going purely for kiddie like appeasements.\r\n\r\nVisually the film still stands up
      with the best that today's genre pieces can offer, the sets are incredible, with Anton Furst rightly winning the big
      award for his work here, whilst Burton's dark and deep tone captures the essence of Gotham City and Bruce Wayne's
      troubled mind perfectly, but does the cast fully realise the potential on offer?.Michael Keaton as the troubled and
      vengeful Bruce Wayne, is a fine actor and it would only be in time where his take on Wayne the man would be
      appreciated, as the caped crusader he is outstanding and he set the bar high for all those that followed him.
      \r\n\r\nJack Nicholson has the time of his life camping it up as The Joker, and he steals the film for sure.This is
      not because he is acting with great poise and class, but purely because in a film calling for the battle of two
      unhinged characters, he is the one awash in colour and overacting the maniacal side of the character to the max.Kim
      Basinger looks great but doesn't have to do much as Vicki Vale except say her lines right, pout, look scared when
      required and scream with conviction, and she does all of these.But really any other actress could have done the
      same thing - though I'm personally relieved that Sean Young dropped out of the film and thus allowed some other
      actress to step in.\r\n\r\nThe supporting cast do OK, and the soundtrack by Prince pushes the boundaries of
      annoying caricature indulgence.Ultimately it's a fun ride, respectful of the source material and giving the comic
      book genre of fil a shot in the arm.Yet you can't help feeling that there is some great Burton vision here that
      never got fully realised.And that is a damn shame, and something that Burton himself would come to admit down the
      line. 8 / 10` }}</p>
    <p>
      {{ `_**Looks good, but surreal and tedious**_\r\n\r\nTim Burton's \"Batman\" (1989) is _so_ disappointing! Yeah, the
      costumes, sets, cast, cinematography and music are great, but the story is unrealistic, goofy and, worst of all,
      dull; in other words, it siphoned! Tim Burton is outstanding with visuals, but he failed to incorporate an
      interesting story. What good is a BORING film that looks great and doesn't take its subject seriously? This is a
      quintessential example of style over substance.\r\n\r\nMost of the high ratings are from people who saw it when they
      were kids and they're just nostalgic. If they viewed the film objectively as an adult, with respect to the true
      Batman of the silver/bronze/modern age of comics, they'd have to admit that it's not a good
      interpretation.\r\n\r\nSure, it could be accepted as a sort of an ALTERNATIVE Batman; a friend of mine who's in the
      comic business said this was the only way he could appreciate it. But if you want to see a serious Batman flick,
      true to the legend of the Dark Knight, catch \"Batman Begins\" (2005) and its sequels, they blow this overrated
      soporific dud out of the water.\r\n\r\nThe movie's overlong at 2 hours, 6 minutes. \r\n\r\nGRADE: C`}}
    </p>
  </div>
</template>
<script>

import TogleDayOrNight from "@/components/TogleDayOrNight";
import UserMenu from "./components/auth/UserMenu.vue";
import SearchForm from "./components/shared/form/SearchForm.vue";
import Loader from "./components/Loader.vue";
import { useAuthStore } from "./store/authStore"
import { mapState, mapActions } from "pinia"
import { mixinStart } from "./mixins/mixinStart";
import { useFilmStore } from "./store/film/filmStore";


export default {

  components: { TogleDayOrNight, UserMenu, SearchForm, Loader },
  mixins: [mixinStart],
  data() {
    return {
      isNightMode: false,
      tab: null,

    }
  },
  methods: {
    ...mapActions(useAuthStore, ['clearPath'])
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthorized', 'path']),
    ...mapState(useFilmStore, ['isLoading']),
  },
  watch: {
    '$route.meta.id'(id) {
      this.tab = id
    },
    isAuthorized(newVal) {
      if (newVal === true && this.path) {
        this.$router.push({ path: this.path });
        this.clearPath();
      }
    }
  },



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

.heder-nav {
  background: #25252596;

}

.bg-heder {
  min-width: 320px;
  height: 170px;
  animation: show 2s;

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  background: linear-gradient(90deg, rgba(0, 0, 0, 0.515), rgba(0, 0, 0, 0.526)),
  center / auto 100% no-repeat url('../src/assets/images/header.jpg'),
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
