<script setup lang="ts">
import { computed } from 'vue';
import { useSelectedStore } from './stores/selectedStore';

const store = useSelectedStore();
const item = computed(() => store.selectedItem);


console.log("DetailsPane", item, store.selectedItem, store.isPanelOpen);
</script>

<template>
            <div v-if="store.isPanelOpen" class="details-panel open text-black bg-background">
              <button @click="store.closePanel" class="button">
                <font-awesome-icon icon="times" />
              </button>
              <slot name="panel" :item="store.selectedItem">
            <h1>Panel Content</h1>
          </slot>
  </div>
</template>

<style scoped>
.details-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 12px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.details-panel.open {
  transform: translateX(0);
}

.button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--primary-color);
  color: var(--text-primary-color);
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: var(--secondary-color);
  transform: scale(1.05);
}
</style>

