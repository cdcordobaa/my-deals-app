// src/i18n.js
import { createI18n } from "vue-i18n";

async function loadLocaleMessages(locale: string) {
  const messages = await import(`../../locales/${locale}.json`);
  return messages.default;
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {},
});

export async function setupI18n(locale = "en") {
  const messages = await loadLocaleMessages(locale);
  i18n.global.setLocaleMessage(locale, messages);
  i18n.global.locale = locale;
  return i18n;
}

export default i18n;
