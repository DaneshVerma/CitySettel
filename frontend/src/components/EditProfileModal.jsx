import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { userAPI } from "../api/user";
import { toast } from "sonner";

export function EditProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.fullName?.firstName || "",
        lastName: user.fullName?.lastName || "",
        phone: user.phone || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        fullName: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        phone: formData.phone,
        city: formData.city,
      };

      const result = await userAPI.updateProfile(updateData);
      updateUser(result.user);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 z-40 transition-opacity'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-6'>
        <div className='bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl text-[#111827] font-semibold'>
                Edit Profile
              </h2>
              <button
                onClick={onClose}
                className='w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors'
              >
                <X className='w-5 h-5 text-[#6B7280]' />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  First Name
                </label>
                <Input
                  type='text'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder='John'
                  className='h-11 rounded-xl'
                  required
                />
              </div>

              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  Last Name
                </label>
                <Input
                  type='text'
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder='Doe'
                  className='h-11 rounded-xl'
                  required
                />
              </div>

              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  Email
                </label>
                <Input
                  type='email'
                  value={user?.email || ""}
                  disabled
                  className='h-11 rounded-xl bg-[#F3F4F6] cursor-not-allowed'
                />
                <p className='text-xs text-[#6B7280] mt-1'>
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  Phone
                </label>
                <Input
                  type='tel'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder='+91 98765 43210'
                  className='h-11 rounded-xl'
                />
              </div>

              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  City
                </label>
                <Input
                  type='text'
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder='Mumbai'
                  className='h-11 rounded-xl'
                />
              </div>

              {/* Buttons */}
              <div className='flex gap-3 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={onClose}
                  className='flex-1 h-11 rounded-xl'
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='flex-1 h-11 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF]'
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
