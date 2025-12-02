import { lazy, Suspense, useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { adminAPI } from "../api/admin";
import { toast } from "sonner";

// Lazy load admin sub-components
const DashboardStats = lazy(() =>
  import("./admin/DashboardStats").then((module) => ({
    default: module.DashboardStats,
  }))
);
const ListingsManagement = lazy(() =>
  import("./admin/ListingsManagement").then((module) => ({
    default: module.ListingsManagement,
  }))
);
const VendorsManagement = lazy(() =>
  import("./admin/VendorsManagement").then((module) => ({
    default: module.VendorsManagement,
  }))
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-12">
    <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
  </div>
);

export function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "listings", label: "Listings", icon: FileText },
    { id: "vendors", label: "Vendors", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#111827]" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[#111827]">
              Admin Panel
            </h1>
            <p className="text-sm text-[#6B7280]">Manage listings and vendors</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#2563EB] text-white"
                    : "bg-white text-[#6B7280] border border-[#E5E7EB]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Suspense fallback={<LoadingFallback />}>
          {activeTab === "dashboard" && (
            <DashboardStats stats={stats} loading={loading} onRefresh={fetchStats} />
          )}
          {activeTab === "listings" && <ListingsManagement />}
          {activeTab === "vendors" && <VendorsManagement />}
        </Suspense>
      </div>
    </div>
  );
}
