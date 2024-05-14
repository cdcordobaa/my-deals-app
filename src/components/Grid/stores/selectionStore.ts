import { defineStore } from "pinia";
import type { Deal } from "@/types/deals";

export const useSelectionStore = defineStore("selection", {
  state: () => ({
    selectedDeal: null as Deal | null,
    isPanelOpen: false,
  }),
  actions: {
    selectDeal(deal: Deal) {
      this.selectedDeal = deal;
      this.isPanelOpen = true;
    },
    closePanel() {
      this.isPanelOpen = false;
    },
  },
});
