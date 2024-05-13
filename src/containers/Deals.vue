
<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

interface GridProps {
  items: Record<string, any>[];
  columns: Column[];
}

const props = defineProps<GridProps>();
const allItems = ref(props.items);
const sortedAndFilteredItems = ref([...allItems.value]);
</script>
