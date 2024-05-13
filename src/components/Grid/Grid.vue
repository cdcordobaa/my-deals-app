<script lang="ts" setup>
import { ref, computed, defineProps, watchEffect } from 'vue';
import type { Column } from './grid.types';
import { debounce } from 'lodash-es';

// import { RecycleScroller } from 'vue-virtual-scroller';

interface GridProps {
  items: Record<string, any>[];
  columns: Column[];
}

const props = defineProps<GridProps>();
const allItems = ref(props.items);
const sortColumn = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const selectedItems = ref<Set<number>>(new Set());
const searchQuery = ref('');
const filteredItems = ref([...allItems.value]);  // Define this before using it in debounce


// Debounced search function
const searchItems = debounce(() => {
  filteredItems.value = allItems.value.filter((item) =>
    props.columns.some(column =>
      item[column.key].toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
}, 300);

const toggleSelection = (id: number) => {
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id);
  } else {
    selectedItems.value.add(id);
  }
};

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortOrder.value = 'asc';
  }
  allItems.value.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];
    if (sortOrder.value === 'asc') return valueA > valueB ? 1 : -1;
    else return valueA < valueB ? 1 : -1;
  });
};

// const filteredItems = computed(() => {
//   if (!props.items || props.items.length === 0) return [];
//   // Sorting and filtering logic can be added here as needed
//   return allItems.value;
// });



watchEffect(() => {
  if (searchQuery.value === '') {
    filteredItems.value = [...allItems.value];
  } else {
    searchItems();
  }
});

// const filteredItems = ref([...allItems.value]);

console.log('Grid component loaded', filteredItems);
</script>

<template>
  <input type="text" v-model="searchQuery" placeholder="Search..." class="mb-4 p-2 border rounded" @input="searchItems" />
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              Select
            </div>
          </th>
          <th scope="col" class="py-3 px-6" @click="sortBy('issuer_name')">
            Issuer
            <span v-if="sortColumn === 'issuer_name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th scope="col" class="py-3 px-6" @click="sortBy('deal_name')">
            Deal Name
            <span v-if="sortColumn === 'deal_name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index"
          :class="{ 'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0, 'hover:bg-gray-200': true }">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <input type="checkbox" class="cursor-pointer" :checked="selectedItems.has(item.id)"
              @change="toggleSelection(item.id)">
          </td>
          <td class="px-6 py-4">
            {{ item.issuer_name }}
          </td>
          <td class="px-6 py-4">
            {{ item.deal_name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
/* Add additional custom styles or modify existing ones as needed */
</style>
