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
defineSlots<{
  details: (slotProps: { item: Object }) => void;
}>();
const { filteredAndSortedItems } = useGrid(props.items);
const { selectedItem, isPanelOpen } = useSelectedStore();
const { exportSelected, selectedItems } = useSelectionStore();

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
  <div class="flex">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg flex-grow">
      <button @click="exportSelectedItems">Export Selected</button>

      <SearchBox />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader :columns="props.columns" />
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

