import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Grid from "../../../src/components/Grid/Grid.vue";
import TableHeader from "../../../src/components/Grid/TableHeader.vue";
import TableRow from "../../../src/components/Grid/TableRow.vue";

type GridComponent = {
  handleToggleAllSelection: (selectAll: boolean) => Promise<void>;
  selectedItems: Set<any>;
};

interface GridComponentMethods {
  exportSelectedItems: () => void;
}

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Grid.vue", () => {
  it("renders correctly with props", () => {
    const wrapper = mount(Grid, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        items: [{ id: 1, name: "Test Deal" }],
        columns: [{ key: "name", label: "Name" }],
      },
    });
    expect(wrapper.text()).toContain("Test Deal");
  });

  it("toggles selection of all items correctly", async () => {
    const wrapper = mount(Grid, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        items: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
        ],
        columns: [{ key: "name", label: "Name" }],
      },
    });

    const vm = wrapper.vm as unknown as GridComponent;
    await vm.handleToggleAllSelection(true);
    expect(vm.selectedItems.size).toBe(2);

    await vm.handleToggleAllSelection(false);
    expect(vm.selectedItems.size).toBe(0);
  });

  it("alerts when trying to export with no selected items", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(Grid, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        items: [{ id: 1, name: "Item 1" }],
        columns: [{ key: "name", label: "Name" }],
      },
    });

    // Assert the type of the component instance
    const vm = wrapper.vm as unknown as GridComponentMethods;

    // Directly call the method
    await vm.exportSelectedItems();

    expect(alertMock).toHaveBeenCalledWith("No items selected for export.");
    alertMock.mockRestore();
  });
  it("renders TableHeader and TableRow components correctly", () => {
    const wrapper = mount(Grid, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        items: [{ id: 1, name: "Item 1" }],
        columns: [{ key: "name", label: "Name" }],
      },
    });

    const tableHeader = wrapper.findComponent(TableHeader);
    const tableRow = wrapper.findComponent(TableRow);

    expect(tableHeader.exists()).toBe(true);
    expect(tableRow.exists()).toBe(true);
    expect(tableRow.props("item").name).toBe("Item 1");
  });
});
