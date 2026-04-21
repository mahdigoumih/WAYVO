// ============================================
// SEARCH BAR COMPONENT
// Accessible, debounced-ready search input
// ============================================

import React from "react";

export default function SearchBar({
  query,
  onChange,
  inPage = false,
  onFocus,
  placeholder = "Search hotels, tours, food, transport…",
}) {
  return (
    <div
      role="search"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: inPage
          ? "var(--color-background-secondary)"
          : "rgba(255,255,255,0.13)",
        border: inPage
          ? "1px solid var(--color-border-secondary)"
          : "1px solid rgba(255,255,255,0.2)",
        borderRadius: 13,
        padding: "0 13px",
        height: 44,
        transition: "all 0.2s ease",
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke={
          inPage ? "var(--color-text-tertiary)" : "rgba(255,255,255,0.6)"
        }
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label="Search experiences"
        style={{
          flex: 1,
          background: "none",
          border: "none",
          outline: "none",
          fontSize: 13,
          color: inPage ? "var(--color-text-primary)" : "#fff",
          fontFamily: "var(--font-sans)",
          WebkitAppearance: "none",
        }}
      />

      {query && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: inPage
              ? "var(--color-text-tertiary)"
              : "rgba(255,255,255,.6)",
            fontSize: 17,
            lineHeight: 1,
            padding: 0,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
