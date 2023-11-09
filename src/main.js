import "./assets/main.css";
import "vuetify/styles";
import "./fireBase/index";
import "vue-toastification/dist/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Toast from "vue-toastification";

import router from "./router/index.js";
import App from "./App.vue";
import { TOAST_OPTIONS } from "./constants";

const vuetify = createVuetify({ components, directives });
const pinia = createPinia();
const app = createApp(App);

app.use(router)
    .use(pinia)
    .use(Toast, TOAST_OPTIONS)
    .directive("tooltip", (el, param) => {
        const span = document.createElement("span");
        span.classList.add("tooltiptext");
        span.classList.add("tooltiptext-top");
        span.innerHTML = param.value;
        el.style.position = "relative";
        setTimeout(() => {
            el.addEventListener(
                "mouseover",
                (e) => {
                    let x = e.pageX,
                        y = e.pageY;
                    span.style.top =
                        y -
                        el.getBoundingClientRect().top -
                        20 -
                        window.scrollY +
                        "px";
                    span.style.left =
                        x -
                        el.getBoundingClientRect().left -
                        70 -
                        window.scrollX +
                        "px";
                },
                {
                    capture: true,
                }
            );
            el.classList.add("tooltip");

            el.appendChild(span);
        }, 900);
    })
    .use(vuetify, {
        iconfont: "mdi",
    })
    .mount("#app");
