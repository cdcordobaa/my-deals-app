export interface Deal {
  id: number;
  issuer_name: string;
  deal_name: string;
  bloomberg_id: string;
  total: number;
  industry: string;
  status: string;
  analysts: string[];
  doc_count: number;
  custom_deal_identifiers: string[];
}
