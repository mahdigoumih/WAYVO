// ============================================
// TOAST NOTIFICATION COMPONENT
// ============================================

import React, { useEffect } from "react";

export default function Toast({ message, onClose, duration = 2200 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 76,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0D1B2A",
        color: "#fff",
        padding: "9px 17px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        zIndex: 9999,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        animation: "toastSlideUp 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "90vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
