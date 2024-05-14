<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { useSortStore } from './stores/sortStore';
import type { Column } from './types/gridTypes';

const props = defineProps<{ columns: Column[] }>();
const sortStore = useSortStore();
const emit = defineEmits(['toggle-all-selection']);

const areAllSelected = computed(() => {
    // This computed property will be used to check the checkbox state
    return false; // Placeholder, actual logic will be in Grid.vue
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
    <thead>
        <tr>
                <th>
                    <input type="checkbox" @change="toggleAllSelection" :checked="areAllSelected">
                </th>
            <th v-for="column in props.columns" :key="column.key" @click="handleSort(column.key)">
                {{ column.label }}
                <span v-if="sortStore.sortColumn === column.key && sortStore.sortOrder === 'asc'">⬆️</span>
                <span v-if="sortStore.sortColumn === column.key && sortStore.sortOrder === 'desc'">⬇️</span>
            </th>
        </tr>
    </thead>
</template>

<style scoped>
/* Tailwind CSS for styling if needed */
</style>
