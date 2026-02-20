export const properties = [
  {
    id: 1,
    address: "9943 FM 1385, Pilot Point, TX",
    type: "Build to Rent (BTR) Sports Complex",
    status: "Available",
    size: "13,200 sqft",
    image: "https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/Similar-completed-project.jpg",
    listing: "https://www.loopnet.com/Listing/9943-FM-1385-Pilot-Point-TX/37274722/",
    contact: "469-400-4190",
    workflowStage: "Listing LOI Creation",
  },
  {
    id: 2,
    address: "FM 1385 Sports Academy, Pilot Point, TX",
    type: "Sports Facility – Pickleball",
    status: "Active",
    size: "N/A",
    image: "https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/Similar-completed-project.jpg",
    listing: null,
    contact: "469-400-4190",
    workflowStage: "Offer Contract Accepted",
  },
  {
    id: 3,
    address: "McKinney Retail Building, McKinney, TX",
    type: "Retail – Commercial",
    status: "Active",
    size: "N/A",
    image: "https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/mckinney-photo.png",
    listing: null,
    contact: "469-400-4190",
    workflowStage: "Due Diligence in Progress",
  },
  {
    id: 4,
    address: "Pizza & Boba – DFW Area, TX",
    type: "Mixed-Use Commercial",
    status: "Active",
    size: "N/A",
    image: "https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/Pizza.png",
    listing: null,
    contact: "469-400-4190",
    workflowStage: "Title and Closing",
  },
];

export const leases = [
  { id: 1, property: "FM 1385 Sports Academy, Pilot Point, TX", tenant: "Sports Academy LLC", start: "2024-01-01", end: "2026-01-01", rent: "$8,500/mo" },
  { id: 2, property: "McKinney Retail Building, McKinney, TX", tenant: "Retail Tenant Co.", start: "2024-03-01", end: "2026-03-01", rent: "$5,200/mo" },
  { id: 3, property: "Pizza & Boba – DFW Area, TX", tenant: "F&B Operator Inc.", start: "2023-06-01", end: "2025-06-01", rent: "$3,800/mo" },
];

export const transactions = [
  { id: 1, property: "FM 1385 Sports Academy", type: "Rent", amount: 8500, date: "2025-02-01", status: "Paid" },
  { id: 2, property: "McKinney Retail Building", type: "Rent", amount: 5200, date: "2025-02-01", status: "Paid" },
  { id: 3, property: "Pizza & Boba – DFW", type: "Rent", amount: 3800, date: "2025-02-01", status: "Overdue" },
  { id: 4, property: "9943 FM 1385, Pilot Point", type: "Construction", amount: -24000, date: "2025-01-15", status: "Paid" },
  { id: 5, property: "McKinney Retail Building", type: "Maintenance", amount: -1800, date: "2025-01-28", status: "Paid" },
];

export const documents = [
  { id: 1, name: "Lease Agreement – FM 1385 Sports Academy", type: "PDF", size: "310 KB", uploaded: "2024-01-05", property: "FM 1385 Sports Academy" },
  { id: 2, name: "LoopNet Listing – Pilot Point BTR Complex", type: "PDF", size: "520 KB", uploaded: "2025-01-10", property: "9943 FM 1385, Pilot Point" },
  { id: 3, name: "Inspection Report – McKinney Retail", type: "PDF", size: "1.4 MB", uploaded: "2024-03-12", property: "McKinney Retail Building" },
];

export const alerts = [
  { type: "danger", message: "Rent overdue – Pizza & Boba DFW: $3,800 pending", icon: "🔴" },
  { type: "warning", message: "Lease expiring Jun 2025 – Pizza & Boba DFW", icon: "⚠️" },
  { type: "info", message: "BTR Sports Complex listed on LoopNet – contact 469-400-4190", icon: "ℹ️" },
];

export const stats = [
  { label: "Total Properties", value: "4" },
  { label: "Active Leases", value: "3" },
  { label: "Rent Collected (Feb)", value: "$17,500" },
  { label: "Pending Payments", value: "1" },
];
