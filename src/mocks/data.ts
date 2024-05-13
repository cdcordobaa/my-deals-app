import _ from "lodash";

const generateMockData = (count: number) => {
  const baseData = [
    {
      id: 1,
      issuer_name: "Company A",
      deal_name: "Acquisition 1",
      bloomberg_id: "BL001",
      total: 500000.0,
      industry: "Technology",
      status: "Active",
      analysts: ["John Doe", "Jane Smith"],
      doc_count: 15,
      custom_deal_identifiers: ["D123", "D456"],
    },
    {
      id: 2,
      issuer_name: "Company B",
      deal_name: "Merger 1",
      bloomberg_id: "BL002",
      total: 300000.0,
      industry: "Healthcare",
      status: "Pending",
      analysts: ["Emily Ray", "Luke Martin"],
      doc_count: 10,
      custom_deal_identifiers: ["D789", "D101"],
    },
    {
      id: 3,
      issuer_name: "Company C",
      deal_name: "Acquisition 2",
      bloomberg_id: "BL003",
      total: 450000.0,
      industry: "Finance",
      status: "Completed",
      analysts: ["Michael Lee", "Chloe Sun"],
      doc_count: 20,
      custom_deal_identifiers: ["D102", "D103"],
    },
  ];

  const randomDealName = () => `Deal ${_.random(1, 100)}`;
  const randomIssuerName = () =>
    `Company ${String.fromCharCode(_.random(65, 90))}`;

  return _.range(1, count + 1).map((index) => ({
    ...baseData[index % 3],
    id: index,
    issuer_name: randomIssuerName(),
    deal_name: randomDealName(),
    bloomberg_id: `BL00${index}`,
    custom_deal_identifiers: [`D${index}01`, `D${index}02`],
  }));
};

export const mockData = generateMockData(100);
