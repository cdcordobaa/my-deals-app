import { createApp } from "vue";
import App from "./App.vue";
import VueVirtualScroller from "vue-virtual-scroller";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./style.css";
import "./assets/tailwind.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import pinia from "./modules/pinia";
import { setupI18n } from "./modules/i18n";

// Add all solid icons to the library so you can use them in your components
library.add(fas);

async function startApp() {
  const i18n = await setupI18n(); // setup with default locale
  const app = createApp(App);
  app.use(i18n);
  app.use(pinia);
  app.use(VueVirtualScroller);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
}

startApp();
