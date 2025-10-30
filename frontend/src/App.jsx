import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { SplashScreen } from "./components/SplashScreen";
import { OnboardingScreens } from "./components/OnboardingScreens";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { ComboDetailScreen } from "./components/ComboDetailScreen";
import { SavedScreen } from "./components/SavedScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { FiltersSheet } from "./components/FiltersSheet";
import { BottomNavigation } from "./components/BottomNavigation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [comboData, setComboData] = useState(null);

  useEffect(() => {
    // Simulate splash screen loading
    const timer = setTimeout(() => {
      setCurrentScreen("onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screen, data) => {
    if (screen === "combo") {
      setComboData(data);
      setCurrentScreen("combo");
    } else {
      setCurrentScreen(screen);
      if (["home", "explore", "saved", "profile"].includes(screen)) {
        setActiveTab(screen);
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("login");
  };

  const handleLogin = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleSignup = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
  };

  const showBottomNav = ["home", "explore", "saved", "profile"].includes(
    currentScreen
  );

  return (
    <div className='relative w-full mx-auto min-h-screen bg-[#F9FAFB] overflow-hidden'>
      {currentScreen === "splash" && <SplashScreen />}

      {currentScreen === "onboarding" && (
        <OnboardingScreens onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentScreen("signup")}
        />
      )}

      {currentScreen === "signup" && (
        <SignupScreen
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}

      {currentScreen === "explore" && (
        <ExploreScreen
          onNavigate={handleNavigate}
          onOpenFilters={() => setIsFiltersOpen(true)}
        />
      )}

      {currentScreen === "combo" && (
        <ComboDetailScreen
          data={comboData}
          onBack={() => {
            setCurrentScreen(activeTab);
          }}
        />
      )}

      {currentScreen === "saved" && <SavedScreen onNavigate={handleNavigate} />}

      {currentScreen === "profile" && <ProfileScreen onLogout={handleLogout} />}

      {showBottomNav && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <FiltersSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <Toaster />
    </div>
  );
}
