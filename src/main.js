import "./assets/main.css";
import "vuetify/styles";
import "./fireBase/index";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import router from "./router/index.js";
import App from "./App.vue";

const vuetify = createVuetify({ components, directives });
const pinia = createPinia();
const app = createApp(App);

app.use(router)
    .use(pinia)
    .use(vuetify, {
        iconfont: "mdi",
    })
    .mount("#app");
