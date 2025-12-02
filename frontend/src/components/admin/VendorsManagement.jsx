import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import { adminAPI } from "../../api/admin";
import { toast } from "sonner";

export function VendorsManagement() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [stats, setStats] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, [filter]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const params = {
        status: filter === "all" ? undefined : filter,
      };
      const response = await adminAPI.getAllVendors(params);
      setVendors(response.data);
      setStats(response.stats);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (vendorId) => {
    try {
      setActionLoading(true);
      await adminAPI.verifyVendor(vendorId);
      toast.success("Vendor verified successfully");
      fetchVendors();
    } catch (error) {
      console.error("Verify error:", error);
      toast.error("Failed to verify vendor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (vendorId) => {
    if (!window.confirm("Are you sure you want to reject this vendor?")) return;

    try {
      setActionLoading(true);
      await adminAPI.rejectVendor(vendorId);
      toast.success("Vendor rejected");
      fetchVendors();
    } catch (error) {
      console.error("Reject error:", error);
      toast.error("Failed to reject vendor");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
      },
      verified: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const { bg, text, icon } = config[status];

    return (
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
      >
        {icon}
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "All", value: stats.total, filter: "all" },
            { label: "Pending", value: stats.pending, filter: "pending" },
            { label: "Verified", value: stats.verified, filter: "verified" },
            { label: "Rejected", value: stats.rejected, filter: "rejected" },
          ].map((stat) => (
            <button
              key={stat.filter}
              onClick={() => setFilter(stat.filter)}
              className={`p-4 rounded-xl text-left transition-all ${
                filter === stat.filter
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "bg-white text-[#111827] border border-[#E5E7EB]"
              }`}
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1 opacity-80">{stat.label}</p>
            </button>
          ))}
        </div>
      )}

      {/* Vendors */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <Building2 className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#111827] mb-2">
            No vendors found
          </h3>
          <p className="text-[#6B7280]">
            {filter === "all"
              ? "No vendors registered yet"
              : `No ${filter} vendors at the moment`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              {/* Status Badge */}
              <div className="mb-4">
                {getStatusBadge(vendor.verificationStatus)}
              </div>

              {/* Business Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#111827] mb-1">
                  {vendor.businessName}
                </h3>
                <p className="text-sm text-[#6B7280] capitalize mb-2">
                  {vendor.businessType}
                </p>
                {vendor.businessDescription && (
                  <p className="text-sm text-[#6B7280] line-clamp-2">
                    {vendor.businessDescription}
                  </p>
                )}
              </div>

              {/* Owner Info */}
              <div className="space-y-2 mb-4 p-4 bg-[#F9FAFB] rounded-lg">
                <p className="text-sm font-medium text-[#111827] mb-2">
                  Owner Information
                </p>
                <p className="text-sm text-[#6B7280]">
                  {vendor.fullName?.firstName} {vendor.fullName?.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Mail className="w-4 h-4" />
                  <span>{vendor.email}</span>
                </div>
                {vendor.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Phone className="w-4 h-4" />
                    <span>{vendor.phone}</span>
                  </div>
                )}
                {vendor.city && (
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.city}</span>
                  </div>
                )}
              </div>

              {/* Business Address */}
              {vendor.businessAddress && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#111827] mb-1">
                    Business Address
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {vendor.businessAddress}
                  </p>
                </div>
              )}

              {/* Listing Count */}
              <div className="mb-4 text-sm text-[#6B7280]">
                <span className="font-medium">{vendor.listings?.length || 0}</span>{" "}
                listing(s)
              </div>

              {/* Actions */}
              {vendor.verificationStatus === "pending" && (
                <div className="flex gap-2 pt-4 border-t border-[#E5E7EB]">
                  <Button
                    onClick={() => handleVerify(vendor._id)}
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                  <Button
                    onClick={() => handleReject(vendor._id)}
                    disabled={actionLoading}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}

              {/* Registration Date */}
              <div className="mt-4 text-xs text-[#9CA3AF]">
                Registered on{" "}
                {new Date(vendor.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
