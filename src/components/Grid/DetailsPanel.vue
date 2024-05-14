<script setup lang="ts">
import { computed } from 'vue';
import { useSelectedStore } from './stores/selectedStore';

const store = useSelectedStore();
const item = computed(() => store.selectedItem);


console.log("DetailsPane", item, store.selectedItem, store.isPanelOpen);
</script>

<template>
  <div>
    <div v-if="store.isPanelOpen" class="details-panel open text-black">
      <div v-for="(value, key) in item" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
      <button @click="store.closePanel">Close</button>
    </div>
  </div>
</template>

<style scoped>
.details-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 30%;
  height: 100%;
  background: #ffffff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 0 0 0 12px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.details-panel.open {
  transform: translateX(0);
}
</style>
