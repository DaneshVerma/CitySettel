import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function FiltersSheet({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto">
        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-[#111827]">Filters</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Budget Range */}
          <div className="mb-6">
            <label className="block text-[#111827] mb-4">
              Budget Range (₹/month)
            </label>
            <Slider
              defaultValue={[5000, 15000]}
              max={30000}
              step={500}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-[#6B7280]">
              <span>₹5,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Distance */}
          <div className="mb-6">
            <label className="block text-[#111827] mb-4">
              Maximum Distance (km)
            </label>
            <Slider
              defaultValue={[5]}
              max={20}
              step={1}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-[#6B7280]">
              <span>Within 5 km</span>
            </div>
          </div>

          {/* Category Toggles */}
          <div className="mb-6">
            <label className="block text-[#111827] mb-4">Include Services</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3">
                <span className="text-[#111827]">Accommodation</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#111827]">Food Services</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#111827]">Gym & Fitness</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#111827]">Essentials</span>
                <Switch />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-[#111827] mb-4">Minimum Rating</label>
            <div className="flex gap-2">
              {[3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-colors"
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E7EB]">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-2 border-[#E5E7EB]"
            >
              Reset
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 h-12 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF] text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
