// ============================================
// HEART / WISHLIST BUTTON
// ============================================

import React from "react";

export default function HeartButton({
  filled,
  onToggle,
  overlay = false,
  size = 13,
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={filled ? "Remove from wishlist" : "Add to wishlist"}
      style={{
        background: overlay
          ? "rgba(0,0,0,.35)"
          : filled
          ? "#FEE2E2"
          : "var(--color-background-secondary)",
        border: overlay
          ? "none"
          : filled
          ? "1px solid #FECACA"
          : "0.5px solid var(--color-border-tertiary)",
        borderRadius: "50%",
        width: 30,
        height: 30,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: 0,
        transition: "all 0.2s ease",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "#E53935" : "none"}
        stroke={
          filled
            ? "#E53935"
            : overlay
            ? "rgba(255,255,255,.9)"
            : "var(--color-text-tertiary)"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
