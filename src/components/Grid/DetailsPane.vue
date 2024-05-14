<script setup lang="ts">
import { computed } from 'vue';
import { useSelectedStore } from './stores/selectedStore';

const { selectedItem, isPanelOpen, closePanel } = useSelectedStore();
const item = computed(() => selectedItem);
console.log("DetailsPane", item, selectedItem, isPanelOpen);
</script>

<template>
    <div v-if="isPanelOpen" class="details-panel">
                        <div v-for="(value, key) in item" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
        </div>
        <button @click="closePanel">Close</button>
    </div>
</template>

<style scoped>
.details-panel {
}
</style>
./stores/selectedStore