import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router/index.js";

const vuetify = createVuetify({ components, directives });

const app = createApp(App);

app.use(router)
    .use(vuetify, {
        iconfont: "mdi",
    })
    .mount("#app");
