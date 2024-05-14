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
    <div>
        <h1>Items</h1>
                        <GridComponent :items="deals" :columns="columns">
                                <template v-slot:details="{ item }">
                        <DealDetails :deal="item as Deal" />
                            </template>
                        </GridComponent>
    </div>
</template>

