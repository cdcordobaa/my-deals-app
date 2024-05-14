import { defineStore } from "pinia";

export const useSelectionStore = defineStore("selection", {
  state: () => ({
    selectedItems: new Set<number>(),
  }),
  actions: {
    toggleSelection(id: number) {
      if (this.selectedItems.has(id)) {
        this.selectedItems.delete(id);
      } else {
        this.selectedItems.add(id);
      }
    },
    clearSelection() {
      this.selectedItems.clear();
    },
    exportSelected(items: Record<string, any>[], columns: string[]) {
      const headerString = columns.join(",") + "\n";
      const csvContent = items.reduce((acc, item) => {
        const row = columns
          .map((fieldName) => JSON.stringify(item[fieldName]))
          .join(",");
        return acc + row + "\n";
      }, headerString);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "exported_data.csv";
      link.click();
      URL.revokeObjectURL(url);
    },
  },
});
