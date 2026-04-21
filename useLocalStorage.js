// ============================================
// PILL / BADGE COMPONENT
// ============================================

import React from "react";

export default function Pill({
  text,
  color = "#00C896",
  background,
  small = false,
  icon,
}) {
  const bg = background || color + "18";

  return (
    <span
      style={{
        fontSize: small ? 9 : 10,
        fontWeight: 700,
        padding: small ? "2px 6px" : "3px 9px",
        borderRadius: 100,
        background: bg,
        color,
        letterSpacing: 0.3,
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        whiteSpace: "nowrap",
      }}
    >
      {icon && <span>{icon}</span>}
      {text}
    </span>
  );
}
