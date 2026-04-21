// ============================================
// WAYVO APP - Main Application
// ============================================

import React, { useState, useCallback, useEffect } from "react";
import "./styles/variables.css";
import "./styles/animations.css";

// Components
import SplashScreen from "./components/SplashScreen";
import TabBar from "./components/TabBar";
import Toast from "./components/ui/Toast";

// Screens
import HomeTab from "./components/home/HomeTab";
import SearchTab from "./components/search/SearchTab";
import PlanTab from "./components/plan/PlanTab";
import SupportTab from "./components/support/SupportTab";
import ProfileTab from "./components/profile/ProfileTab";
import ChatScreen from "./components/chat/ChatScreen";
import AgentsScreen from "./components/chat/AgentsScreen";
import EmergencyScreen from "./components/support/EmergencyScreen";
import WishlistScreen from "./components/wishlist/WishlistScreen";
import PackagesScreen from "./components/packages/PackagesScreen";
import PartnerPortal from "./components/partner/PartnerPortal";
import BookingFlow from "./components/booking/BookingFlow";
import OnboardingScreen from "./components/onboarding/OnboardingScreen";

// Hooks & Utils
import { useWishlistStorage, useUserStorage } from "./hooks/useLocalStorage";
import { ITEMS, AGENTS } from "./data/items";
import { APP_PHASES } from "./utils/constants";

export default function App() {
  // App phase
  const [phase, setPhase] = useState(APP_PHASES.SPLASH);

  // User & Wishlist (persisted to localStorage)
  const { user, updateUser, addPoints } = useUserStorage();
  const { wished, toggleWish, isWished, clearWishlist, count: wishlistCount } = useWishlistStorage();

  // Navigation state
  const [tab, setTab] = useState("home");
  const [subScreen, setSubScreen] = useState(null); // chat, agents, emergency, wishlist, packages, partner, booking
  const [chatMode, setChatMode] = useState("ai");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // UI state
  const [toast, setToast] = useState("");

  // Derived values
  const wishlistValue = ITEMS.filter((i) => wished.has(i.id)).reduce(
    (s, i) => s + i.price,
    0
  );

  // Splash completion
  const handleSplashComplete = useCallback(() => {
    // Check if user has completed onboarding
    const onboarded = localStorage.getItem("wv3_onboarded");
    setPhase(onboarded ? APP_PHASES.APP : APP_PHASES.ONBOARDING);
  }, []);

  // Onboarding completion
  const handleOnboardingComplete = useCallback(
    (userData) => {
      updateUser(userData);
      localStorage.setItem("wv3_onboarded", "true");
      setPhase(APP_PHASES.APP);
      setToast(`Welcome ${userData.name}! 🎉 +50 Wayvo Points earned`);
    },
    [updateUser]
  );

  // Navigation helpers
  const goToTab = useCallback((t) => {
    setTab(t);
    setSubScreen(null);
  }, []);

  const goToSubScreen = useCallback((screen) => {
    setSubScreen(screen);
  }, []);

  const goBack = useCallback(() => {
    setSubScreen(null);
    setSelectedAgent(null);
    setSelectedItem(null);
  }, []);

  // Wishlist
  const handleToggleWish = useCallback(
    (id) => {
      toggleWish(id);
      const item = ITEMS.find((i) => i.id === id);
      if (item) {
        const isAdding = !wished.has(id);
        setToast(
          isAdding
            ? `❤️ ${item.title} saved`
            : `Removed from wishlist`
        );
      }
    },
    [toggleWish, wished]
  );

  // Chat
  const handleStartChat = useCallback(
    (mode, agent = null) => {
      setChatMode(mode);
      setSelectedAgent(agent);
      setSubScreen("chat");
    },
    []
  );

  const handleSwitchChatMode = useCallback((mode) => {
    setChatMode(mode);
    setSelectedAgent(null);
  }, []);

  // Booking
  const handleOpenItem = useCallback((item) => {
    setSelectedItem(item);
    setSubScreen("booking");
  }, []);

  // Toast
  const showToast = useCallback((msg) => {
    setToast(msg);
  }, []);

  // Restart onboarding
  const handleRestartOnboarding = useCallback(() => {
    localStorage.removeItem("wv3_onboarded");
    setPhase(APP_PHASES.ONBOARDING);
  }, []);

  // Render main content based on current screen
  const renderContent = () => {
    if (subScreen === "chat") {
      return (
        <ChatScreen
          mode={chatMode}
          agent={selectedAgent}
          user={user}
          onBack={goBack}
          onSwitchMode={handleSwitchChatMode}
          onGoToAgents={() => setSubScreen("agents")}
        />
      );
    }

    if (subScreen === "agents") {
      return (
        <AgentsScreen
          onBack={goBack}
          onStartChat={handleStartChat}
        />
      );
    }

    if (subScreen === "emergency") {
      return (
        <EmergencyScreen
          onBack={goBack}
          onStartChat={handleStartChat}
        />
      );
    }

    if (subScreen === "wishlist") {
      return (
        <WishlistScreen
          wished={wished}
          wishlistCount={wishlistCount}
          wishlistValue={wishlistValue}
          userPoints={user.points}
          onToggleWish={handleToggleWish}
          onOpenItem={handleOpenItem}
          onGoToSearch={() => {
            setTab("search");
            setSubScreen(null);
          }}
          onBack={goBack}
        />
      );
    }

    if (subScreen === "packages") {
      return (
        <PackagesScreen
          onBack={goBack}
          onStartChat={handleStartChat}
          onGoToAgents={() => setSubScreen("agents")}
        />
      );
    }

    if (subScreen === "partner") {
      return <PartnerPortal onBack={goBack} />;
    }

    if (subScreen === "booking" && selectedItem) {
      return (
        <BookingFlow
          item={selectedItem}
          user={user}
          onBack={goBack}
          onComplete={() => {
            addPoints(Math.round(selectedItem.price * 0.1));
            setToast("Booking confirmed! 🎉");
            goBack();
          }}
          onStartChat={handleStartChat}
        />
      );
    }

    // Main tabs
    switch (tab) {
      case "home":
        return (
          <HomeTab
            user={user}
            wished={wished}
            wishlistCount={wishlistCount}
            wishlistValue={wishlistValue}
            onToggleWish={handleToggleWish}
            onOpenItem={handleOpenItem}
            onStartChat={handleStartChat}
            onGoToSearch={() => goToTab("search")}
            onGoToWishlist={() => setSubScreen("wishlist")}
            onGoToAgents={() => setSubScreen("agents")}
          />
        );
      case "search":
        return (
          <SearchTab
            wished={wished}
            onToggleWish={handleToggleWish}
            onOpenItem={handleOpenItem}
          />
        );
      case "plan":
        return (
          <PlanTab
            user={user}
            wished={wished}
            onToggleWish={handleToggleWish}
            onOpenItem={handleOpenItem}
            onGoToPackages={() => setSubScreen("packages")}
            onStartChat={handleStartChat}
            onGoToAgents={() => setSubScreen("agents")}
            onShowToast={showToast}
          />
        );
      case "support":
        return (
          <SupportTab
            onStartChat={handleStartChat}
            onGoToAgents={() => setSubScreen("agents")}
            onGoToEmergency={() => setSubScreen("emergency")}
          />
        );
      case "profile":
        return (
          <ProfileTab
            user={user}
            wished={wished}
            wishlistCount={wishlistCount}
            wishlistValue={wishlistValue}
            onGoToWishlist={() => setSubScreen("wishlist")}
            onRestartOnboarding={handleRestartOnboarding}
            onGoToPartner={() => setSubScreen("partner")}
            onShowToast={showToast}
          />
        );
      default:
        return null;
    }
  };

  // Splash screen
  if (phase === APP_PHASES.SPLASH) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Onboarding
  if (phase === APP_PHASES.ONBOARDING) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Main app
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background-tertiary)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-sans)",
        maxWidth: 430,
        margin: "0 auto",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {renderContent()}

      {/* Tab Bar - only show on main tabs */}
      {!subScreen && <TabBar activeTab={tab} onTabChange={goToTab} onStartChat={handleStartChat} />}

      {/* Toast */}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
