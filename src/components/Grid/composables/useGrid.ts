import { ref, computed, watchEffect } from "vue";
import Fuse from "fuse.js";
import { useSortStore } from "../stores/sortStore";
import { useFilterStore } from "../stores/filterStore";

export function useGrid<T extends Record<string, any>>(items: T[]) {
  const sortStore = useSortStore();
  const filterStore = useFilterStore();
  const fuse = ref<Fuse<T>>();

  watchEffect(() => {
    const options = {
      includeScore: true,
      isCaseSensitive: false,
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      keys: Object.keys(items[0] || {}),
    };
    fuse.value = new Fuse(items, options);
  });

  const filteredAndSortedItems = computed(() => {
    let filtered: T[] = items;

    // Use Fuse.js for searching if there's a query
    if (filterStore.searchQuery) {
      const results = fuse.value?.search(filterStore.searchQuery);
      filtered = results?.map((result) => result.item) || [];
      console.log("Search results:", filtered);
    }

    // Sorting logic
    if (sortStore.sortColumn) {
      const order = sortStore.sortOrder === "asc" ? 1 : -1;
      filtered = filtered.sort((a, b) => {
        const valueA = String(a[sortStore.sortColumn]);
        const valueB = String(b[sortStore.sortColumn]);
        return valueA.localeCompare(valueB) * order;
      });
    }

    return filtered;
  });

  return { filteredAndSortedItems };
}
