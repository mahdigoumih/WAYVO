// ============================================
// WAYVO LOGO COMPONENT
// ============================================

import React from "react";

export default function Logo({ size = 30, light = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-label="Wayvo logo"
      role="img"
    >
      <rect width="40" height="40" rx="11" fill="#00C896" />
      <path
        d="M8 15L14 26L20 17L26 26L32 15"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="32" cy="15" r="3" fill="#fff" />
    </svg>
  );
}
