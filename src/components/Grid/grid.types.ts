export type Column = {
  key: string;
  label: string;
  type?: "string" | "number" | "date";
  sortable?: boolean;
  filterable?: boolean;
};
