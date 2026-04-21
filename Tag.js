// ============================================
// EMERGENCY SCREEN
// Critical help for tourists in Morocco
// ============================================

import React from "react";
import { EMERGENCY_NUMBERS } from "../../data/items";

const EMERGENCY_GUIDES = [
  {
    icon: "🚨",
    title: "I was robbed",
    steps: [
      "Stay calm — do not chase the thief",
      "Go to nearest Commissariat de Police (police station)",
      "File a procès-verbal (police report) — keep the reference number",
      "Contact your country's embassy immediately",
      "Cancel your bank cards — call your bank's international emergency number",
    ],
  },
  {
    icon: "🤒",
    title: "I'm sick or injured",
    steps: [
      "For life-threatening: call Ambulance 150 immediately",
      "For non-urgent: call SOS Médecins 0520 48 48 48 (24/7 home visits)",
      "Ask your hotel reception for the nearest private clinique or pharmacie de garde",
      "Keep your passport or a passport photo with you at all times",
    ],
  },
  {
    icon: "🛂",
    title: "I lost my passport",
    steps: [
      "File a police report first — you need the reference number",
      "Contact your embassy — they will issue an emergency travel document",
      "Most embassies in Rabat, with consulates in Casablanca and Marrakech",
      "Keep a photo of your passport in cloud storage as backup",
    ],
  },
  {
    icon: "📵",
    title: "No internet or data in Morocco",
    steps: [
      "Find any café — request free WiFi. Say: 'WiFi s'il vous plaît?'",
      "Show this screen to any local — Moroccans are extremely helpful to tourists",
      "Ask for 'Le commissariat de police' — they will guide you safely",
      "Emergency numbers 190 and 150 work without any data or credit",
    ],
  },
  {
    icon: "🌡️",
    title: "Extreme heat emergency",
    steps: [
      "Get out of direct sun immediately — seek shade or air-conditioned space",
      "Drink water slowly — ask for 'eau fraîche s'il vous plaît'",
      "Wet a cloth and apply to neck and wrists — cools body temperature fast",
      "If someone collapses, call 150 and keep them in shade and cool",
    ],
  },
];

export default function EmergencyScreen({ onBack, onStartChat }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: "#7F1D1D",
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
          }}
        >
          🆘 Emergency Help
        </h1>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 10,
            color: "rgba(255,255,255,.5)",
          }}
        >
          Morocco emergency contacts · Guided steps · Works offline
        </p>
      </div>

      <div style={{ padding: "12px" }}>
        {/* Emergency Numbers */}
        <div
          style={{
            background: "#FEE2E2",
            border: "1px solid #FECACA",
            borderRadius: 12,
            padding: "13px",
            marginBottom: 11,
          }}
        >
          <p
            style={{
              margin: "0 0 9px",
              fontSize: 12,
              fontWeight: 700,
              color: "#7F1D1D",
            }}
          >
            🚨 Emergency numbers — save now
          </p>
          {EMERGENCY_NUMBERS.map(({ icon, name, number, description }) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "6px 0",
                borderBottom: "0.5px solid #FECACA",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#B91C1C",
                    fontWeight: 600,
                  }}
                >
                  {icon} {name}
                </p>
                <p style={{ margin: 0, fontSize: 9, color: "#DC2626" }}>
                  {description}
                </p>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#7F1D1D",
                }}
              >
                {number}
              </span>
            </div>
          ))}
        </div>

        {/* Emergency Guides */}
        {EMERGENCY_GUIDES.map(({ icon, title, steps }) => (
          <div
            key={title}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 11,
              padding: "12px",
              marginBottom: 8,
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {icon} {title}
            </p>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  padding: "5px 0",
                  borderTop:
                    i > 0 ? "0.5px solid var(--color-border-tertiary)" : "none",
                }}
              >
                <div
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    background: "#E5393518",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ fontSize: 8, fontWeight: 700, color: "#E53935" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        ))}

        {/* AI Help Button */}
        <button
          onClick={() => onStartChat("ai")}
          style={{
            width: "100%",
            padding: "11px",
            background: "#E53935",
            border: "none",
            borderRadius: 10,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          💬 Get AI guidance now →
        </button>
      </div>
    </div>
  );
}
