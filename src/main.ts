import { createApp } from "vue";
import App from "./App.vue";

import "./style.css";
import "./assets/tailwind.css";
import pinia from "./modules/pinia";
import { setupI18n } from "./modules/i18n";

async function startApp() {
  const i18n = await setupI18n(); // setup with default locale
  const app = createApp(App);
  app.use(i18n);
  app.use(pinia);
  app.mount("#app");
}

startApp();
