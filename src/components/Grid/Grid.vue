<script setup lang="ts">
import { defineProps } from 'vue';
import { useGrid } from './composables/useGrid';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import SearchBox from './SearchBox.vue';
import { Column } from './gridTypes';

const props = defineProps<{ items: Record<string, any>[]; columns: Column[]; }>();
const { filteredAndSortedItems } = useGrid(props.items);
</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <SearchBox />
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :columns="props.columns" />
      <tbody>
        <TableRow v-for="item in filteredAndSortedItems" :key="item.id" :item="item" />
      </tbody>
    </table>
  </div>
</template>

