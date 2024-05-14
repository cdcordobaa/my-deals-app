<script lang="ts" setup>
import { ref, defineProps, onMounted, watchEffect } from 'vue';
import type { Column } from './grid.types';
import { debounce } from 'lodash-es';
import Fuse from 'fuse.js';
import { Deal } from '@/types/deals';

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
const filteredItems = ref([...allItems.value]);
const isPanelOpen = ref(false);
const selectedItem = ref<Deal | null>(null);

const options = {
  includeScore: true,
  isCaseSensitive: false,
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  keys: ['issuer_name', 'deal_name', 'industry']
};

let fuse: Fuse<Deal>;
onMounted(() => {
  fuse = new Fuse<Deal>(props.items as Deal[], options);
});

const searchItems = () => {
  if (searchQuery.value.trim() === '') {
    filteredItems.value = props.items;
  } else {
    const results = fuse.search(searchQuery.value);
    filteredItems.value = results.map(result => result.item);
  }
};

const debounceSearchItems = debounce(() => {
  searchItems()
}, 300);

const toggleSelection = (id: number) => {
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id);
  } else {
    selectedItems.value.add(id);
  }
  if (selectedItems.value.size > 1 && isPanelOpen.value) {
    isPanelOpen.value = false;
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

const openPanel = (item: Deal) => {
  selectedItem.value = item;
  isPanelOpen.value = true;
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const deleteSelected = () => {
  console.log('Delete selected items:', Array.from(selectedItems.value));
  // Implement deletion logic
};

const exportSelected = () => {
  if (selectedItems.value.size === 0) {
    alert('No items selected for export.');
    return;
  }

  const itemsArray = Array.from(selectedItems.value).map(id =>
    allItems.value.find(item => item.id === id)
  );

  // Define the columns for CSV
  const columns = ['id', 'issuer_name', 'deal_name', 'industry'];
  const headerString = columns.join(',') + '\n';
  const csvContent = itemsArray.reduce((acc, item) => {
    const row = columns.map(fieldName => JSON.stringify(item?.[fieldName], replacer)).join(',');
    return acc + row + '\n';
  }, headerString);

  function replacer(_key: any, value: null) {
    return value === null ? '' : value; // Handle null values
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'exported_data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

watchEffect(() => {
  if (searchQuery.value === '') {
    filteredItems.value = [...allItems.value];
  } else {
    debounceSearchItems();
  }
});
</script>

<template>
  <div v-if="selectedItems.size > 0" class="table-actions">
    <button @click="deleteSelected" class="mb-4 p-2 rounded bg-red-500 text-white">Delete Selected</button>
    <button @click="exportSelected" class="mb-4 p-2 rounded bg-blue-500 text-white">Export Selected</button>
  </div>
  <div class="flex">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg flex-grow">
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
            <th scope="col" class="py-3 px-6" @click="sortBy('industry')">
              Industry
              <span v-if="sortColumn === 'industry'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="index" :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-white': index % 2 !== 0,
            'hover:bg-gray-200': true,
            'cursor-pointer': true,
            'bg-blue-100': selectedItem?.id === item.id
          }" @click="() => openPanel(item as Deal)">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <input type="checkbox" class="cursor-pointer" :checked="selectedItems.has(item.id)"
                @change="() => toggleSelection(item.id)">
            </td>
            <td class="px-6 py-4">
              {{ item.issuer_name }}
            </td>
            <td class="px-6 py-4">
              {{ item.deal_name }}
            </td>
            <td class="px-6 py-4">
              {{ item.industry }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div :class="['panel-container', { closed: !isPanelOpen }]">
    <button @click="closePanel" class="mb-4 p-2 rounded bg-red-500 text-white">Close</button>
    <div v-if="selectedItem" class="space-y-2 text-black">
      <h1> Hi</h1>
      <h3 class="text-lg font-bold">{{ selectedItem.deal_name }}</h3>
      <p><strong>Issuer:</strong> {{ selectedItem.issuer_name }}</p>
      <p><strong>Bloomberg ID:</strong> {{ selectedItem.bloomberg_id }}</p>
      <p><strong>Total:</strong> {{ selectedItem.total }}</p>
      <p><strong>Industry:</strong> {{ selectedItem.industry }}</p>
      <p><strong>Status:</strong> {{ selectedItem.status }}</p>
      <p><strong>Analysts:</strong> <span v-for="analyst in selectedItem.analysts" :key="analyst">{{ analyst }}</span>
      </p>
      <p><strong>Document Count:</strong> {{ selectedItem.doc_count }}</p>
      <p><strong>Custom Identifiers:</strong> <span v-for="identifier in selectedItem.custom_deal_identifiers"
          :key="identifier">{{ identifier }}</span></p>
    </div>
  </div>
</template>

<style scoped>
.panel-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: white;
  z-index: 1000;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  transition: transform 0.3s ease-in-out;
}

.panel-container.closed {
  transform: translateX(100%);
}

.table-actions {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 11;
}
</style>


