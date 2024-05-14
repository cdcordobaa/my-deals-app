import { createPinia, setActivePinia } from "pinia";
import { config } from "@vue/test-utils";
import { beforeEach } from "vitest";

config.global.plugins.push(createPinia());

beforeEach(() => {
  setActivePinia(createPinia());
});
