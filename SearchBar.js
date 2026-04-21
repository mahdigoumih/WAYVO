// ============================================
// SUPPORT TAB - Help, emergency, price guide
// ============================================

import React from "react";
import Pill from "../ui/Pill";
import { EMERGENCY_NUMBERS } from "../../data/items";

export default function SupportTab({
  onStartChat,
  onGoToAgents,
  onGoToEmergency,
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "16px 14px 20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -0.5,
          }}
        >
          Support
        </h1>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 10,
            color: "rgba(255,255,255,.4)",
          }}
        >
          AI · Human specialists · WhatsApp · Emergency
        </p>
      </div>

      <div style={{ padding: "13px" }}>
        {/* AI Support */}
        <button
          onClick={() => onStartChat("ai")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "var(--color-background-primary)",
            border: "2px solid #00C896",
            borderRadius: 13,
            padding: "14px",
            marginBottom: 10,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#00C896",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22 }}>🤖</span>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              Wayvo AI
            </p>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              Instant · Your language · 24/7 · Fair price guide
            </p>
            <Pill text="● Always online" color="#00C896" small />
          </div>
          <span style={{ color: "#00C896", fontSize: 20 }}>›</span>
        </button>

        {/* Human Specialists */}
        <button
          onClick={onGoToAgents}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 13,
            padding: "13px",
            marginBottom: 10,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              Human Specialists
            </p>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              Real experts · Chat · WhatsApp · Video call
            </p>
            <Pill text="● 3 online now" color="#22C55E" small />
          </div>
          <span style={{ color: "var(--color-text-tertiary)", fontSize: 20 }}>
            ›
          </span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => window.open("https://wa.me/212600000000", "_blank")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 13,
            padding: "13px",
            marginBottom: 10,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            💬
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: 13,
                fontWeight: 700,
                color: "#166534",
              }}
            >
              WhatsApp Support
            </p>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "#16A34A",
              }}
            >
              Direct line to our specialists via WhatsApp
            </p>
            <Pill
              text="Typical reply: 5 minutes"
              color="#16A34A"
              bg="#DCFCE7"
              small
            />
          </div>
          <span style={{ color: "#16A34A", fontSize: 20 }}>›</span>
        </button>

        {/* Emergency */}
        <button
          onClick={onGoToEmergency}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 13,
            padding: "13px",
            marginBottom: 16,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            🆘
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: 13,
                fontWeight: 700,
                color: "#B91C1C",
              }}
            >
              Emergency Help
            </p>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "#E53935",
              }}
            >
              Guided steps · Embassy contacts · Works offline
            </p>
            <Pill
              text="Police 190 · Ambulance 150"
              color="#B91C1C"
              bg="#FEE2E2"
              small
            />
          </div>
          <span style={{ color: "#E53935", fontSize: 20 }}>›</span>
        </button>

        {/* Price Guide */}
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 12,
            padding: "13px",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            💰 Fair price guide — Marrakech
          </p>
          {[
            ["Petit taxi — medina to Gueliz", "20–30 MAD"],
            ["Grand taxi — Marrakech to Ourika", "50–70 MAD"],
            ["Airport taxi to medina", "80–100 MAD"],
            ["Lunch in a local restaurant", "40–80 MAD/person"],
            ["Street food snack", "10–25 MAD"],
            ["Hammam entry (local)", "10–20 MAD"],
            ["Hammam (tourist, with massage)", "150–350 MAD"],
            ["Water (0.5L bottle)", "3–5 MAD"],
          ].map(([item, price]) => (
            <div
              key={item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: "0.5px solid var(--color-border-tertiary)",
              }}
            >
              <span
                style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
              >
                {item}
              </span>
              <span
                style={{ fontSize: 11, fontWeight: 700, color: "#00C896" }}
              >
                {price}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          Common questions
        </p>
        {[
          "Is Morocco safe for solo travellers?",
          "What currency should I bring?",
          "Do I need a visa for Morocco?",
          "Best time to visit Morocco?",
          "How to get around Morocco cheaply?",
        ].map((q) => (
          <button
            key={q}
            onClick={() => onStartChat("ai")}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "10px 13px",
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 9,
              marginBottom: 5,
              fontSize: 12,
              color: "var(--color-text-primary)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.2s ease",
            }}
          >
            {q}
            <span
              style={{ color: "#00C896", flexShrink: 0, marginLeft: 7 }}
            >
              ›
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
