import { computed } from "vue";
import { useSortStore } from "../stores/sortStore";
import { useFilterStore } from "../stores/filterStore";

export function useGrid<T extends Record<string, any>>(items: T[]) {
  const sortStore = useSortStore();
  const filterStore = useFilterStore();

  const filteredAndSortedItems = computed(() => {
    let filtered = items;

    if (filterStore.searchQuery) {
      filtered = items.filter((item) => {
        const searchLower = filterStore.searchQuery.toLowerCase();
        return Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchLower)
        );
      });
    }

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

