import {
  ChevronLeft,
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const faqItems = [
  {
    question: "How do I book a combo?",
    answer:
      "Browse our combos, select one you like, and click 'Contact' to get in touch with the provider. They will help you complete the booking.",
  },
  {
    question: "Can I customize a combo?",
    answer:
      "Yes! Contact the provider and discuss your requirements. They can often customize combos to suit your needs.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Payment methods vary by provider. Most accept bank transfers, UPI, credit/debit cards, and cash.",
  },
  {
    question: "Is there a cancellation policy?",
    answer:
      "Each provider has their own cancellation policy. Please check with them before booking.",
  },
  {
    question: "How do I save my favorite listings?",
    answer:
      "Simply tap the heart icon on any listing or combo to save it. You can view all saved items in the Saved tab.",
  },
];

export function HelpScreen({ onBack }) {
  const handleContact = (method) => {
    toast.success(`Opening ${method}...`);
  };

  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header */}
      <div className='bg-white px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10'>
        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={onBack}
            className='w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB]'
          >
            <ChevronLeft className='w-6 h-6 text-[#111827]' />
          </button>
          <h1 className='text-2xl text-[#111827]'>Help & Support</h1>
        </div>
      </div>

      <div className='px-6 mt-6 space-y-6'>
        {/* Contact Options */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Contact Us</h2>
          <div className='space-y-3'>
            <button
              onClick={() => handleContact("email")}
              className='w-full flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-xl hover:bg-[#E5E7EB] transition-colors'
            >
              <div className='w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center'>
                <Mail className='w-5 h-5 text-white' />
              </div>
              <div className='text-left'>
                <p className='text-[#111827]'>Email Support</p>
                <p className='text-sm text-[#6B7280]'>support@citysettle.com</p>
              </div>
            </button>

            <button
              onClick={() => handleContact("phone")}
              className='w-full flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-xl hover:bg-[#E5E7EB] transition-colors'
            >
              <div className='w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center'>
                <Phone className='w-5 h-5 text-white' />
              </div>
              <div className='text-left'>
                <p className='text-[#111827]'>Phone Support</p>
                <p className='text-sm text-[#6B7280]'>+91 1800-123-4567</p>
              </div>
            </button>

            <button
              onClick={() => handleContact("chat")}
              className='w-full flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-xl hover:bg-[#E5E7EB] transition-colors'
            >
              <div className='w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center'>
                <MessageCircle className='w-5 h-5 text-white' />
              </div>
              <div className='text-left'>
                <p className='text-[#111827]'>Live Chat</p>
                <p className='text-sm text-[#6B7280]'>Available 9 AM - 9 PM</p>
              </div>
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-4'>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className='border-b border-[#F3F4F6] last:border-0 pb-4 last:pb-0'
              >
                <div className='flex items-start gap-3 mb-2'>
                  <HelpCircle className='w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5' />
                  <p className='text-[#111827] font-medium'>{item.question}</p>
                </div>
                <p className='text-sm text-[#6B7280] pl-8'>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Quick Links</h2>
          <div className='space-y-2'>
            <button
              onClick={() => toast.info("Opening Terms of Service...")}
              className='w-full text-left p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors'
            >
              <p className='text-[#111827]'>Terms of Service</p>
            </button>
            <button
              onClick={() => toast.info("Opening Privacy Policy...")}
              className='w-full text-left p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors'
            >
              <p className='text-[#111827]'>Privacy Policy</p>
            </button>
            <button
              onClick={() => toast.info("Opening Refund Policy...")}
              className='w-full text-left p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors'
            >
              <p className='text-[#111827]'>Refund Policy</p>
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className='text-center pb-4'>
          <p className='text-sm text-[#9CA3AF]'>CitySettle v1.0.0</p>
          <p className='text-xs text-[#9CA3AF] mt-1'>
            © 2025 CitySettle. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
