import { defineStore } from "pinia";

export const useSortStore = defineStore("sort", {
  state: () => ({
    sortColumn: "",
    sortOrder: "asc" as "asc" | "desc",
  }),
  actions: {
    setSort(column: string) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortOrder = "asc";
      }
    },
  },
});
