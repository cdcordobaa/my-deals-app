
<script lang="ts" setup>
import { ref } from 'vue';
import dealsData from '../mocks/data.json';
import { Deal } from '../types/deals';

const deals = ref<Deal[]>(dealsData);
</script>

<template>
  <div>
    <h1>Deals</h1>
    <ul>
      <li v-for="deal in deals" :key="deal.id">
        {{ deal.deal_name }} - {{ deal.issuer_name }}
      </li>
    </ul>
  </div>
</template>
