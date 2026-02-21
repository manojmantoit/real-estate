export type PropertyStatus = "Available" | "Active" | "Occupied" | "Vacant" | "Maintenance";

export interface Property {
  id: number;
  address: string;
  type: string;
  status: PropertyStatus;
  size: string;
  image: string;
  listing?: string | null;
  contact: string;
  workflowStage: string;
  addedBy?: string;
}

export type LeadType = "buyer" | "seller" | "tenant";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Closed";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interestedProperty: string;
  leadType: LeadType;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  createdBy: string;
}
