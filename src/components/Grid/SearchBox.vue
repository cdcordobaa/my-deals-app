<script setup lang="ts">
import { ref } from 'vue';
import { useFilterStore } from './stores/filterStore';

const filterStore = useFilterStore();
const searchQuery = ref('');

const updateSearch = () => {
    filterStore.setSearchQuery(searchQuery.value);
};
</script>

<template>
      <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <font-awesome-icon icon="search" class="m-3 text-gray-500" />
        <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search deals..."
          class="form-input flex-grow py-2 px-4 focus:outline-none">
      </div>
</template>
