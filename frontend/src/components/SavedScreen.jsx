import { Heart, MapPin, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const savedItems = [
  {
    id: 1,
    title: "Student Starter Pack",
    description: "PG Stay + Daily Meals + Gym",
    price: 9800,
    image: "https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwcm9vbXxlbnwxfHx8fDE3NjA5MDE2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Andheri West",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Professional Essentials",
    description: "1BHK + Meals + Fitness Center",
    price: 15500,
    image: "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmd8ZW58MXx8fHwxNzYwOTMwMjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Bandra East",
    rating: 4.7,
  },
];

export function SavedScreen({ onNavigate }) {
  if (savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6">
          <Heart className="w-16 h-16 text-[#D1D5DB]" />
        </div>
        <h2 className="text-2xl text-[#111827] mb-2">No saved items yet</h2>
        <p className="text-[#6B7280] text-center max-w-xs mb-6">
          Start exploring and save your favorite combos to find them here
        </p>
        <button
          onClick={() => onNavigate("explore")}
          className="px-6 py-3 bg-[#2563EB] text-white rounded-xl hover:bg-[#1E40AF] transition-colors"
        >
          Explore Combos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 mb-6">
        <h1 className="text-2xl text-[#111827]">Saved</h1>
        <p className="text-[#6B7280] mt-1">{savedItems.length} items</p>
      </div>

      {/* Grid of Saved Items */}
      <div className="px-6 space-y-4">
        {savedItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate("combo", item)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex">
              <div className="relative w-32 h-32 flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-4 text-left">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-[#111827] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#6B7280] line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="ml-2"
                  >
                    <Heart className="w-5 h-5 text-[#EF4444] fill-[#EF4444]" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#6B7280]">{item.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-sm text-[#111827]">{item.rating}</span>
                  </div>
                  <div>
                    <span className="text-[#2563EB]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#6B7280]">/mo</span>
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
