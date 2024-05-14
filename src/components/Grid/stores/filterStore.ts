// stores/filterStore.ts
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    searchQuery: "",
  }),
  actions: {
    setSearchQuery(query: string) {
      console.log("Setting search query to", query);
      this.searchQuery = query;
    },
  },
});
