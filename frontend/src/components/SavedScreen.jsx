import { useState, useEffect } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { userAPI } from "../api/user";
import { toast } from "sonner";

export function SavedScreen({ onNavigate }) {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const fetchSavedItems = async () => {
    try {
      const data = await userAPI.getSavedListings();
      setSavedItems(data.savedItems || []);
    } catch (error) {
      console.error("Error fetching saved items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (e, listingId) => {
    e.stopPropagation();
    try {
      await userAPI.unsaveListing(listingId);
      setSavedItems(savedItems.filter((item) => item._id !== listingId));
      toast.success("Removed from saved");
    } catch (error) {
      toast.error("Failed to remove listing");
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#F9FAFB] flex items-center justify-center pb-20'>
        <p className='text-[#6B7280]'>Loading saved items...</p>
      </div>
    );
  }
  if (savedItems.length === 0) {
    return (
      <div className='min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-6 pb-20'>
        <div className='w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6'>
          <Heart className='w-16 h-16 text-[#D1D5DB]' />
        </div>
        <h2 className='text-2xl text-[#111827] mb-2'>No saved items yet</h2>
        <p className='text-[#6B7280] text-center max-w-xs mb-6'>
          Start exploring and save your favorite combos to find them here
        </p>
        <button
          onClick={() => onNavigate("explore")}
          className='px-6 py-3 bg-[#2563EB] text-white rounded-xl hover:bg-[#1E40AF] transition-colors'
        >
          Explore Combos
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header */}
      <div className='bg-white px-6 pt-6 pb-4 mb-6'>
        <h1 className='text-2xl text-[#111827]'>Saved</h1>
        <p className='text-[#6B7280] mt-1'>{savedItems.length} items</p>
      </div>

      {/* Grid of Saved Items */}
      <div className='px-6 space-y-4'>
        {savedItems.map((item) => (
          <button
            key={item._id || item.id}
            onClick={() => onNavigate("combo", item)}
            className='w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex'>
              <div className='relative w-32 h-32 flex-shrink-0'>
                <ImageWithFallback
                  src={
                    item.images?.[0] ||
                    item.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.name || item.title}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex-1 p-4 text-left'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='text-[#111827] mb-1'>
                      {item.name || item.title}
                    </h3>
                    <p className='text-sm text-[#6B7280] line-clamp-1'>
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleUnsave(e, item._id || item.id)}
                    className='ml-2'
                  >
                    <Heart className='w-5 h-5 text-[#EF4444] fill-[#EF4444]' />
                  </button>
                </div>

                <div className='flex items-center gap-2 mb-2'>
                  <MapPin className='w-4 h-4 text-[#6B7280]' />
                  <span className='text-sm text-[#6B7280]'>
                    {item.location?.address || item.location}
                  </span>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-[#F59E0B] fill-[#F59E0B]' />
                    <span className='text-sm text-[#111827]'>
                      {item.rating || 0}
                    </span>
                  </div>
                  <div>
                    <span className='text-[#2563EB]'>
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className='text-xs text-[#6B7280]'>/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
