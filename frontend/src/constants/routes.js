// Route constants for better maintainability
export const ROUTES = {
  ROOT: "/",
  SPLASH: "/splash",
  ONBOARDING: "/onboarding",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  EXPLORE: "/explore",
  COMBO: "/combo",
  SAVED: "/saved",
  PROFILE: "/profile",
};

// Main tab routes that should show bottom navigation
export const MAIN_TAB_ROUTES = [
  ROUTES.HOME,
  ROUTES.EXPLORE,
  ROUTES.SAVED,
  ROUTES.PROFILE,
];

// Auth-protected routes (you can use this for route guards later)
export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.EXPLORE,
  ROUTES.COMBO,
  ROUTES.SAVED,
  ROUTES.PROFILE,
];

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  ROUTES.SPLASH,
  ROUTES.ONBOARDING,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
];
