"use client";
import { useAuth } from "@/components/AuthProvider";
import OwnerDashboard from "@/components/OwnerDashboard";
import AgentDashboard from "@/components/AgentDashboard";

export default function DashboardPage() {
  const user = useAuth();

  // Still loading auth
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.role === "agent") return <AgentDashboard />;
  return <OwnerDashboard />;
}
