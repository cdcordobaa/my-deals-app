import { computed } from "vue";
import type { Deal } from "@/types/deals";
import { useSortStore } from "../stores/sortStore";
import { useFilterStore } from "../stores/filterStore"; // If using a dedicated filter store

export function useDeals(deals: Deal[]) {
  const sortStore = useSortStore();
  const filterStore = useFilterStore(); // If using a dedicated filter store

  const filteredAndSortedDeals = computed(() => {
    let filtered = deals;

    // Filter deals based on the search query
    if (filterStore.searchQuery) {
      filtered = filtered.filter((deal) =>
        Object.keys(deal).some((key) =>
          (deal as any)[key]
            .toString()
            .toLowerCase()
            .includes(filterStore.searchQuery.toLowerCase())
        )
      );
    }

    // Sort filtered deals
    return filtered.sort((a, b) => {
      let comparison = 0;
      if ((a as any)[sortStore.sortColumn] > (b as any)[sortStore.sortColumn]) {
        comparison = 1;
      } else if (
        (a as any)[sortStore.sortColumn] < (b as any)[sortStore.sortColumn]
      ) {
        comparison = -1;
      }
      return sortStore.sortOrder === "asc" ? comparison : -comparison;
    });
  });

  return { filteredAndSortedDeals };
}
