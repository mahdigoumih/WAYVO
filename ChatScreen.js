// ============================================
// TAG COMPONENT
// ============================================

import React from "react";

export default function Tag({ text }) {
  return (
    <span
      style={{
        fontSize: 10,
        padding: "3px 7px",
        borderRadius: 7,
        background: "var(--color-background-secondary)",
        color: "var(--color-text-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}
