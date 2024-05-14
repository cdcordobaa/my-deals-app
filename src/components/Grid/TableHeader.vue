<script setup lang="ts">
import { defineProps } from 'vue';
import { useSortStore } from './stores/sortStore';
import type { Column } from './gridTypes';

const props = defineProps<{ columns: Column[] }>();
const sortStore = useSortStore();

const handleSort = (column: string) => {
    if (props.columns.find(col => col.key === column)?.sortable) {
        sortStore.setSort(column);
    }
};
</script>

<template>
    <thead>
        <tr>
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
