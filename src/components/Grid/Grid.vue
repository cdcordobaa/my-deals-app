<script setup lang="ts">
import { defineProps } from 'vue';
import { useGrid } from './composables/useGrid';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import SearchBox from './SearchBox.vue';
import DetailsPane from './DetailsPane.vue'; // Import the DetailsPane component
import { Column } from './types/gridTypes';
import { useSelectedStore } from './stores/selectedStore';

const props = defineProps<{ items: Record<string, any>[]; columns: Column[]; }>();
const { filteredAndSortedItems } = useGrid(props.items);
const { selectedItem, isPanelOpen } = useSelectedStore();
console.log("Grid", selectedItem, isPanelOpen);
</script>

<template>
  <div class="flex">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg flex-grow">
      <SearchBox />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader :columns="props.columns" />
        <tbody>
          <TableRow v-for="item in filteredAndSortedItems" :key="item.id" :item="item" />
        </tbody>
      </table>
    </div>
    <div v-if="isPanelOpen" class="w-96 bg-white shadow-lg transition-all">
      <DetailsPane />
    </div>
  </div>
</template>

