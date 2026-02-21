"use client";
import { useAuth } from "@/components/AuthProvider";
import OwnerDashboard from "@/components/OwnerDashboard";
import AgentDashboard from "@/components/AgentDashboard";

export default function DashboardPage() {
  const user = useAuth();
  if (!user) return null;
  if (user.role === "agent") return <AgentDashboard />;
  return <OwnerDashboard />;
}
