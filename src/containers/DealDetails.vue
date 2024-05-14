<script setup lang="ts">
import { defineProps } from 'vue';
import { Deal } from '@/types/deals';

const props = defineProps<{ deal: Deal }>();
console.log(props.deal);
</script>

<template>
    <div class="p-4 border-t border-gray-200">
        <h1 class="text-lg font-semibold">Deal Details</h1>
        <table class="min-w-full divide-y divide-gray-200 mt-4">
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Deal Name:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.deal_name }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Issuer:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.issuer_name }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bloomberg ID:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.bloomberg_id }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.total }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Industry:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.industry }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Status:</td>
                    <td :class="{ 'text-green-500': deal.status === 'Active', 'text-red-500': deal.status === 'Inactive' }"
                        class="px-6 py-4 whitespace-nowrap text-sm">
                        <font-awesome-icon :icon="deal.status === 'Active' ? 'check-circle' : 'times-circle'"
                            class="mr-2" />
                        {{ deal.status }}
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Analysts:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <ul>
                            <li v-for="analyst in deal.analysts" :key="analyst">{{ analyst }}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Document Count:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deal.doc_count }}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Custom Identifiers:</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <ul>
                            <li v-for="identifier in deal.custom_deal_identifiers" :key="identifier">{{ identifier }}</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

