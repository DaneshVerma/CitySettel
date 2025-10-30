import { Home, Search, Heart, User } from "lucide-react";

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "explore", icon: Search, label: "Explore" },
  { id: "saved", icon: Heart, label: "Saved" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavigation({ activeTab, onTabChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-6 py-3 z-30">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 py-1 px-4 min-w-[44px]"
            >
              <div className={`relative ${isActive ? "text-[#2563EB]" : "text-[#6B7280]"}`}>
                <Icon className="w-6 h-6" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2563EB] rounded-full" />
                )}
              </div>
              <span className={`text-xs ${isActive ? "text-[#2563EB]" : "text-[#6B7280]"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
