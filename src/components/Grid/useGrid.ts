import { ref, computed, watchEffect, onMounted } from "vue";
import type { Column } from "./gridTypes";
import type { Deal } from "@/types/deals";
import { debounce } from "lodash-es";
import Fuse from "fuse.js";

export function useGrid(items: Deal[], columns: Column[]) {
  const allItems = ref(items);
  const sortColumn = ref("");
  const sortOrder = ref<"asc" | "desc">("asc");
  const selectedItems = ref<Set<number>>(new Set());
  const searchQuery = ref("");
  const filteredItems = ref([...allItems.value]);
  const isPanelOpen = ref(false);
  const selectedItem = ref<Deal | null>(null);

  const options = {
    includeScore: true,
    isCaseSensitive: false,
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    keys: columns.map((col) => col.key),
  };

  let fuse: Fuse<Deal>;
  onMounted(() => {
    fuse = new Fuse<Deal>(items, options);
  });

  const searchItems = () => {
    if (searchQuery.value.trim() === "") {
      filteredItems.value = items;
    } else {
      const results = fuse.search(searchQuery.value);
      filteredItems.value = results.map((result) => result.item);
    }
  };

  const debounceSearchItems = debounce(() => {
    searchItems();
  }, 300);

  const toggleSelection = (id: number) => {
    if (selectedItems.value.has(id)) {
      selectedItems.value.delete(id);
    } else {
      selectedItems.value.add(id);
    }
    if (selectedItems.value.size > 1 && isPanelOpen.value) {
      isPanelOpen.value = false;
    }
  };

  const sortBy = (column: string) => {
    if (sortColumn.value === column) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortColumn.value = column;
      sortOrder.value = "asc";
    }
    allItems.value.sort((a: any, b: any) => {
      const valueA = a[column as keyof typeof a];
      const valueB = b[column as keyof typeof b];
      if (sortOrder.value === "asc") return valueA > valueB ? 1 : -1;
      else return valueA < valueB ? 1 : -1;
    });
  };

  const openPanel = (item: Deal) => {
    selectedItem.value = item;
    isPanelOpen.value = true;
  };

  const closePanel = () => {
    isPanelOpen.value = false;
  };

  const deleteSelected = () => {
    console.log("Delete selected items:", Array.from(selectedItems.value));
    // Implement deletion logic
  };

  const exportSelected = () => {
    if (selectedItems.value.size === 0) {
      alert("No items selected for export.");
      return;
    }

    const itemsArray = Array.from(selectedItems.value).map((id) =>
      allItems.value.find((item) => item.id === id)
    );

    const columns = ["id", "issuer_name", "deal_name", "industry"];
    const headerString = columns.join(",") + "\n";
    const csvContent = itemsArray.reduce((acc: string, item: any) => {
      const row = columns
        .map((fieldName: string) =>
          JSON.stringify(item[fieldName as keyof typeof item])
        )
        .join(",");
      return acc + row + "\n";
    }, headerString);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "exported_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  watchEffect(() => {
    if (searchQuery.value === "") {
      filteredItems.value = [...allItems.value];
    } else {
      debounceSearchItems();
    }
  });

  return {
    sortedItems: filteredItems,
    searchQuery,
    sortBy,
    toggleSelection,
    openPanel,
    isPanelOpen,
    selectedItem,
    closePanel,
    deleteSelected,
    exportSelected,
  };
}
