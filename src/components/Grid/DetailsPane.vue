<script setup lang="ts">
import { computed } from 'vue';
import { useDealStore } from './stores/dealsStore';

const { selectedDeal, isPanelOpen, closePanel } = useDealStore();
const dealDetails = computed(() => selectedDeal.value);
</script>

<template>
    <div v-if="isPanelOpen" class="details-panel">
        <div v-for="(value, key) in dealDetails" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
        </div>
        <button @click="closePanel">Close</button>
    </div>
</template>

<style scoped>
.details-panel {
    /* Style your details panel appropriately */
}
</style>
