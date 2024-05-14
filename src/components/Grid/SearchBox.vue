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
    <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search deals...">
</template>
