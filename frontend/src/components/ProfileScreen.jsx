import { ChevronRight, User, FileText, HelpCircle, LogOut, Settings, Bell, Shield } from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { icon: User, label: "Edit Profile", action: "edit-profile" },
  { icon: FileText, label: "My Listings", action: "my-listings", badge: "3" },
  { icon: Bell, label: "Notifications", action: "notifications" },
  { icon: Settings, label: "Settings", action: "settings" },
  { icon: Shield, label: "Privacy Policy", action: "privacy" },
  { icon: HelpCircle, label: "Help & Support", action: "help" },
];

export function ProfileScreen({ onLogout }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header with User Info */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl text-[#2563EB]">S</span>
          </div>
          <h1 className="text-2xl text-white mb-1">Sumit Kumar</h1>
          <p className="text-blue-100 mb-4">sumit.kumar@example.com</p>
          
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-colors">
            View Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl text-[#2563EB] mb-1">3</p>
            <p className="text-sm text-[#6B7280]">Active Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl text-[#16A34A] mb-1">5</p>
            <p className="text-sm text-[#6B7280]">Saved Items</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                className={`w-full flex items-center justify-between px-4 py-4 hover:bg-[#F9FAFB] transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-[#F3F4F6]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#6B7280]" />
                  </div>
                  <span className="text-[#111827]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-[#2563EB] text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-[#6B7280]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* App Version */}
      <div className="text-center mt-8 px-6">
        <p className="text-sm text-[#9CA3AF]">CitySettle v1.0.0</p>
      </div>
    </div>
  );
}
