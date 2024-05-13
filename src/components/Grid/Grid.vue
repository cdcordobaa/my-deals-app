<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import type { Column } from './grid.types';
import { RecycleScroller } from 'vue-virtual-scroller';

interface GridProps {
  items: Record<string, any>[];
  columns: Column[];
}

const props = defineProps<GridProps>();
const allItems = ref(props.items);
</script>

<template>
  <table>
    <thead>
      <tr>
        <!-- Header row: Loop over columns for headers -->
        <th v-for="column in props.columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <RecycleScroller :items="allItems" :item-size="32" key-field="id" v-slot="{ item }">
        <!-- Data rows: Loop over items, and for each item, loop over columns -->
        <tr :key="item.id">
          <td v-for="column in props.columns" :key="column.key">
            {{ item[column.key] }}
          </td>
        </tr>
      </RecycleScroller>
    </tbody>
  </table>
</template>
