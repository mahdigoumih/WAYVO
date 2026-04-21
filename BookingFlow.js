// ============================================
// TAB BAR - Bottom navigation
// ============================================

import React from "react";
import { MAIN_TABS } from "../utils/constants";

export default function TabBar({ activeTab, onTabChange, onStartChat }) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(13,27,42,.95)",
        backdropFilter: "blur(20px)",
        borderTop: "0.5px solid rgba(255,255,255,.08)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        zIndex: 1000,
      }}
      role="tablist"
      aria-label="Main navigation"
    >
      {MAIN_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            tab.id === "support" ? onStartChat("ai") : onTabChange(tab.id)
          }
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-label={tab.label}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            padding: "6px 0",
            background: "none",
            border: "none",
            cursor: "pointer",
            color:
              activeTab === tab.id
                ? "#00C896"
                : "rgba(255,255,255,.35)",
            transition: "color 0.2s ease",
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span
            style={{
              fontSize: 9,
              fontWeight: activeTab === tab.id ? 700 : 400,
              letterSpacing: 0.3,
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
