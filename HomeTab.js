// ============================================
// WAYVO WORDMARK COMPONENT
// ============================================

import React from "react";

export default function Wordmark({ size = 20, light = false }) {
  return (
    <span
      style={{
        fontSize: size,
        fontWeight: 900,
        letterSpacing: -0.5,
        color: light ? "#fff" : "var(--color-text-primary)",
      }}
    >
      Way
      <span style={{ color: "#00C896" }}>vo</span>
    </span>
  );
}
