import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { useAppNavigation } from "./hooks/useAppNavigation";
import { ROUTES } from "./constants/routes";

export default function App() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [comboData, setComboData] = useState(null);
  const {
    navigate,
    location,
    navigateToScreen,
    navigateToTab,
    getCurrentTab,
    shouldShowBottomNav,
  } = useAppNavigation();

  useEffect(() => {
    // Redirect to splash screen on initial load
    if (location.pathname === ROUTES.ROOT) {
      navigate(ROUTES.SPLASH);
    }
  }, [location.pathname, navigate]);

  const handleNavigate = (screen, data) => {
    if (screen === "combo") {
      setComboData(data);
      navigate(ROUTES.COMBO, { state: { comboData: data } });
    } else {
      navigateToScreen(screen);
    }
  };

  const handleTabChange = (tab) => {
    navigateToTab(tab);
  };

  const handleOnboardingComplete = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogin = () => {
    navigate(ROUTES.HOME);
  };

  const handleSignup = () => {
    navigate(ROUTES.HOME);
  };

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleComboBack = () => {
    // Navigate back to the previous main tab or home
    const mainTabs = ["home", "explore", "saved", "profile"];
    const currentPath = location.pathname;
    const referrer = location.state?.from || "home";

    if (mainTabs.includes(referrer)) {
      navigate(`/${referrer}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className='relative w-full mx-auto min-h-screen bg-[#F9FAFB] overflow-hidden'>
      <Routes>
        <Route path='/splash' element={<SplashScreen />} />

        <Route
          path='/onboarding'
          element={<OnboardingScreens onComplete={handleOnboardingComplete} />}
        />

        <Route
          path='/login'
          element={
            <LoginScreen
              onLogin={handleLogin}
              onSwitchToSignup={() => navigate("/signup")}
            />
          }
        />

        <Route
          path='/signup'
          element={
            <SignupScreen
              onSignup={handleSignup}
              onSwitchToLogin={() => navigate("/login")}
            />
          }
        />

        <Route
          path='/home'
          element={<HomeScreen onNavigate={handleNavigate} />}
        />

        <Route
          path='/explore'
          element={
            <ExploreScreen
              onNavigate={handleNavigate}
              onOpenFilters={() => setIsFiltersOpen(true)}
            />
          }
        />

        <Route
          path='/combo'
          element={
            <ComboDetailScreen
              data={comboData || location.state?.comboData}
              onBack={handleComboBack}
            />
          }
        />

        <Route
          path='/saved'
          element={<SavedScreen onNavigate={handleNavigate} />}
        />

        <Route
          path='/profile'
          element={<ProfileScreen onLogout={handleLogout} />}
        />

        {/* Redirect root to splash */}
        <Route path='/' element={<SplashScreen />} />
      </Routes>

      {shouldShowBottomNav() && (
        <BottomNavigation
          activeTab={getCurrentTab()}
          onTabChange={handleTabChange}
        />
      )}

      <FiltersSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <Toaster />
    </div>
  );
}
