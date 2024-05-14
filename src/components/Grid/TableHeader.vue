<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { useSortStore } from './stores/sortStore';
import type { Column } from './types/gridTypes';

const props = defineProps<{ columns: Column[] }>();
const sortStore = useSortStore();
const emit = defineEmits(['toggle-all-selection']);

const areAllSelected = computed(() => {
    return false; 
});

const toggleAllSelection = (event: Event) => {
    emit('toggle-all-selection', (event.target as HTMLInputElement).checked);
};

const handleSort = (column: string) => {
    if (props.columns.find(col => col.key === column)?.sortable) {
        sortStore.setSort(column);
    }
};
</script>

<template>
                <thead class="bg-gray-100">
                <tr>
                        <th>
                            <input type="checkbox" @change="toggleAllSelection" :checked="areAllSelected"
                                class="rounded text-indigo-600 focus:ring-indigo-500">
                        </th>
                        <th v-for="column in props.columns" :key="column.key" @click="handleSort(column.key)"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                {{ column.label }}
                <span v-if="sortStore.sortColumn === column.key && sortStore.sortOrder === 'asc'">⬆️</span>
                <span v-if="sortStore.sortColumn === column.key && sortStore.sortOrder === 'desc'">⬇️</span>
            </th>
        </tr>
    </thead>
</template>

