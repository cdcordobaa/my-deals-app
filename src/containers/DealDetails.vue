<template>
    <div>
        <h1>My Slot Details</h1>
        <h3>{{ deal.deal_name }}</h3>
        <p><strong>Issuer:</strong> {{ deal.issuer_name }}</p>
        <p><strong>Total:</strong> {{ deal.total }}</p>
    </div>
</template>
  
<script setup lang="ts">
import { Deal } from '@/types/deals';
import { defineProps } from 'vue';

const props = defineProps<{ deal: Deal }>();
console.log(props.deal);
</script>

