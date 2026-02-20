export const properties = [
  { id: 1, address: "12 Oak Street, Unit A", type: "Residential", status: "Occupied" },
  { id: 2, address: "45 Maple Avenue", type: "Commercial", status: "Vacant" },
  { id: 3, address: "7 Pine Road, Unit 3B", type: "Residential", status: "Occupied" },
  { id: 4, address: "99 Elm Blvd", type: "Industrial", status: "Maintenance" },
];

export const leases = [
  { id: 1, property: "12 Oak Street, Unit A", tenant: "John Smith", start: "2024-01-01", end: "2025-01-01", rent: "$1,500/mo" },
  { id: 2, property: "7 Pine Road, Unit 3B", tenant: "Sarah Lee", start: "2024-06-01", end: "2025-06-01", rent: "$2,000/mo" },
  { id: 3, property: "45 Maple Avenue", tenant: "Acme Corp", start: "2023-03-01", end: "2026-03-01", rent: "$4,500/mo" },
];

export const transactions = [
  { id: 1, property: "12 Oak Street", type: "Rent", amount: 1500, date: "2025-02-01", status: "Paid" },
  { id: 2, property: "7 Pine Road", type: "Rent", amount: 2000, date: "2025-02-01", status: "Paid" },
  { id: 3, property: "45 Maple Avenue", type: "Rent", amount: 4500, date: "2025-02-01", status: "Overdue" },
  { id: 4, property: "12 Oak Street", type: "Maintenance", amount: -350, date: "2025-01-28", status: "Paid" },
  { id: 5, property: "99 Elm Blvd", type: "Repair", amount: -1200, date: "2025-01-20", status: "Paid" },
];

export const documents = [
  { id: 1, name: "Lease Agreement – 12 Oak St", type: "PDF", size: "245 KB", uploaded: "2024-01-03", property: "12 Oak Street" },
  { id: 2, name: "Insurance Certificate – Maple Ave", type: "PDF", size: "180 KB", uploaded: "2023-03-10", property: "45 Maple Avenue" },
  { id: 3, name: "Inspection Report – Pine Rd", type: "PDF", size: "1.2 MB", uploaded: "2024-06-15", property: "7 Pine Road" },
];

export const alerts = [
  { type: "warning", message: "Lease at 12 Oak St expires in 15 days", icon: "⚠️" },
  { type: "danger", message: "Rent overdue for Unit 3B – $1,200 pending", icon: "🔴" },
  { type: "info", message: "Lease at 45 Maple Ave renews next month", icon: "ℹ️" },
];

export const stats = [
  { label: "Total Properties", value: "12" },
  { label: "Active Leases", value: "9" },
  { label: "Rent Collected (Feb)", value: "$18,400" },
  { label: "Pending Payments", value: "2" },
];
