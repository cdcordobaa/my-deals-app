<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    item: Record<string, any>;
}>();
</script>

<template>
    <tr>
        <td v-for="(value, key) in props.item" :key="key">{{ value }}</td>
    </tr>
</template>

<style scoped>
/* Add any styling if needed */
</style>
