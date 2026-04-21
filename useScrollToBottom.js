// ============================================
// TYPING INDICATOR COMPONENT
// ============================================

import React from "react";

export default function TypingIndicator({ color = "#00C896" }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "9px 13px",
        background: "var(--color-background-primary)",
        borderRadius: "15px 15px 15px 4px",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            display: "inline-block",
            animation: `typingPulse 0.9s ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
