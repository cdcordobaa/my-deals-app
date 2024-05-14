import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useSelectionStore } from "../../../src/components/Grid/stores/selectedItemsStore";
import { useFilterStore } from "../../../src/components/Grid/stores/filterStore";
import { useSelectedStore } from "../../../src/components/Grid/stores/selectedStore";
import { useSortStore } from "../../../src/components/Grid/stores/sortStore";

describe("useSelectionStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    global.URL.createObjectURL = vi.fn(() => "http://localhost/blob");
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with an empty selection", () => {
    const store = useSelectionStore();
    expect(store.selectedItems.size).toBe(0);
  });

  it("toggles item selection", () => {
    const store = useSelectionStore();
    store.toggleSelection(1);
    expect(store.selectedItems.has(1)).toBe(true);
    store.toggleSelection(1);
    expect(store.selectedItems.has(1)).toBe(false);
  });

  it("clears all selections", () => {
    const store = useSelectionStore();
    store.toggleSelection(1);
    store.toggleSelection(2);
    store.clearSelection();
    expect(store.selectedItems.size).toBe(0);
  });

  it("exports selected items correctly", () => {
    const store = useSelectionStore();
    store.toggleSelection(1);
    store.toggleSelection(2);
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const columns = ["name"];

    store.exportSelected(items, columns);

    // Check if createObjectURL was called with the expected Blob
    expect(global.URL.createObjectURL).toHaveBeenCalledOnce();
    const blobPassed = (global.URL.createObjectURL as vi.Mock).mock.calls[0][0];
    expect(blobPassed).toBeInstanceOf(Blob);
    expect(blobPassed.type).toBe("text/csv;charset=utf-8;");

    // Check if the Blob content is as expected
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      expect(content).toContain('name\n"Item 1"\n"Item 2"\n');
    };
    reader.readAsText(blobPassed);

    // Check if revokeObjectURL was called
    expect(global.URL.revokeObjectURL).toHaveBeenCalledOnce();
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(
      "http://localhost/blob"
    );
  });

  it("handles multiple selections and deselections", () => {
    const store = useSelectionStore();
    store.toggleSelection(1);
    store.toggleSelection(2);
    store.toggleSelection(3);
    expect(store.selectedItems.size).toBe(3);
    store.toggleSelection(2);
    expect(store.selectedItems.size).toBe(2);
    expect(store.selectedItems.has(2)).toBe(false);
  });
});

// Tests for useFilterStore
describe("useFilterStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with an empty search query", () => {
    const store = useFilterStore();
    expect(store.searchQuery).toBe("");
  });

  it("updates the search query", () => {
    const store = useFilterStore();
    store.setSearchQuery("test query");
    expect(store.searchQuery).toBe("test query");
  });
});

// Tests for useSelectedStore
describe("useSelectedStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with no selected item and panel closed", () => {
    const store = useSelectedStore();
    expect(store.selectedItem).toBeNull();
    expect(store.isPanelOpen).toBe(false);
  });

  it("selects an item and opens the panel", () => {
    const store = useSelectedStore();
    store.selectItem({ id: 1, name: "Item 1" });
    expect(store.selectedItem).toEqual({ id: 1, name: "Item 1" });
    expect(store.isPanelOpen).toBe(true);
  });

  it("closes the panel", () => {
    const store = useSelectedStore();
    store.selectItem({ id: 1, name: "Item 1" });
    store.closePanel();
    expect(store.isPanelOpen).toBe(false);
  });
});

// Tests for useSortStore
describe("useSortStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with default sort values", () => {
    const store = useSortStore();
    expect(store.sortColumn).toBe("");
    expect(store.sortOrder).toBe("asc");
  });

  it("sets sort column and order", () => {
    const store = useSortStore();
    store.setSort("name");
    expect(store.sortColumn).toBe("name");
    expect(store.sortOrder).toBe("asc");
    store.setSort("name");
    expect(store.sortOrder).toBe("desc");
  });
});
