<script lang="ts" setup>
import { ref } from 'vue';
import GridComponent from '../components/Grid/Grid.vue';
import { mockData } from '../mocks/data'; // Assume mockData can be any array of objects

const deals = ref(mockData);
const columns = ref([
    { key: 'issuer_name', label: 'Issuer', sortable: true, filterable: true },
    { key: 'deal_name', label: 'Deal Name', sortable: true },
]);
</script>

<template>
    <div>
                    <h1>Items</h1>
                    <GridComponent :items="deals" :columns="columns" />
    </div>
</template>

