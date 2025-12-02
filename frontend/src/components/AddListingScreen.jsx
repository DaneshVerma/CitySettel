import { useState } from "react";
import {
  ChevronLeft,
  Building2,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "../api/axios";
import { ImageUploader } from "./ImageUploader";

export function AddListingScreen({ onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    city: "",
    price: "",
    pricePeriod: "month",
    images: [],
    amenities: [],
    contactPhone: "",
    contactEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/listings", {
        ...formData,
        price: parseFloat(formData.price),
      });

      toast.success("Listing submitted for approval!");
      onSuccess?.();
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(error.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F9FAFB]'>
      {/* Header */}
      <div className='bg-white border-b border-[#E5E7EB] sticky top-0 z-10'>
        <div className='flex items-center gap-3 p-4'>
          <button
            onClick={onBack}
            className='p-2 hover:bg-[#F3F4F6] rounded-full transition-colors'
          >
            <ChevronLeft className='w-6 h-6 text-[#111827]' />
          </button>
          <div>
            <h1 className='text-xl font-semibold text-[#111827]'>
              Add New Listing
            </h1>
            <p className='text-sm text-[#6B7280]'>
              Create a new business listing
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='p-4 space-y-6'>
        {/* Basic Information */}
        <div className='bg-white rounded-xl p-4 space-y-4'>
          <h2 className='font-semibold text-[#111827] flex items-center gap-2'>
            <Building2 className='w-5 h-5' />
            Basic Information
          </h2>

          <div>
            <label className='block text-[#111827] mb-2'>Listing Name *</label>
            <Input
              type='text'
              name='name'
              placeholder='e.g., Cozy PG Near Campus'
              value={formData.name}
              onChange={handleChange}
              className='h-12 rounded-xl border-[#E5E7EB]'
              required
            />
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Type *</label>
            <select
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='w-full h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] px-4 focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
              required
            >
              <option value=''>Select Type</option>
              <option value='accommodation'>Accommodation/Hostel</option>
              <option value='food'>Restaurant/Food</option>
              <option value='gym'>Gym/Fitness</option>
              <option value='essentials'>Essentials/Supplies</option>
            </select>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Description *</label>
            <textarea
              name='description'
              placeholder='Describe your listing...'
              value={formData.description}
              onChange={handleChange}
              className='w-full p-4 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[120px]'
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className='bg-white rounded-xl p-4 space-y-4'>
          <h2 className='font-semibold text-[#111827] flex items-center gap-2'>
            <MapPin className='w-5 h-5' />
            Location
          </h2>

          <div>
            <label className='block text-[#111827] mb-2'>Address *</label>
            <Input
              type='text'
              name='address'
              placeholder='Full address'
              value={formData.address}
              onChange={handleChange}
              className='h-12 rounded-xl border-[#E5E7EB]'
              required
            />
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>City *</label>
            <Input
              type='text'
              name='city'
              placeholder='City name'
              value={formData.city}
              onChange={handleChange}
              className='h-12 rounded-xl border-[#E5E7EB]'
              required
            />
          </div>
        </div>

        {/* Pricing */}
        <div className='bg-white rounded-xl p-4 space-y-4'>
          <h2 className='font-semibold text-[#111827] flex items-center gap-2'>
            <DollarSign className='w-5 h-5' />
            Pricing
          </h2>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-[#111827] mb-2'>Price (₹) *</label>
              <Input
                type='number'
                name='price'
                placeholder='0'
                value={formData.price}
                onChange={handleChange}
                className='h-12 rounded-xl border-[#E5E7EB]'
                required
                min='0'
              />
            </div>

            <div>
              <label className='block text-[#111827] mb-2'>Period *</label>
              <select
                name='pricePeriod'
                value={formData.pricePeriod}
                onChange={handleChange}
                className='w-full h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] px-4 focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
                required
              >
                <option value='day'>Per Day</option>
                <option value='week'>Per Week</option>
                <option value='month'>Per Month</option>
                <option value='year'>Per Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className='bg-white rounded-xl p-4 space-y-4'>
          <h2 className='font-semibold text-[#111827] flex items-center gap-2'>
            <FileText className='w-5 h-5' />
            Amenities
          </h2>

          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder='Add amenity (e.g., WiFi, AC)'
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddAmenity())
              }
              className='h-12 rounded-xl border-[#E5E7EB]'
            />
            <Button
              type='button'
              onClick={handleAddAmenity}
              className='bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6'
            >
              Add
            </Button>
          </div>

          {formData.amenities.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {formData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 bg-[#EFF6FF] text-[#2563EB] px-3 py-1.5 rounded-full text-sm'
                >
                  <span>{amenity}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveAmenity(index)}
                    className='hover:text-[#1E40AF]'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className='bg-white rounded-xl p-4 space-y-4'>
          <h2 className='font-semibold text-[#111827]'>Contact Information</h2>

          <div>
            <label className='block text-[#111827] mb-2'>Contact Phone *</label>
            <Input
              type='tel'
              name='contactPhone'
              placeholder='+91 98765 43210'
              value={formData.contactPhone}
              onChange={handleChange}
              className='h-12 rounded-xl border-[#E5E7EB]'
              required
            />
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Contact Email</label>
            <Input
              type='email'
              name='contactEmail'
              placeholder='contact@example.com'
              value={formData.contactEmail}
              onChange={handleChange}
              className='h-12 rounded-xl border-[#E5E7EB]'
            />
          </div>
        </div>

        {/* Images */}
        <div className='bg-white rounded-xl p-4'>
          <ImageUploader
            images={formData.images}
            onImagesChange={(images) =>
              setFormData((prev) => ({ ...prev, images }))
            }
            maxImages={10}
          />
        </div>

        {/* Submit Button */}
        <div className='sticky bottom-0 bg-[#F9FAFB] pt-4 pb-safe'>
          <Button
            type='submit'
            disabled={loading}
            className='w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white h-12 rounded-xl'
          >
            {loading ? "Submitting..." : "Submit for Approval"}
          </Button>
          <p className='text-center text-sm text-[#6B7280] mt-3'>
            Your listing will be reviewed and approved by admin before going
            live
          </p>
        </div>
      </form>
    </div>
  );
}
