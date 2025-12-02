import { useState } from "react";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export function ContactModal({ isOpen, onClose, comboData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! The provider will contact you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
      onClose();
    }, 1000);
  };

  const handleCall = () => {
    toast.info("Initiating call to provider...");
    // In production: window.location.href = 'tel:+1234567890';
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${comboData?.title || "your combo"}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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
                Contact Provider
              </h2>
              <button
                onClick={onClose}
                className='w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors'
              >
                <X className='w-5 h-5 text-[#6B7280]' />
              </button>
            </div>

            {/* Quick Actions */}
            <div className='grid grid-cols-2 gap-3 mb-6'>
              <button
                onClick={handleCall}
                className='flex items-center justify-center gap-2 p-3 bg-[#2563EB]/10 text-[#2563EB] rounded-xl hover:bg-[#2563EB]/20 transition-colors'
              >
                <Phone className='w-5 h-5' />
                <span className='text-sm font-medium'>Call Now</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className='flex items-center justify-center gap-2 p-3 bg-[#16A34A]/10 text-[#16A34A] rounded-xl hover:bg-[#16A34A]/20 transition-colors'
              >
                <MessageCircle className='w-5 h-5' />
                <span className='text-sm font-medium'>WhatsApp</span>
              </button>
            </div>

            <div className='relative mb-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-[#E5E7EB]'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-[#6B7280]'>
                  or send a message
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  Your Name
                </label>
                <Input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder='John Doe'
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder='your.email@example.com'
                  className='h-11 rounded-xl'
                  required
                />
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
                  required
                />
              </div>

              <div>
                <label className='block text-[#111827] mb-2 text-sm'>
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder='Tell us about your requirements...'
                  className='rounded-xl min-h-24'
                  required
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
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
