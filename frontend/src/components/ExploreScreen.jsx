import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, MapPin, Star, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { listingAPI } from "../api/listing";
import { userAPI } from "../api/user";
import { toast } from "sonner";

const filterChips = ["Budget", "Distance", "Ratings", "Category"];

export function ExploreScreen({ onNavigate, onOpenFilters }) {
  const [activeChip, setActiveChip] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (params = {}) => {
    try {
      setLoading(true);
      const data = await listingAPI.getListings(params);
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      // Use fallback data if API fails
      setListings([
        {
          _id: "1",
          name: "Green Valley PG",
          type: "accommodation",
          images: [
            "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?w=400",
          ],
          price: 6000,
          location: { address: "Andheri West, 2.3 km away", city: "Mumbai" },
          rating: 4.5,
          reviewCount: 128,
        },
        {
          _id: "2",
          name: "Home Style Tiffin Service",
          type: "food",
          images: [
            "https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?w=400",
          ],
          price: 2000,
          location: { address: "Andheri East, 1.5 km away", city: "Mumbai" },
          rating: 4.8,
          reviewCount: 256,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchListings({ search: searchQuery });
    }
  };

  const handleSave = async (e, listingId) => {
    e.stopPropagation();
    try {
      await userAPI.saveListing(listingId);
      toast.success("Saved successfully!");
    } catch (error) {
      toast.error("Failed to save listing");
    }
  };

  const handleApplyFilters = (filters) => {
    const params = {};
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minRating) params.minRating = filters.minRating;
    if (filters.types && filters.types.length > 0) {
      params.type = filters.types[0]; // API accepts single type
    }
    fetchListings(params);
  };

  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header */}
      <div className='bg-white px-6 pt-6 pb-4 sticky top-0 z-10 shadow-sm'>
        <h1 className='text-2xl text-[#111827] mb-4'>Explore</h1>

        {/* Search Bar */}
        <div className='flex gap-2 mb-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
            <input
              type='text'
              placeholder='Search area or service...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className='w-full pl-12 pr-4 h-11 rounded-xl bg-[#F3F4F6] border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all'
            />
          </div>
          <button
            onClick={onOpenFilters}
            className='w-11 h-11 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-sm'
          >
            <SlidersHorizontal className='w-5 h-5 text-white' />
          </button>
        </div>

        {/* Filter Chips */}
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(activeChip === chip ? null : chip)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeChip === chip
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className='px-6 mt-4'>
        <div className='h-48 bg-[#E5E7EB] rounded-xl overflow-hidden relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
              <MapPin className='w-12 h-12 text-[#6B7280] mx-auto mb-2' />
              <p className='text-[#6B7280]'>Map View</p>
            </div>
          </div>
          {/* Map pins */}
          <div className='absolute top-1/4 left-1/3 w-8 h-8 bg-[#2563EB] rounded-full border-4 border-white shadow-lg flex items-center justify-center'>
            <span className='text-white text-xs'>₹6K</span>
          </div>
          <div className='absolute top-1/2 right-1/3 w-8 h-8 bg-[#16A34A] rounded-full border-4 border-white shadow-lg flex items-center justify-center'>
            <span className='text-white text-xs'>₹2K</span>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className='px-6 mt-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-[#111827]'>{listings.length} Results</h2>
          <button className='text-[#6B7280] text-sm'>Sort by</button>
        </div>

        <div className='space-y-4'>
          {loading ? (
            <p className='text-[#6B7280]'>Loading listings...</p>
          ) : listings.length === 0 ? (
            <p className='text-[#6B7280]'>No listings found</p>
          ) : (
            listings.map((listing) => (
              <button
                key={listing._id || listing.id}
                onClick={() => onNavigate("combo", listing)}
                className='w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex'
              >
                <div className='relative w-28 h-28 flex-shrink-0'>
                  <ImageWithFallback
                    src={
                      listing.images?.[0] ||
                      listing.image ||
                      "https://via.placeholder.com/400"
                    }
                    alt={listing.name}
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='flex-1 p-3 text-left'>
                  <div className='flex items-start justify-between mb-1'>
                    <div className='flex-1'>
                      <h3 className='text-[#111827] line-clamp-1'>
                        {listing.name}
                      </h3>
                      <p className='text-xs text-[#6B7280] mt-0.5 capitalize'>
                        {listing.type}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleSave(e, listing._id || listing.id)}
                      className='ml-2'
                    >
                      <Heart className='w-5 h-5 text-[#6B7280]' />
                    </button>
                  </div>

                  <div className='flex items-center gap-1 mb-2'>
                    <MapPin className='w-3 h-3 text-[#6B7280]' />
                    <span className='text-xs text-[#6B7280]'>
                      {listing.location?.address || listing.location}
                    </span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 text-[#F59E0B] fill-[#F59E0B]' />
                      <span className='text-sm text-[#111827]'>
                        {listing.rating || 0}
                      </span>
                      <span className='text-xs text-[#6B7280]'>
                        ({listing.reviewCount || listing.reviews || 0})
                      </span>
                    </div>
                    <div>
                      <span className='text-[#2563EB]'>
                        ₹{listing.price.toLocaleString()}
                      </span>
                      <span className='text-xs text-[#6B7280]'>/mo</span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
