<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useGrid } from './composables/useGrid';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import SearchBox from './SearchBox.vue';
import DetailsPanel from './DetailsPanel.vue';
import { Column } from './types/gridTypes';
import { useSelectedStore } from './stores/selectedStore';

const props = defineProps<{ items: Record<string, any>[]; columns: Column[]; }>();
defineSlots<{
  details: (slotProps: { item: Object }) => void;
}>();
const { filteredAndSortedItems } = useGrid(props.items);
const { selectedItem, isPanelOpen } = useSelectedStore();
console.log("Grid", selectedItem, isPanelOpen);

let slotProps = computed(() => ({ item: selectedItem as Object }));
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

    <DetailsPanel>
      <template v-slot:panel="{ item }">
        <slot name="details" :item="item">
          {{ item }}
        </slot>
      </template>
    </DetailsPanel>
  </div>
</template>

