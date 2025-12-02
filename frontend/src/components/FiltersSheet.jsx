import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function FiltersSheet({ isOpen, onClose, onApplyFilters }) {
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [distance, setDistance] = useState([5]);
  const [minRating, setMinRating] = useState(null);
  const [categories, setCategories] = useState({
    accommodation: true,
    food: true,
    gym: false,
    essentials: false,
  });

  const handleApply = () => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      maxDistance: distance[0],
      minRating: minRating,
      types: Object.keys(categories).filter((key) => categories[key]),
    };
    onApplyFilters?.(filters);
    onClose();
  };

  const handleReset = () => {
    setPriceRange([5000, 15000]);
    setDistance([5]);
    setMinRating(null);
    setCategories({
      accommodation: true,
      food: true,
      gym: false,
      essentials: false,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 z-40 transition-opacity'
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto'>
        <div className='px-6 py-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl text-[#111827]'>Filters</h2>
            <button
              onClick={onClose}
              className='w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors'
            >
              <X className='w-5 h-5 text-[#6B7280]' />
            </button>
          </div>

          {/* Budget Range */}
          <div className='mb-6'>
            <label className='block text-[#111827] mb-4'>
              Budget Range (₹/month)
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={30000}
              min={0}
              step={500}
              className='mb-3'
            />
            <div className='flex items-center justify-between text-sm text-[#6B7280]'>
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Distance */}
          <div className='mb-6'>
            <label className='block text-[#111827] mb-4'>
              Maximum Distance (km)
            </label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={20}
              min={1}
              step={1}
              className='mb-3'
            />
            <div className='flex items-center justify-between text-sm text-[#6B7280]'>
              <span>Within {distance[0]} km</span>
            </div>
          </div>

          {/* Category Toggles */}
          <div className='mb-6'>
            <label className='block text-[#111827] mb-4'>
              Include Services
            </label>
            <div className='space-y-3'>
              <div className='flex items-center justify-between py-3'>
                <span className='text-[#111827]'>Accommodation</span>
                <Switch
                  checked={categories.accommodation}
                  onCheckedChange={(checked) =>
                    setCategories({ ...categories, accommodation: checked })
                  }
                />
              </div>
              <div className='flex items-center justify-between py-3'>
                <span className='text-[#111827]'>Food Services</span>
                <Switch
                  checked={categories.food}
                  onCheckedChange={(checked) =>
                    setCategories({ ...categories, food: checked })
                  }
                />
              </div>
              <div className='flex items-center justify-between py-3'>
                <span className='text-[#111827]'>Gym & Fitness</span>
                <Switch
                  checked={categories.gym}
                  onCheckedChange={(checked) =>
                    setCategories({ ...categories, gym: checked })
                  }
                />
              </div>
              <div className='flex items-center justify-between py-3'>
                <span className='text-[#111827]'>Essentials</span>
                <Switch
                  checked={categories.essentials}
                  onCheckedChange={(checked) =>
                    setCategories({ ...categories, essentials: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className='mb-6'>
            <label className='block text-[#111827] mb-4'>Minimum Rating</label>
            <div className='flex gap-2'>
              {[3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    minRating === rating
                      ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                      : "border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5"
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3 pt-4 border-t border-[#E5E7EB]'>
            <Button
              variant='outline'
              onClick={handleReset}
              className='flex-1 h-12 rounded-xl border-2 border-[#E5E7EB]'
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className='flex-1 h-12 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF] text-white'
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
