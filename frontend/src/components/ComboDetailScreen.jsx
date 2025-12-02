import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Heart,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Share2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { userAPI } from "../api/user";
import { comboAPI } from "../api/combo";
import { toast } from "sonner";
import { ContactModal } from "./ContactModal";

const images = [
  "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmd8ZW58MXx8fHwxNzYwOTMwMjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYwODQ4NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MDk2MjcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const breakdown = [
  { name: "Green Valley PG (Shared Room)", price: 6000, type: "Accommodation" },
  { name: "Home Style Tiffin Service", price: 2000, type: "Food" },
  { name: "FitZone Gym Membership", price: 1800, type: "Fitness" },
];

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    comment: "Great value for money! All services are top-notch.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    comment: "The PG is clean and food quality is excellent.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 5,
    comment: "Highly recommend this combo for students!",
    date: "2 weeks ago",
  },
];

export function ComboDetailScreen({ data, onBack }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [comboData, setComboData] = useState(data);
  const [loading, setLoading] = useState(!data);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (!data && data?._id) {
      fetchComboDetails(data._id);
    } else {
      setComboData(data);
    }
    checkIfSaved();
  }, [data]);

  const fetchComboDetails = async (comboId) => {
    try {
      setLoading(true);
      const result = await comboAPI.getComboById(comboId);
      setComboData(result);
    } catch (error) {
      console.error("Error fetching combo details:", error);
      toast.error("Failed to load combo details");
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const result = await userAPI.getSavedListings();
      const savedIds = result.savedItems?.map((item) => item._id) || [];
      setIsSaved(savedIds.includes(data?._id));
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await userAPI.unsaveListing(comboData._id);
        setIsSaved(false);
        toast.success("Removed from saved");
      } else {
        await userAPI.saveListing(comboData._id);
        setIsSaved(true);
        toast.success("Saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to update saved status");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: comboData?.title || "Check out this combo!",
          text: comboData?.description || "Amazing combo deal on CitySettle",
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
    }
  };

  const handleCall = () => {
    const phone = "+911234567890"; // In production, this would come from comboData.owner?.phone
    if (
      confirm(
        `Call ${
          comboData?.title || "provider"
        }?\nThis will initiate a call to ${phone}`
      )
    ) {
      window.location.href = `tel:${phone}`;
      toast.success("Initiating call...");
    }
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#F9FAFB] flex items-center justify-center'>
        <p className='text-[#6B7280]'>Loading combo details...</p>
      </div>
    );
  }

  if (!comboData) {
    return (
      <div className='min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6'>
        <p className='text-[#6B7280] mb-4'>Combo not found</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  // Use data from props or fallback to hardcoded images
  const displayImages =
    comboData.images?.length > 0
      ? comboData.images
      : comboData.image
      ? [comboData.image]
      : images;
  const displayBreakdown =
    comboData.items?.length > 0 ? comboData.items : breakdown;
  const displayReviews =
    comboData.reviews?.length > 0 ? comboData.reviews : reviews;

  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-24'>
      {/* Image Carousel */}
      <div className='relative h-64 bg-[#E5E7EB]'>
        <ImageWithFallback
          src={displayImages[currentImage]}
          alt={comboData.title || "Combo"}
          className='w-full h-full object-cover'
        />

        {/* Navigation Buttons */}
        <button
          onClick={onBack}
          className='absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg'
        >
          <ChevronLeft className='w-6 h-6 text-[#111827]' />
        </button>

        <div className='absolute top-4 right-4 flex gap-2'>
          <button
            onClick={handleSave}
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg'
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? "fill-[#EF4444] text-[#EF4444]" : "text-[#111827]"
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg'
          >
            <Share2 className='w-5 h-5 text-[#111827]' />
          </button>
        </div>

        {/* Image Indicators */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImage ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='px-6 -mt-4'>
        {/* Main Card */}
        <div className='bg-white rounded-xl p-4 shadow-sm mb-4'>
          <h1 className='text-2xl text-[#111827] mb-2'>{comboData.title}</h1>
          <p className='text-[#6B7280] mb-4'>{comboData.description}</p>

          <div className='flex items-center gap-4 mb-4'>
            <div className='flex items-center gap-1'>
              <Star className='w-5 h-5 text-[#F59E0B] fill-[#F59E0B]' />
              <span className='text-[#111827]'>{comboData.rating || 0}</span>
              <span className='text-[#6B7280] text-sm'>
                ({comboData.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          <div className='flex items-center gap-2 mb-4'>
            <MapPin className='w-5 h-5 text-[#6B7280]' />
            <span className='text-[#6B7280]'>
              {comboData.location?.area ? `${comboData.location.area}, ` : ""}
              {comboData.location?.city || "Location not specified"}
            </span>
          </div>

          <div className='bg-[#F3F4F6] rounded-lg p-4'>
            <div className='flex items-baseline gap-2'>
              <span className='text-3xl text-[#2563EB]'>
                ₹{comboData.price?.toLocaleString()}
              </span>
              <span className='text-[#6B7280]'>/month</span>
              {comboData.originalPrice && (
                <span className='text-sm text-[#6B7280] line-through ml-2'>
                  ₹{comboData.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {comboData.originalPrice && comboData.discount && (
              <p className='text-sm text-[#16A34A] mt-1'>
                Save ₹
                {(comboData.originalPrice - comboData.price).toLocaleString()} (
                {comboData.discount}% off)!
              </p>
            )}
          </div>
        </div>

        {/* Breakdown Section */}
        <div className='bg-white rounded-xl p-4 shadow-sm mb-4'>
          <h2 className='text-lg text-[#111827] mb-4'>What's Included</h2>
          <div className='space-y-3'>
            {displayBreakdown.map((item, index) => (
              <div
                key={item._id || index}
                className='flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0'
              >
                <div className='flex-1'>
                  <p className='text-[#111827]'>{item.name}</p>
                  <p className='text-sm text-[#6B7280] capitalize'>
                    {item.type}
                  </p>
                </div>
                {item.price && (
                  <span className='text-[#2563EB]'>
                    ₹{item.price.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className='bg-white rounded-xl p-4 shadow-sm mb-4'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg text-[#111827]'>Reviews</h2>
            <button className='text-[#2563EB] text-sm'>See all</button>
          </div>

          <div className='space-y-4'>
            {displayReviews.length > 0 ? (
              displayReviews.map((review) => (
                <div
                  key={review._id || review.id}
                  className='border-b border-[#F3F4F6] last:border-0 pb-4 last:pb-0'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-[#111827]'>
                      {review.user?.fullName?.firstName ||
                        review.name ||
                        "Anonymous"}
                    </span>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 text-[#F59E0B] fill-[#F59E0B]' />
                      <span className='text-sm text-[#111827]'>
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className='text-[#6B7280] text-sm mb-1'>
                    {review.comment}
                  </p>
                  <span className='text-xs text-[#9CA3AF]'>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : review.date}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-[#6B7280] text-sm'>
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-6 py-4'>
        <div className='flex gap-3'>
          <Button
            onClick={handleCall}
            variant='outline'
            className='flex-1 h-12 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5'
          >
            <Phone className='w-5 h-5 mr-2' />
            Call
          </Button>
          <Button
            onClick={handleContact}
            className='flex-1 h-12 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF] text-white'
          >
            <MessageCircle className='w-5 h-5 mr-2' />
            Contact
          </Button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        comboData={comboData}
      />
    </div>
  );
}
