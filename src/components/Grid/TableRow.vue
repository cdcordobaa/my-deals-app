<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Deal } from '@/types/deals';

const props = defineProps<{
    deal: Deal;
}>();

const emit = defineEmits(['selectDeal']);

const selectDeal = () => {
    emit('selectDeal', props.deal);
};
</script>

<template>
    <tr @click="selectDeal">
        <td v-for="(value, key) in props.deal" :key="key">{{ value }}</td>
    </tr>
</template>

<style scoped>
/* Add any styling if needed */
</style>
