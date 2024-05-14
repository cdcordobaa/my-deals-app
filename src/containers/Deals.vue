<script lang="ts" setup>
import { ref } from 'vue';
import GridComponent from '../components/Grid/Grid.vue';
import DealDetails from './DealDetails.vue';
import { mockData } from '../mocks/data';
import { Deal } from '@/types/deals';



const deals = ref<Deal[]>(mockData);
const columns = ref([
    { key: 'id', label: 'ID', sortable: true },
    { key: 'issuer_name', label: 'Issuer', sortable: true, filterable: true },
    { key: 'deal_name', label: 'Deal Name', sortable: true },
    { key: 'total', label: 'Deal Amount', sortable: true },
]);
</script>

<template>
              <div class="container mx-auto px-4 py-6 bg-gray-100 animate-bg-move">
                <h1 class="text-3xl font-bold  mb-4 shadow">Deals List</h1>
                <GridComponent :items="deals" :columns="columns" class="bg-white shadow-lg rounded-xl">
                  <template v-slot:details="{ item }">
                    <DealDetails :deal="item as Deal" />
                  </template>
                </GridComponent>
              </div>
</template>



