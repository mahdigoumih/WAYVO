// ============================================
// SPLASH SCREEN
// Animated app launch screen
// ============================================

import React, { useEffect, useState } from "react";
import Logo from "./ui/Logo";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => onComplete(), 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-background-tertiary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          animation: stage >= 1 ? "logoScale 0.6s ease forwards" : "none",
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "scale(1)" : "scale(0.5)",
          transition: "all 0.6s ease",
        }}
      >
        <Logo size={60} />
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 16,
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.5s ease",
        }}
      >
        <p
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: -1,
            color: "#fff",
            margin: "0 0 4px",
          }}
        >
          Way<span style={{ color: "#00C896" }}>vo</span>
        </p>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,.4)",
            margin: 0,
          }}
        >
          Morocco's premium AI travel companion
        </p>
      </div>
    </div>
  );
}
