<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import SearchBox from './SearchBox.vue';
import type { Deal } from '@/types/deals';
import { useDealStore } from './stores/dealsStore';
import { debounce } from 'lodash-es';

const props = defineProps<{
  items: Deal[];
  columns: Array<{ key: string; label: string; sortable: boolean; filterable: boolean; }>;
}>();

const { selectedDeal, isPanelOpen } = useDealStore();
const searchQuery = ref('');

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items;
  return props.items.filter((item: Deal) =>
    props.columns.some(column =>
      item[column.key as keyof Deal].toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const debouncedSearch = debounce((query: string) => {
  searchQuery.value = query;
}, 300);

const selectDeal = (deal: Deal) => {
  // selectedDeal.value = deal;
  // isPanelOpen.value = true;
  console.log('Deal selected:', deal);
};
</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <SearchBox @updateSearchQuery="debouncedSearch" />
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :columns="props.columns" />
      <tbody>
        <TableRow v-for="item in filteredItems" :key="item.id" :deal="item" @selectDeal="selectDeal" />
      </tbody>
    </table>
  </div>
</template>
