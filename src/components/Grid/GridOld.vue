<script lang="ts" setup>
import { ref, defineProps, onMounted, watchEffect } from 'vue';
import type { Column } from './types/gridTypes';
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
    <div>
        <font-awesome-icon icon="user" />
        <font-awesome-icon :icon="['fas', 'coffee']" />
    </div>
    <div v-if="selectedItems.size > 0" class="table-actions flex justify-between p-4 bg-gray-100 rounded-lg shadow">
        <button @click="deleteSelected"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            <font-awesome-icon icon="trash-alt" class="mr-2" />
            Delete Selected
        </button>
        <button @click="exportSelected"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            <font-awesome-icon icon="file-export" class="mr-2" />
            Export Selected
        </button>
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
                            Issuer <font-awesome-icon
                                :icon="['fas', sortColumn === 'issuer_name' && sortOrder === 'asc' ? 'arrow-up' : 'arrow-down']" />
                        </th>
                        <th scope="col" class="py-3 px-6" @click="sortBy('deal_name')">
                            Deal Name <font-awesome-icon
                                :icon="['fas', sortColumn === 'deal_name' && sortOrder === 'asc' ? 'arrow-up' : 'arrow-down']" />
                        </th>
                        <th scope="col" class="py-3 px-6" @click="sortBy('industry')">
                            Industry <font-awesome-icon
                                :icon="['fas', sortColumn === 'industry' && sortOrder === 'asc' ? 'arrow-up' : 'arrow-down']" />
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
        <button @click="closePanel"
            class="close-button bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            <font-awesome-icon icon="times" /> Close
        </button>
        <div v-if="selectedItem" class="item-details flex flex-col items-center justify-center text-center w-full">
            <h3>{{ selectedItem.deal_name }}</h3>
            <p><strong>Issuer:</strong> <span>{{ selectedItem.issuer_name }}</span></p>
            <p><strong>Bloomberg ID:</strong> <span>{{ selectedItem.bloomberg_id }}</span></p>
            <p><strong>Total:</strong> <span>{{ selectedItem.total }}</span></p>
            <p><strong>Industry:</strong> <span>{{ selectedItem.industry }}</span></p>
            <p><strong>Status:</strong> <span>{{ selectedItem.status }}</span></p>
            <p><strong>Analysts:</strong> <span v-for="analyst in selectedItem.analysts" :key="analyst">{{ analyst }}</span>
            </p>
            <p><strong>Document Count:</strong> <span>{{ selectedItem.doc_count }}</span></p>
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
    background: #ffffff;
    z-index: 1000;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    overflow: auto;
    transition: transform 0.3s ease-in-out;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 12px 0 0 12px;
}

.panel-container.closed {
    transform: translateX(100%);
}

.close-button {
    align-self: end;
    margin-bottom: 20px;
}

.item-details h3 {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 10px;
}

.item-details p {
    margin: 5px 0;
    font-size: 1em;
    color: #666;
}

.item-details strong {
    font-weight: bold;
    color: #333;
}
</style>

