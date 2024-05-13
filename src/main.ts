import { createApp } from "vue";
import App from "./App.vue";
import VueVirtualScroller from "vue-virtual-scroller";

import "./style.css";
import "./assets/tailwind.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import pinia from "./modules/pinia";
import { setupI18n } from "./modules/i18n";

async function startApp() {
  const i18n = await setupI18n(); // setup with default locale
  const app = createApp(App);
  app.use(i18n);
  app.use(pinia);
  app.use(VueVirtualScroller);
  app.mount("#app");
}

startApp();
