import { computed } from "vue";
import { useSortStore } from "../stores/sortStore";
import { useFilterStore } from "../stores/filterStore";

export function useGrid<T>(items: T[]) {
  const sortStore = useSortStore();
  const filterStore = useFilterStore();

  const filteredAndSortedItems = computed(() => {
    let filtered = items.filter((item: any) =>
      item[filterStore.searchQuery as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(filterStore.searchQuery.toLowerCase())
    );
    return filtered.sort((a: any, b: any) => {
      const order = sortStore.sortOrder === "asc" ? 1 : -1;
      return (
        (a[sortStore.sortColumn as keyof typeof a] >
        b[sortStore.sortColumn as keyof typeof b]
          ? 1
          : -1) * order
      );
    });
  });

  return { filteredAndSortedItems };
}
