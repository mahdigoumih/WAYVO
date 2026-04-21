// ============================================
// PACKAGES SCREEN - Multi-day tour packages
// ============================================

import React from "react";
import Pill from "../ui/Pill";
import { PACKAGES } from "../../data/items";

export default function PackagesScreen({
  onBack,
  onStartChat,
  onGoToAgents,
}) {
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
          Multi-Day Packages
        </h1>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 10,
            color: "rgba(255,255,255,.4)",
          }}
        >
          All-inclusive · Expert guides · Best value
        </p>
      </div>

      <div style={{ padding: "12px" }}>
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.days}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 11,
            }}
          >
            {/* Package Header */}
            <div
              style={{
                background: "var(--gradient-primary)",
                padding: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Pill text={`${pkg.days} days`} color="#00C896" />
                    <Pill
                      text={`Save $${pkg.saving}`}
                      color="#fff"
                      bg="#E53935"
                    />
                  </div>
                  <p
                    style={{
                      margin: "0 0 2px",
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {pkg.em} {pkg.title}
                  </p>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 10,
                      color: "rgba(255,255,255,.5)",
                    }}
                  >
                    📍 {pkg.cities}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    {pkg.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 9,
                          padding: "2px 7px",
                          borderRadius: 100,
                          background: "rgba(255,255,255,.12)",
                          color: "rgba(255,255,255,.8)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#00C896",
                    }}
                  >
                    ${pkg.price}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 9,
                      color: "rgba(255,255,255,.4)",
                    }}
                  >
                    / person
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                padding: "11px 13px",
                display: "flex",
                gap: 7,
              }}
            >
              <button
                onClick={onGoToAgents}
                style={{
                  flex: 2,
                  padding: "10px",
                  background: "#00C896",
                  border: "none",
                  borderRadius: 9,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Book with specialist →
              </button>
              <button
                onClick={() => onStartChat("ai")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "var(--color-background-secondary)",
                  border: "0.5px solid var(--color-border-secondary)",
                  borderRadius: 9,
                  color: "var(--color-text-secondary)",
                  fontSize: 11,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Ask AI
              </button>
            </div>
          </div>
        ))}

        {/* Custom trip CTA */}
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: 12,
            padding: "13px",
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
            ✏️ Need something custom?
          </p>
          <p
            style={{
              margin: "0 0 9px",
              fontSize: 11,
              color: "var(--color-text-secondary)",
            }}
          >
            Our specialists build fully bespoke trips for any duration, group,
            or budget.
          </p>
          <button
            onClick={onGoToAgents}
            style={{
              padding: "9px 16px",
              background: "#0D1B2A",
              border: "none",
              borderRadius: 9,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Talk to a specialist →
          </button>
        </div>
      </div>
    </div>
  );
}
