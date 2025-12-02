import { ChevronLeft } from "lucide-react";

export function PrivacyScreen({ onBack }) {
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
          <h1 className='text-2xl text-[#111827]'>Privacy Policy</h1>
        </div>
      </div>

      <div className='px-6 mt-6'>
        <div className='bg-white rounded-xl p-6 shadow-sm prose prose-sm max-w-none'>
          <p className='text-sm text-[#6B7280] mb-4'>
            Last updated: December 2, 2025
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>
            1. Information We Collect
          </h2>
          <p className='text-[#6B7280] mb-4'>
            We collect information you provide directly to us, including your
            name, email address, phone number, and city when you create an
            account. We also collect information about your use of our services,
            including listings you view, save, and interact with.
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>
            2. How We Use Your Information
          </h2>
          <p className='text-[#6B7280] mb-4'>
            We use the information we collect to:
          </p>
          <ul className='list-disc pl-5 text-[#6B7280] mb-4 space-y-2'>
            <li>Provide, maintain, and improve our services</li>
            <li>Connect you with service providers</li>
            <li>
              Send you updates, marketing communications, and promotional offers
            </li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className='text-lg text-[#111827] mb-3'>
            3. Information Sharing
          </h2>
          <p className='text-[#6B7280] mb-4'>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className='list-disc pl-5 text-[#6B7280] mb-4 space-y-2'>
            <li>Service providers who help us operate our platform</li>
            <li>Property owners and service providers you choose to contact</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2 className='text-lg text-[#111827] mb-3'>4. Data Security</h2>
          <p className='text-[#6B7280] mb-4'>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>5. Your Rights</h2>
          <p className='text-[#6B7280] mb-4'>You have the right to:</p>
          <ul className='list-disc pl-5 text-[#6B7280] mb-4 space-y-2'>
            <li>Access and update your personal information</li>
            <li>Delete your account</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>

          <h2 className='text-lg text-[#111827] mb-3'>6. Cookies</h2>
          <p className='text-[#6B7280] mb-4'>
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>7. Children's Privacy</h2>
          <p className='text-[#6B7280] mb-4'>
            Our service is not intended for users under the age of 18. We do not
            knowingly collect personal information from children under 18.
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>
            8. Changes to This Policy
          </h2>
          <p className='text-[#6B7280] mb-4'>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2 className='text-lg text-[#111827] mb-3'>9. Contact Us</h2>
          <p className='text-[#6B7280] mb-2'>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className='list-none text-[#6B7280] space-y-1'>
            <li>Email: privacy@citysettle.com</li>
            <li>Phone: +91 1800-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
