<script setup lang="ts">
import { defineProps } from 'vue';
import { useSelectedStore } from './stores/selectedStore';
import { useSelectionStore } from './stores/selectedItemsStore';

type TableRowProps = {
    item: Record<string, any>;
    columns: { key: string }[];
};

const props = defineProps<TableRowProps>();
const { selectItem } = useSelectedStore();
const { toggleSelection, selectedItems } = useSelectionStore();

const handleCheckboxChange = () => {
    toggleSelection(props.item.id);
};

const handleRowClick = () => {
    selectItem(props.item);
};
</script>

<template>
            <tr @click="handleRowClick" :class="{ 'bg-blue-100': selectedItems.has(props.item.id) }">
                <td>
                    <input type="checkbox" @click.stop="handleCheckboxChange" :checked="selectedItems.has(props.item.id)">
                </td>
                <td v-for="column in props.columns" :key="column.key">{{ props.item[column.key] }}</td>
    </tr>
</template>

<style scoped>
/* Add any styling if needed */
</style>
