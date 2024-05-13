// import { ref } from "vue";
// import { Column } from "./grid.types";

// const sortColumn = ref("");
// const sortOrder = ref<"asc" | "desc">("asc");

// function sortData(column: Column) {
//   sortColumn.value = column.key;
//   sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
//   sortedAndFilteredItems.value.sort(
//     (a: { [x: string]: any }, b: { [x: string]: any }) => {
//       // Simplified sorting logic for clarity
//       const valueA = a[column.key];
//       const valueB = b[column.key];
//       if (sortOrder.value === "asc") {
//         return valueA > valueB ? 1 : -1;
//       } else {
//         return valueA < valueB ? 1 : -1;
//       }
//     }
//   );
// }
