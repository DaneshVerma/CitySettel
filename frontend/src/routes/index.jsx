import { Routes, Route } from "react-router-dom";
import { SplashScreen } from "../components/SplashScreen";
import { OnboardingScreens } from "../components/OnboardingScreens";
import { LoginScreen } from "../components/LoginScreen";
import { SignupScreen } from "../components/SignupScreen";
import { HomeScreen } from "../components/HomeScreen";
import { ExploreScreen } from "../components/ExploreScreen";
import { ComboDetailScreen } from "../components/ComboDetailScreen";
import { SavedScreen } from "../components/SavedScreen";
import { ProfileScreen } from "../components/ProfileScreen";

export function AppRoutes({ 
  handleNavigate, 
  handleOnboardingComplete, 
  handleLogin, 
  handleSignup, 
  handleLogout, 
  handleComboBack,
  setIsFiltersOpen,
  comboData 
}) {
  return (
    <Routes>
      <Route path="/splash" element={<SplashScreen />} />
      
      <Route 
        path="/onboarding" 
        element={<OnboardingScreens onComplete={handleOnboardingComplete} />} 
      />
      
      <Route 
        path="/login" 
        element={
          <LoginScreen
            onLogin={handleLogin}
            onSwitchToSignup={() => navigate("/signup")}
          />
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          <SignupScreen
            onSignup={handleSignup}
            onSwitchToLogin={() => navigate("/login")}
          />
        } 
      />
      
      <Route 
        path="/home" 
        element={<HomeScreen onNavigate={handleNavigate} />} 
      />
      
      <Route 
        path="/explore" 
        element={
          <ExploreScreen
            onNavigate={handleNavigate}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />
        } 
      />
      
      <Route 
        path="/combo" 
        element={
          <ComboDetailScreen
            data={comboData}
            onBack={handleComboBack}
          />
        } 
      />
      
      <Route 
        path="/saved" 
        element={<SavedScreen onNavigate={handleNavigate} />} 
      />
      
      <Route 
        path="/profile" 
        element={<ProfileScreen onLogout={handleLogout} />} 
      />

      {/* Redirect root to splash */}
      <Route path="/" element={<SplashScreen />} />
    </Routes>
  );
}