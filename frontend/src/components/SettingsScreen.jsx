import { useState } from "react";
import {
  ChevronLeft,
  Moon,
  Sun,
  Bell,
  Globe,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function SettingsScreen({ onBack }) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    showProfile: true,
    language: "English",
  });

  const handleToggle = (key) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast.success(
        `${key.replace(/([A-Z])/g, " $1").trim()} ${
          newSettings[key] ? "enabled" : "disabled"
        }`
      );
      return newSettings;
    });
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
          <h1 className='text-2xl text-[#111827]'>Settings</h1>
        </div>
      </div>

      <div className='px-6 mt-6 space-y-6'>
        {/* Appearance */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Appearance</h2>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                {settings.darkMode ? (
                  <Moon className='w-5 h-5 text-[#6B7280]' />
                ) : (
                  <Sun className='w-5 h-5 text-[#6B7280]' />
                )}
              </div>
              <div>
                <p className='text-[#111827]'>Dark Mode</p>
                <p className='text-sm text-[#6B7280]'>Use dark theme</p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle("darkMode")}
            />
          </div>
        </div>

        {/* Notifications */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Notifications</h2>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                  <Bell className='w-5 h-5 text-[#6B7280]' />
                </div>
                <div>
                  <p className='text-[#111827]'>All Notifications</p>
                  <p className='text-sm text-[#6B7280]'>
                    Enable all notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={() => handleToggle("notifications")}
              />
            </div>

            {settings.notifications && (
              <>
                <div className='flex items-center justify-between pl-13'>
                  <div>
                    <p className='text-[#111827]'>Email Notifications</p>
                    <p className='text-sm text-[#6B7280]'>
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle("emailNotifications")}
                  />
                </div>

                <div className='flex items-center justify-between pl-13'>
                  <div>
                    <p className='text-[#111827]'>Push Notifications</p>
                    <p className='text-sm text-[#6B7280]'>
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => handleToggle("pushNotifications")}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Privacy */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Privacy</h2>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                <Eye className='w-5 h-5 text-[#6B7280]' />
              </div>
              <div>
                <p className='text-[#111827]'>Show Profile</p>
                <p className='text-sm text-[#6B7280]'>
                  Make profile visible to others
                </p>
              </div>
            </div>
            <Switch
              checked={settings.showProfile}
              onCheckedChange={() => handleToggle("showProfile")}
            />
          </div>
        </div>

        {/* Language */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Language & Region</h2>
          <button className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                <Globe className='w-5 h-5 text-[#6B7280]' />
              </div>
              <div className='text-left'>
                <p className='text-[#111827]'>Language</p>
                <p className='text-sm text-[#6B7280]'>{settings.language}</p>
              </div>
            </div>
          </button>
        </div>

        {/* Account Security */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <h2 className='text-lg text-[#111827] mb-4'>Account Security</h2>
          <button
            onClick={() => toast.info("Password change coming soon!")}
            className='w-full flex items-center justify-between hover:bg-[#F9FAFB] p-3 -m-3 rounded-lg transition-colors'
          >
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center'>
                <Lock className='w-5 h-5 text-[#6B7280]' />
              </div>
              <div className='text-left'>
                <p className='text-[#111827]'>Change Password</p>
                <p className='text-sm text-[#6B7280]'>Update your password</p>
              </div>
            </div>
          </button>
        </div>

        {/* Save Button */}
        <Button
          onClick={() => {
            toast.success("Settings saved successfully!");
            onBack();
          }}
          className='w-full h-12 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF]'
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
