<script setup lang="ts">
import { defineProps } from 'vue';
import { useSelectedStore } from './stores/selectedStore';

type TableRowProps = {
    item: Record<string, any>;
};

const props = defineProps<TableRowProps>();
const { selectItem } = useSelectedStore();

const handleRowClick = () => {
    console.log(props.item);

    selectItem(props.item);
};
</script>

<template>
    <tr @click="handleRowClick">
        <td v-for="(value, key) in props.item" :key="key">{{ value }}</td>
    </tr>
</template>

<style scoped>
/* Add any styling if needed */
</style>
