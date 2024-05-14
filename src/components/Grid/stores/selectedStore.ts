import { defineStore } from "pinia";

export const useSelectedStore = defineStore("selected", {
  state: <T>() => ({
    selectedItem: null as T | null,
    isPanelOpen: false,
  }),
  actions: {
    selectItem<T>(item: T) {
      console.log("Selected item", item);
      this.selectedItem = item;
      this.isPanelOpen = true;
    },
    closePanel() {
      this.isPanelOpen = false;
    },
  },
});
