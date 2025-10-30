# React Router DOM Setup

This document explains the routing setup implemented in the CitySettle frontend application.

## Overview

The application now uses React Router DOM for client-side routing instead of state-based navigation. This provides better URL management, browser history support, and improved user experience.

## Route Structure

### Available Routes

- `/` - Root route (redirects to splash)
- `/splash` - Splash screen with auto-navigation to onboarding
- `/onboarding` - Onboarding flow screens
- `/login` - User login screen
- `/signup` - User registration screen
- `/home` - Main home screen (requires authentication)
- `/explore` - Explore screen with filters
- `/combo` - Combo detail screen (dynamic data via state)
- `/saved` - Saved items screen
- `/profile` - User profile screen

### Route Categories

**Public Routes** (no authentication required):

- `/splash`
- `/onboarding`
- `/login`
- `/signup`

**Protected Routes** (authentication required):

- `/home`
- `/explore`
- `/combo`
- `/saved`
- `/profile`

**Main Tab Routes** (show bottom navigation):

- `/home`
- `/explore`
- `/saved`
- `/profile`

## Key Components

### 1. BrowserRouter Setup (`src/main.jsx`)

The app is wrapped with `BrowserRouter` to enable routing functionality.

### 2. Route Constants (`src/constants/routes.js`)

Centralized route definitions for better maintainability:

```javascript
export const ROUTES = {
  ROOT: "/",
  SPLASH: "/splash",
  ONBOARDING: "/onboarding",
  // ... etc
};
```

### 3. Custom Navigation Hook (`src/hooks/useAppNavigation.js`)

Provides reusable navigation utilities:

- `navigateToScreen(screen, data)` - Navigate to any screen
- `navigateToTab(tab)` - Navigate to main tab
- `getCurrentTab()` - Get current active tab
- `shouldShowBottomNav()` - Check if bottom nav should be visible

### 4. Updated App Component (`src/App.jsx`)

- Uses `Routes` and `Route` components
- Implements navigation handlers
- Manages state passing between routes
- Controls bottom navigation visibility

### 5. Updated SplashScreen (`src/components/SplashScreen.jsx`)

- Auto-navigates to onboarding after 2.5 seconds
- Uses `useNavigate` hook for programmatic navigation

## Navigation Features

### State Passing

For routes that need data (like combo details), state is passed via the `state` property:

```javascript
navigate("/combo", { state: { comboData: data } });
```

### Back Navigation

The combo detail screen intelligently navigates back to the previous main tab using location state.

### Bottom Navigation

Automatically shows/hides based on current route. Only visible on main tab routes.

### URL Awareness

- Each screen has a unique URL
- Browser back/forward buttons work correctly
- Deep linking is supported
- Page refresh maintains current screen

## Usage Examples

### Programmatic Navigation

```javascript
// In a component
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navigate to home
navigate("/home");

// Navigate with data
navigate("/combo", { state: { comboData: data } });
```

### Using the Custom Hook

```javascript
import { useAppNavigation } from "../hooks/useAppNavigation";

const { navigateToScreen, getCurrentTab, shouldShowBottomNav } =
  useAppNavigation();

// Navigate to a screen
navigateToScreen("home");

// Check current tab
const currentTab = getCurrentTab();

// Check if bottom nav should show
const showBottomNav = shouldShowBottomNav();
```

## Benefits

1. **Better UX**: URL changes reflect app state
2. **Browser Integration**: Back/forward buttons work
3. **Deep Linking**: Users can bookmark specific screens
4. **SEO Ready**: URLs are meaningful and indexable
5. **Developer Experience**: Easier debugging and testing
6. **Maintainability**: Centralized route management

## Future Enhancements

- Add route guards for authentication
- Implement lazy loading for better performance
- Add query parameters for filters and search
- Create nested routes for complex flows
- Add error boundaries for route-level error handling
