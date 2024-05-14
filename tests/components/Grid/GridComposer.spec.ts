import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useGrid } from "../../../src/components/Grid/composables/useGrid";
import { useSortStore } from "../../../src/components/Grid/stores/sortStore";
import { useFilterStore } from "../../../src/components/Grid/stores/filterStore";
import { nextTick } from "vue";

describe("useGrid", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("returns filtered and sorted items", () => {
    const items = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ];
    const { filteredAndSortedItems } = useGrid(items);
    expect(filteredAndSortedItems.value).toEqual(items);
  });

  it("filters items based on search query", async () => {
    const items = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ];
    const filterStore = useFilterStore();
    filterStore.setSearchQuery("Banana");

    const { filteredAndSortedItems } = useGrid(items);
    await nextTick();
    expect(filteredAndSortedItems.value).toEqual([{ id: 2, name: "Banana" }]);
  });

  it("sorts items by name in ascending order", async () => {
    const items = [
      { id: 3, name: "Cherry" },
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
    ];
    const sortStore = useSortStore();
    sortStore.setSort("name");

    const { filteredAndSortedItems } = useGrid(items);
    await nextTick();
    expect(filteredAndSortedItems.value).toEqual([
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ]);
  });

  it("sorts items by name in descending order", async () => {
    const items = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ];
    const sortStore = useSortStore();
    sortStore.setSort("name");
    sortStore.setSort("name");

    const { filteredAndSortedItems } = useGrid(items);
    await nextTick();
    expect(filteredAndSortedItems.value).toEqual([
      { id: 3, name: "Cherry" },
      { id: 2, name: "Banana" },
      { id: 1, name: "Apple" },
    ]);
  });
});
