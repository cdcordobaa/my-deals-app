<script setup lang="ts">
const props = defineProps<{
    columns: Array<{ key: string; label: string; sortable: boolean; filterable: boolean; }>
}>();

const emit = defineEmits(['sortColumn']);
const sortColumn = (key: string) => {
    emit('sortColumn', key);
};
</script>

<template>
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            <th scope="col" class="p-4" v-for="column in props.columns" :key="column.key"
                @click="column.sortable ? sortColumn(column.key) : null">
                {{ column.label }}
                <span v-if="column.sortable">⬆️⬇️</span>
            </th>
        </tr>
    </thead>
</template>

<style scoped>
/* Tailwind CSS for styling if needed */
</style>
