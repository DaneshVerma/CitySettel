import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  Building2,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { adminAPI } from "../../api/admin";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

export function ListingsManagement() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [filter, search]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = {
        status: filter === "all" ? undefined : filter,
        search: search || undefined,
      };
      const response = await adminAPI.getAllListings(params);
      setListings(response.data);
      setStats(response.stats);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (listingId) => {
    try {
      setActionLoading(true);
      await adminAPI.approveListing(listingId);
      toast.success("Listing approved successfully");
      fetchListings();
    } catch (error) {
      console.error("Approve error:", error);
      toast.error("Failed to approve listing");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      setActionLoading(true);
      await adminAPI.rejectListing(selectedListing._id, rejectionReason);
      toast.success("Listing rejected");
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedListing(null);
      fetchListings();
    } catch (error) {
      console.error("Reject error:", error);
      toast.error("Failed to reject listing");
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectDialog = (listing) => {
    setSelectedListing(listing);
    setShowRejectDialog(true);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
      },
      approved: {
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
            { label: "Approved", value: stats.approved, filter: "approved" },
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

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <Input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[#E5E7EB]"
          />
        </div>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="h-40 bg-[#E5E7EB] rounded-lg mb-3" />
              <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <Filter className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#111827] mb-2">
            No listings found
          </h3>
          <p className="text-[#6B7280]">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              {/* Image */}
              {listing.images && listing.images.length > 0 && (
                <img
                  src={listing.images[0].thumbnailUrl || listing.images[0].url || listing.images[0]}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                {/* Status Badge */}
                <div className="mb-3">{getStatusBadge(listing.approvalStatus)}</div>

                {/* Title & Type */}
                <h3 className="text-lg font-semibold text-[#111827] mb-1">
                  {listing.name}
                </h3>
                <p className="text-sm text-[#6B7280] capitalize mb-3">
                  {listing.type}
                </p>

                {/* Vendor Info */}
                {listing.vendor && (
                  <div className="mb-3 p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-[#6B7280]" />
                      <p className="text-sm font-medium text-[#111827]">
                        {listing.vendor.businessName || "Vendor"}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      {listing.vendor.fullName?.firstName}{" "}
                      {listing.vendor.fullName?.lastName}
                    </p>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{listing.address || listing.location?.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-[#111827] font-semibold">
                      ₹{listing.price?.toLocaleString()}
                    </span>
                    <span className="text-[#6B7280]">
                      / {listing.pricePeriod || "month"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                  {listing.description}
                </p>

                {/* Rejection Reason */}
                {listing.approvalStatus === "rejected" && listing.rejectionReason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Rejection Reason:</strong> {listing.rejectionReason}
                    </p>
                  </div>
                )}

                {/* Actions */}
                {listing.approvalStatus === "pending" && (
                  <div className="flex gap-2 pt-3 border-t border-[#E5E7EB]">
                    <Button
                      onClick={() => handleApprove(listing._id)}
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => openRejectDialog(listing)}
                      disabled={actionLoading}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-[#6B7280]">
              Please provide a reason for rejecting this listing. The vendor will
              see this message.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-4 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[120px]"
              required
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason("");
                setSelectedListing(null);
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={actionLoading || !rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {actionLoading ? "Rejecting..." : "Reject Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
