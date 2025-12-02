import { RefreshCw, TrendingUp, Clock, CheckCircle, XCircle, Users as UsersIcon } from "lucide-react";
import { Button } from "../ui/button";

export function DashboardStats({ stats, loading, onRefresh }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-[#E5E7EB] rounded w-1/2 mb-3" />
            <div className="h-8 bg-[#E5E7EB] rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Listings",
      value: stats.listings.total,
      icon: TrendingUp,
      color: "blue",
      subStats: [
        { label: "Pending", value: stats.listings.pending },
        { label: "Approved", value: stats.listings.approved },
        { label: "Rejected", value: stats.listings.rejected },
      ],
    },
    {
      title: "Pending Approvals",
      value: stats.listings.pending,
      icon: Clock,
      color: "yellow",
      highlight: stats.listings.pending > 0,
    },
    {
      title: "Approved Listings",
      value: stats.listings.approved,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Total Vendors",
      value: stats.vendors.total,
      icon: UsersIcon,
      color: "purple",
      subStats: [
        { label: "Pending", value: stats.vendors.pending },
        { label: "Verified", value: stats.vendors.verified },
        { label: "Rejected", value: stats.vendors.rejected },
      ],
    },
    {
      title: "Total Consumers",
      value: stats.consumers.total,
      icon: UsersIcon,
      color: "indigo",
    },
    {
      title: "New This Week",
      value: stats.recentActivity.newListings,
      icon: TrendingUp,
      color: "pink",
      subtitle: `${stats.recentActivity.newVendors} new vendors`,
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#111827]">Overview</h2>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="border-[#E5E7EB]"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm ${
                card.highlight ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-[#111827]">
                    {card.value}
                  </p>
                  {card.subtitle && (
                    <p className="text-sm text-[#6B7280] mt-1">
                      {card.subtitle}
                    </p>
                  )}
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    colorClasses[card.color]
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {card.subStats && (
                <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
                  {card.subStats.map((subStat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">{subStat.label}</span>
                      <span className="font-medium text-[#111827]">{subStat.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
