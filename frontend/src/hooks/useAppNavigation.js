import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES, MAIN_TAB_ROUTES } from "../constants/routes";

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToScreen = (screen, data) => {
    if (screen === "combo") {
      navigate(ROUTES.COMBO, { state: { comboData: data } });
    } else {
      const route = ROUTES[screen.toUpperCase()] || `/${screen}`;
      navigate(route);
    }
  };

  const navigateToTab = (tab) => {
    const route = ROUTES[tab.toUpperCase()] || `/${tab}`;
    navigate(route);
  };

  const getCurrentTab = () => {
    return location.pathname.slice(1) || "home";
  };

  const isMainTab = () => {
    return MAIN_TAB_ROUTES.includes(location.pathname);
  };

  const shouldShowBottomNav = () => {
    return isMainTab();
  };

  return {
    navigate,
    location,
    navigateToScreen,
    navigateToTab,
    getCurrentTab,
    isMainTab,
    shouldShowBottomNav,
    ROUTES,
  };
}
