// ============================================
// AGENTS SCREEN - Human specialists listing
// ============================================

import React from "react";
import Pill from "../ui/Pill";
import { AGENTS } from "../../data/items";

export default function AgentsScreen({ onBack, onStartChat }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "11px 13px 16px",
        }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,.6)",
            fontSize: 16,
            cursor: "pointer",
            padding: 0,
            marginBottom: 8,
            display: "block",
          }}
        >
          ←
        </button>
        <h1
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -0.5,
          }}
        >
          Talk to a Specialist
        </h1>
        <p style={{ margin: "3px 0 0", fontSize: 10, color: "rgba(255,255,255,.4)" }}>
          Real humans · Certified experts · Instant response
        </p>
      </div>

      <div style={{ padding: "12px" }}>
        {/* Online status */}
        <div
          style={{
            background: "var(--color-background-info)",
            borderRadius: 9,
            padding: "9px 12px",
            marginBottom: 12,
            display: "flex",
            gap: 7,
            alignItems: "center",
          }}
        >
          <span>🟢</span>
          <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-info)" }}>
            3 specialists online · Avg first response: 45 seconds
          </p>
        </div>

        {/* Agent cards */}
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 14,
              padding: "14px",
              marginBottom: 10,
            }}
          >
            {/* Agent header */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: agent.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {agent.img}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: agent.status === "online" ? "#22C55E" : "#F59E0B",
                    border: "2px solid var(--color-background-primary)",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 2,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {agent.name}
                  </p>
                  <Pill
                    text={
                      agent.status === "online" ? "● Online" : "● Busy"
                    }
                    color={agent.status === "online" ? "#16A34A" : "#D97706"}
                    small
                  />
                </div>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: agent.col,
                  }}
                >
                  {agent.spec}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {agent.lang.join(" · ")} · {agent.exp} · ⭐{agent.rating} ·{" "}
                  {agent.handled.toLocaleString()} trips
                </p>
              </div>
            </div>

            {/* Bio */}
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 11,
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              "{agent.bio}"
            </p>

            {/* Actions */}
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => onStartChat("agent", agent)}
                disabled={agent.status !== "online"}
                style={{
                  flex: 2,
                  padding: "10px",
                  borderRadius: 9,
                  background: agent.status === "online" ? agent.col : "var(--color-background-secondary)",
                  border: "none",
                  color: agent.status === "online" ? "#fff" : "var(--color-text-tertiary)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: agent.status === "online" ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                💬{" "}
                {agent.status === "online"
                  ? `Chat · ${agent.response}`
                  : "Currently busy"}
              </button>

              {agent.status === "online" && (
                <button
                  onClick={() =>
                    window.open("https://wa.me/212600000000", "_blank")
                  }
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 9,
                    background: "#25D366",
                    border: "none",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  WhatsApp
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Video consultation */}
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: 12,
            padding: "13px",
            marginTop: 4,
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            🎥 Video consultation
          </p>
          <p
            style={{
              margin: "0 0 9px",
              fontSize: 11,
              color: "var(--color-text-secondary)",
            }}
          >
            Book a 30-minute video call with a senior specialist for complex
            multi-city trips.
          </p>
          <button
            onClick={() => alert("Video call booking opening...")}
            style={{
              padding: "9px 16px",
              background: "#1D4ED8",
              border: "none",
              borderRadius: 9,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Book video call — $29 →
          </button>
        </div>
      </div>
    </div>
  );
}
