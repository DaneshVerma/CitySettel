import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  MapPin,
  Home,
  Phone,
  Building2,
  Briefcase,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function SignupScreen({ onSignup, onSwitchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("consumer"); // consumer or vendor
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupData = {
        fullName: { firstName, lastName },
        email,
        password,
        phone,
        city,
        role,
      };

      // Add vendor-specific fields if role is vendor
      if (role === "vendor") {
        signupData.businessName = businessName;
        signupData.businessType = businessType;
        signupData.businessAddress = businessAddress;
        signupData.businessDescription = businessDescription;
      }

      const result = await signup(signupData);

      if (result.success) {
        if (role === "vendor") {
          toast.success(
            "Vendor account created! Your account is pending verification."
          );
        } else {
          toast.success("Account created successfully!");
        }
        onSignup();
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col px-6 py-12'>
      <div className='flex flex-col items-center mb-8'>
        <div className='w-20 h-20 bg-[#2563EB] rounded-2xl flex items-center justify-center shadow-lg mb-4'>
          <Home className='w-10 h-10 text-white' />
        </div>
        <h1 className='text-2xl text-[#111827]'>Create Account</h1>
        <p className='text-[#6B7280] mt-2'>Join CitySettle today</p>
      </div>

      <form onSubmit={handleSignup} className='flex-1 flex flex-col'>
        <div className='space-y-4 mb-6'>
          <div>
            <label className='block text-[#111827] mb-2'>I am a</label>
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => setRole("consumer")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "consumer"
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                <User className='w-6 h-6 mx-auto mb-2 text-[#2563EB]' />
                <p className='font-medium text-[#111827]'>Student</p>
                <p className='text-xs text-[#6B7280] mt-1'>
                  Looking for combos
                </p>
              </button>
              <button
                type='button'
                onClick={() => setRole("vendor")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "vendor"
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                <Building2 className='w-6 h-6 mx-auto mb-2 text-[#2563EB]' />
                <p className='font-medium text-[#111827]'>Vendor</p>
                <p className='text-xs text-[#6B7280] mt-1'>
                  List your business
                </p>
              </button>
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>First Name</label>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='text'
                placeholder='John'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Last Name</label>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='text'
                placeholder='Doe'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='email'
                placeholder='your.email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>Phone Number</label>
            <div className='relative'>
              <Phone className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='tel'
                placeholder='+91 98765 43210'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-[#111827] mb-2'>City</label>
            <div className='relative'>
              <MapPin className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
              <Input
                type='text'
                placeholder='Mumbai'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                required
              />
            </div>
          </div>

          {role === "vendor" && (
            <>
              <div className='pt-4 border-t border-[#E5E7EB]'>
                <h3 className='text-[#111827] font-medium mb-4'>
                  Business Information
                </h3>
              </div>

              <div>
                <label className='block text-[#111827] mb-2'>
                  Business Name
                </label>
                <div className='relative'>
                  <Building2 className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
                  <Input
                    type='text'
                    placeholder='Your Business Name'
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-[#111827] mb-2'>
                  Business Type
                </label>
                <div className='relative'>
                  <Briefcase className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className='w-full pl-12 h-12 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
                    required
                  >
                    <option value=''>Select Business Type</option>
                    <option value='accommodation'>Accommodation/Hostel</option>
                    <option value='food'>Restaurant/Food</option>
                    <option value='gym'>Gym/Fitness</option>
                    <option value='essentials'>Essentials/Supplies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-[#111827] mb-2'>
                  Business Address
                </label>
                <div className='relative'>
                  <MapPin className='absolute left-4 top-4 w-5 h-5 text-[#6B7280]' />
                  <Input
                    type='text'
                    placeholder='Full business address'
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className='pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-[#111827] mb-2'>
                  Business Description
                </label>
                <textarea
                  placeholder='Brief description of your business...'
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className='w-full p-4 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[100px]'
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className='space-y-3 mt-auto'>
          <Button
            type='submit'
            disabled={loading}
            className='w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-xl h-12'
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className='text-center text-sm text-[#6B7280] px-4'>
            By signing up, you agree to our{" "}
            <button type='button' className='text-[#2563EB]'>
              Terms
            </button>{" "}
            &{" "}
            <button type='button' className='text-[#2563EB]'>
              Privacy Policy
            </button>
          </p>
        </div>

        <div className='text-center mt-6'>
          <p className='text-[#6B7280]'>
            Already have an account?{" "}
            <button
              type='button'
              onClick={onSwitchToLogin}
              className='text-[#2563EB]'
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
