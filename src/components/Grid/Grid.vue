<script setup lang="ts">
import { defineProps } from 'vue';
import { useGrid } from './composables/useGrid';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import SearchBox from './SearchBox.vue';
import DetailsPanel from './DetailsPanel.vue';
import { Column } from './types/gridTypes';
import { useSelectedStore } from './stores/selectedStore';
import { useSelectionStore } from './stores/selectedItemsStore';

const props = defineProps<{ items: Record<string, any>[]; columns: Column[]; }>();
const { filteredAndSortedItems } = useGrid(props.items);
const { selectedItem, isPanelOpen, } = useSelectedStore();
const { toggleSelection, selectedItems, clearSelection, exportSelected } = useSelectionStore();

const handleToggleAllSelection = (selectAll: boolean) => {
  if (selectAll) {
    filteredAndSortedItems.value.forEach(item => {
      if (!selectedItems.has(item.id)) {
        toggleSelection(item.id);
      }
    });
  } else {
    clearSelection();
  }
};

const exportSelectedItems = () => {
  if (selectedItems.size === 0) {
    alert('No items selected for export.');
    return;
  }
  const itemsArray = Array.from(selectedItems)
    .map(id => filteredAndSortedItems.value.find(item => item.id === id))
    .filter(item => item !== undefined) as Record<string, any>[];

  const columnKeys = props.columns.map(col => col.key);
  exportSelected(itemsArray, columnKeys);
};

console.log("Grid", selectedItem, isPanelOpen);

</script>

<template>
  <div class="flex flex-col sm:flex-row">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg flex-grow">
      <div class="flex justify-between items-center p-4">
        <SearchBox />
        <button @click="exportSelectedItems"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
          <font-awesome-icon icon="file-export" class="mr-2" />
          Export
        </button>
      </div>
      <table class="w-full text-sm text-left text-primary dark:text-secondary">
        <TableHeader :columns="props.columns" @toggle-all-selection="handleToggleAllSelection" />
        <tbody>
          <TableRow v-for="item in filteredAndSortedItems" :key="item.id" :item="item" :columns="props.columns" />
        </tbody>
      </table>
    </div>

    <DetailsPanel>
      <template v-slot:panel="{ item }">
        <slot name="details" :item="item as Object">
          {{ item }}
        </slot>
      </template>
    </DetailsPanel>

  </div>
</template>

