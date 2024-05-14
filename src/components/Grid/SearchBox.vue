<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['updateSearchQuery']);
const searchQuery = ref('');

const updateSearch = () => {
    emits('updateSearchQuery', searchQuery.value);
};
</script>

<template>
    <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search deals...">
</template>
