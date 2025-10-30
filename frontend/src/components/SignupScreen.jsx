import { useState } from "react";
import { Mail, Lock, User, MapPin, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SignupScreen({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-[#2563EB] rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl text-[#111827]">Create Account</h1>
        <p className="text-[#6B7280] mt-2">Join CitySettle today</p>
      </div>

      <form onSubmit={handleSignup} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[#111827] mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#111827] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#111827] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#111827] mb-2">City</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                type="text"
                placeholder="Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <Button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-xl h-12"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-[#6B7280] px-4">
            By signing up, you agree to our{" "}
            <button type="button" className="text-[#2563EB]">
              Terms
            </button>{" "}
            &{" "}
            <button type="button" className="text-[#2563EB]">
              Privacy Policy
            </button>
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-[#6B7280]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#2563EB]"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
