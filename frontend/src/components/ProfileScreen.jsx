import { useState, useEffect } from "react";
import {
  ChevronRight,
  User,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Bell,
  Shield,
  Building2,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { userAPI } from "../api/user";
import { toast } from "sonner";
import { EditProfileModal } from "./EditProfileModal";
import { SettingsScreen } from "./SettingsScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { HelpScreen } from "./HelpScreen";
import { PrivacyScreen } from "./PrivacyScreen";
import { VendorDashboard } from "./VendorDashboard";
import { AddListingScreen } from "./AddListingScreen";

const getMenuItems = (userRole) => {
  const commonItems = [
    { icon: User, label: "Edit Profile", action: "edit-profile" },
    { icon: Bell, label: "Notifications", action: "notifications" },
    { icon: Settings, label: "Settings", action: "settings" },
    { icon: Shield, label: "Privacy Policy", action: "privacy" },
    { icon: HelpCircle, label: "Help & Support", action: "help" },
  ];

  if (userRole === "vendor") {
    return [
      { icon: User, label: "Edit Profile", action: "edit-profile" },
      { icon: Building2, label: "My Listings", action: "my-listings" },
      { icon: Plus, label: "Add Listing", action: "add-listing" },
      { icon: Bell, label: "Notifications", action: "notifications" },
      { icon: Settings, label: "Settings", action: "settings" },
      { icon: Shield, label: "Privacy Policy", action: "privacy" },
      { icon: HelpCircle, label: "Help & Support", action: "help" },
    ];
  }

  return commonItems;
};

export function ProfileScreen({ onLogout }) {
  const { user, logout } = useAuth();
  const [savedCount, setSavedCount] = useState(0);
  const [activeScreen, setActiveScreen] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const menuItems = getMenuItems(user?.role);

  useEffect(() => {
    if (user?.role !== "vendor") {
      fetchSavedCount();
    }
  }, [user?.role]);

  const fetchSavedCount = async () => {
    try {
      const data = await userAPI.getSavedListings();
      setSavedCount(data.savedItems?.length || 0);
    } catch (error) {
      console.error("Error fetching saved count:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      onLogout();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "edit-profile":
        setShowEditProfile(true);
        break;
      case "my-listings":
        setActiveScreen("my-listings");
        break;
      case "add-listing":
        setActiveScreen("add-listing");
        break;
      case "notifications":
        setActiveScreen("notifications");
        break;
      case "settings":
        setActiveScreen("settings");
        break;
      case "privacy":
        setActiveScreen("privacy");
        break;
      case "help":
        setActiveScreen("help");
        break;
      default:
        break;
    }
  };

  // Show active screen if set
  if (activeScreen === "settings") {
    return <SettingsScreen onBack={() => setActiveScreen(null)} />;
  }
  if (activeScreen === "notifications") {
    return <NotificationsScreen onBack={() => setActiveScreen(null)} />;
  }
  if (activeScreen === "help") {
    return <HelpScreen onBack={() => setActiveScreen(null)} />;
  }
  if (activeScreen === "privacy") {
    return <PrivacyScreen onBack={() => setActiveScreen(null)} />;
  }
  if (activeScreen === "my-listings") {
    return (
      <VendorDashboard
        onBack={() => setActiveScreen(null)}
        onAddListing={() => setActiveScreen("add-listing")}
      />
    );
  }
  if (activeScreen === "add-listing") {
    return (
      <AddListingScreen
        onBack={() => setActiveScreen("my-listings")}
        onSuccess={() => setActiveScreen("my-listings")}
      />
    );
  }
  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header with User Info */}
      <div className='bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 pt-12 pb-8 rounded-b-3xl'>
        <div className='flex flex-col items-center text-center'>
          <div className='w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg'>
            <span className='text-3xl text-[#2563EB]'>
              {user?.fullName?.firstName?.charAt(0) || "U"}
            </span>
          </div>
          <h1 className='text-2xl text-white mb-1'>
            {user?.fullName
              ? `${user.fullName.firstName} ${user.fullName.lastName}`
              : "User"}
          </h1>
          <p className='text-blue-100 mb-4'>
            {user?.email || "email@example.com"}
          </p>
          {user?.city && (
            <p className='text-blue-100 text-sm mb-4'>📍 {user.city}</p>
          )}

          <button
            onClick={() => setShowEditProfile(true)}
            className='bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-colors'
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='px-6 -mt-6 mb-6'>
        {user?.role === "vendor" ? (
          <div className='bg-white rounded-xl p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-sm text-[#6B7280]'>Business</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  user?.verificationStatus === "verified"
                    ? "bg-green-100 text-green-800"
                    : user?.verificationStatus === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user?.verificationStatus === "verified"
                  ? "Verified"
                  : user?.verificationStatus === "rejected"
                  ? "Rejected"
                  : "Pending Verification"}
              </span>
            </div>
            <p className='text-lg text-[#111827] font-semibold mb-1'>
              {user?.businessName || "Business Name"}
            </p>
            <p className='text-sm text-[#6B7280] capitalize'>
              {user?.businessType || "Business Type"}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-white rounded-xl p-4 shadow-sm'>
              <p className='text-2xl text-[#2563EB] mb-1'>0</p>
              <p className='text-sm text-[#6B7280]'>Active Bookings</p>
            </div>
            <div className='bg-white rounded-xl p-4 shadow-sm'>
              <p className='text-2xl text-[#16A34A] mb-1'>{savedCount}</p>
              <p className='text-sm text-[#6B7280]'>Saved Items</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className='px-6 mb-6'>
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                onClick={() => handleMenuItemClick(item.action)}
                className={`w-full flex items-center justify-between px-4 py-4 hover:bg-[#F9FAFB] transition-colors ${
                  index !== menuItems.length - 1
                    ? "border-b border-[#F3F4F6]"
                    : ""
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                    <Icon className='w-5 h-5 text-[#6B7280]' />
                  </div>
                  <span className='text-[#111827]'>{item.label}</span>
                </div>
                <div className='flex items-center gap-2'>
                  {item.badge && (
                    <span className='bg-[#2563EB] text-white text-xs px-2 py-1 rounded-full'>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className='w-5 h-5 text-[#6B7280]' />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className='px-6'>
        <Button
          onClick={handleLogout}
          variant='outline'
          className='w-full h-12 rounded-xl border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors'
        >
          <LogOut className='w-5 h-5 mr-2' />
          Logout
        </Button>
      </div>

      {/* App Version */}
      <div className='text-center mt-8 px-6'>
        <p className='text-sm text-[#9CA3AF]'>CitySettle v1.0.0</p>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </div>
  );
}
