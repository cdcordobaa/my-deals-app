import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./style.css";
import "./assets/tailwind.css";

import pinia from "./modules/pinia";
import { setupI18n } from "./modules/i18n";

library.add(fas);

async function startApp() {
  const i18n = await setupI18n();
  const app = createApp(App);
  app.use(i18n);
  app.use(pinia);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
}

startApp();
