import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "../api/axios";

export function VendorDashboard({ onBack, onAddListing }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/listings/vendor/my-listings");
      setListings(response.data.data || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await api.delete(`/listings/${id}`);
      toast.success("Listing deleted successfully");
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };

  const filteredListings = listings.filter((listing) => {
    if (filter === "all") return true;
    return listing.approvalStatus === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    const icons = {
      pending: <Clock className='w-4 h-4' />,
      approved: <CheckCircle className='w-4 h-4' />,
      rejected: <XCircle className='w-4 h-4' />,
    };

    return (
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {icons[status]}
        <span className='capitalize'>{status}</span>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-[#F9FAFB]'>
      {/* Header */}
      <div className='bg-white border-b border-[#E5E7EB] sticky top-0 z-10'>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-3'>
            <button
              onClick={onBack}
              className='p-2 hover:bg-[#F3F4F6] rounded-full transition-colors'
            >
              <ChevronLeft className='w-6 h-6 text-[#111827]' />
            </button>
            <div>
              <h1 className='text-xl font-semibold text-[#111827]'>
                My Listings
              </h1>
              <p className='text-sm text-[#6B7280]'>
                {listings.length} total listings
              </p>
            </div>
          </div>
          <Button
            onClick={onAddListing}
            className='bg-[#2563EB] hover:bg-[#1E40AF] text-white'
          >
            <Plus className='w-5 h-5 mr-2' />
            Add Listing
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-2 px-4 pb-3 overflow-x-auto'>
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-[#2563EB] text-white"
                  : "bg-white text-[#6B7280] border border-[#E5E7EB]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className='ml-2'>
                  ({listings.filter((l) => l.approvalStatus === f).length})
                </span>
              )}
              {f === "all" && <span className='ml-2'>({listings.length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        {loading ? (
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-xl p-4 animate-pulse'>
                <div className='h-40 bg-[#E5E7EB] rounded-lg mb-3' />
                <div className='h-4 bg-[#E5E7EB] rounded w-3/4 mb-2' />
                <div className='h-3 bg-[#E5E7EB] rounded w-1/2' />
              </div>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className='bg-white rounded-xl p-8 text-center'>
            <Building2 className='w-16 h-16 text-[#9CA3AF] mx-auto mb-4' />
            <h3 className='text-lg font-medium text-[#111827] mb-2'>
              No listings found
            </h3>
            <p className='text-[#6B7280] mb-4'>
              {filter === "all"
                ? "Start by adding your first listing"
                : `No ${filter} listings at the moment`}
            </p>
            {filter === "all" && (
              <Button
                onClick={onAddListing}
                className='bg-[#2563EB] hover:bg-[#1E40AF] text-white'
              >
                <Plus className='w-5 h-5 mr-2' />
                Add Your First Listing
              </Button>
            )}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredListings.map((listing) => (
              <div
                key={listing._id}
                className='bg-white rounded-xl overflow-hidden shadow-sm'
              >
                {/* Image */}
                {listing.images && listing.images.length > 0 && (
                  <img
                    src={listing.images[0]}
                    alt={listing.name}
                    className='w-full h-48 object-cover'
                  />
                )}

                <div className='p-4'>
                  {/* Status Badge */}
                  <div className='mb-3'>
                    {getStatusBadge(listing.approvalStatus)}
                  </div>

                  {/* Title & Type */}
                  <h3 className='text-lg font-semibold text-[#111827] mb-1'>
                    {listing.name}
                  </h3>
                  <p className='text-sm text-[#6B7280] capitalize mb-3'>
                    {listing.type}
                  </p>

                  {/* Details */}
                  <div className='space-y-2 mb-4'>
                    <div className='flex items-start gap-2 text-sm text-[#6B7280]'>
                      <MapPin className='w-4 h-4 mt-0.5 flex-shrink-0' />
                      <span>{listing.address}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <DollarSign className='w-4 h-4 text-[#6B7280]' />
                      <span className='text-[#111827] font-semibold'>
                        ₹{listing.price?.toLocaleString()}
                      </span>
                      <span className='text-[#6B7280]'>
                        / {listing.pricePeriod || "month"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2 pt-3 border-t border-[#E5E7EB]'>
                    <Button
                      variant='outline'
                      className='flex-1 border-[#E5E7EB]'
                      onClick={() =>
                        toast.info("Edit functionality coming soon")
                      }
                    >
                      <Edit className='w-4 h-4 mr-2' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      className='flex-1 border-red-200 text-red-600 hover:bg-red-50'
                      onClick={() => handleDelete(listing._id)}
                    >
                      <Trash2 className='w-4 h-4 mr-2' />
                      Delete
                    </Button>
                  </div>

                  {/* Rejection Reason */}
                  {listing.approvalStatus === "rejected" &&
                    listing.rejectionReason && (
                      <div className='mt-3 p-3 bg-red-50 rounded-lg'>
                        <p className='text-sm text-red-800'>
                          <strong>Rejection Reason:</strong>{" "}
                          {listing.rejectionReason}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
