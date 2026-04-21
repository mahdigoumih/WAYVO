// ============================================
// PLAN TAB - AI Itinerary Builder
// ============================================

import React, { useState, useCallback } from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import { ITEMS, CITIES, PACKAGES } from "../../data/items";
import { API_CONFIG } from "../../utils/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function PlanTab({
  user,
  wished,
  onToggleWish,
  onOpenItem,
  onGoToPackages,
  onStartChat,
  onGoToAgents,
  onShowToast,
}) {
  const [itiCity, setItiCity] = useState(user.city || "Marrakech");
  const [itiDays, setItiDays] = useState(5);
  const [itiBuilt, setItiBuilt] = useState(false);
  const [itiText, setItiText] = useState("");
  const [itiItems, setItiItems] = useState([]);
  const [genBusy, setGenBusy] = useState(false);

  const buildItinerary = useCallback(async () => {
    setGenBusy(true);
    setItiBuilt(false);
    setItiText("");

    const prompt = `Create a ${itiDays}-day Morocco itinerary for ${
      user.name || "a traveller"
    } in/around ${itiCity}. Interests: ${
      user.interests.join(", ") || "general sightseeing"
    }. Budget: ${user.budget || "flexible"}. Format: Day 1: [Morning activity] → [Afternoon activity] → [Evening recommendation]. Keep each day to 2 lines max. Be specific with real Morocco place names. Response in the user's language (auto-detect from this message — default English).`;

    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      const response = await fetch(API_CONFIG.ANTHROPIC_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": API_CONFIG.ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model: API_CONFIG.MODEL,
          max_tokens: 800,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text =
        data.content?.[0]?.text || "Could not generate itinerary.";
      setItiText(text);

      // Find matching items
      const matching = ITEMS.filter(
        (it) => it.city === itiCity || it.loc.includes(itiCity)
      ).slice(0, 4);
      setItiItems(matching);
      setItiBuilt(true);

      // Award points
      onShowToast("+10 Wayvo Points earned! 🌟");
    } catch (error) {
      console.error("Itinerary error:", error);
      setItiText(
        "Connection issue. Please check your API key and try again."
      );
      setItiBuilt(true);
    } finally {
      setGenBusy(false);
    }
  }, [itiCity, itiDays, user, onShowToast]);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "16px 14px 22px",
        }}
      >
        <h1
          style={{
            margin: "0 0 3px",
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -0.5,
          }}
        >
          🗺️ Itinerary Builder
        </h1>
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 10,
            color: "rgba(255,255,255,.4)",
          }}
        >
          AI-powered · Personalised for you · Instantly bookable
        </p>

        {/* City & Duration selectors */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 5px",
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              City
            </p>
            <select
              value={itiCity}
              onChange={(e) => setItiCity(e.target.value)}
              aria-label="Select city"
              style={{
                width: "100%",
                padding: "9px 11px",
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.1)",
                fontSize: 12,
                color: "#fff",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              {CITIES.map((c) => (
                <option key={c} value={c} style={{ color: "#0D1B2A" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 5px",
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Duration
            </p>
            <select
              value={itiDays}
              onChange={(e) => setItiDays(Number(e.target.value))}
              aria-label="Select duration"
              style={{
                width: "100%",
                padding: "9px 11px",
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.1)",
                fontSize: 12,
                color: "#fff",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              {[2, 3, 4, 5, 7, 10, 14].map((d) => (
                <option key={d} value={d} style={{ color: "#0D1B2A" }}>
                  {d} days
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interest tags */}
        {user.interests.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            {user.interests.slice(0, 5).map((id) => {
              const interestMap = {
                adventure: "⛺",
                luxury: "💎",
                culture: "🕌",
                food: "🍜",
                family: "👨‍👩‍👧",
                romance: "💝",
                budget: "💰",
                wellness: "🧖",
                nature: "🌿",
                photo: "📸",
              };
              return (
                <span
                  key={id}
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 100,
                    background: "rgba(255,255,255,.12)",
                    color: "rgba(255,255,255,.7)",
                  }}
                >
                  {interestMap[id] || "✨"} {id}
                </span>
              );
            })}
          </div>
        )}

        {/* Build button */}
        <button
          onClick={buildItinerary}
          disabled={genBusy}
          style={{
            width: "100%",
            padding: "13px",
            background: genBusy ? "rgba(255,255,255,.2)" : "#00C896",
            border: "none",
            borderRadius: 11,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: genBusy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            transition: "all 0.2s ease",
          }}
        >
          {genBusy ? (
            <>
              <span
                style={{
                  fontSize: 14,
                  animation: "typingPulse 0.9s infinite",
                }}
              >
                ⚡
              </span>
              Building your itinerary…
            </>
          ) : (
            "✨ Build my itinerary"
          )}
        </button>
      </div>

      {/* Results */}
      <div style={{ padding: "13px" }}>
        {/* Empty state */}
        {!itiBuilt && !genBusy && (
          <div
            style={{
              textAlign: "center",
              padding: "28px 20px",
              background: "var(--color-background-primary)",
              borderRadius: 14,
              border: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <p style={{ fontSize: 32, margin: "0 0 9px" }}>✈️</p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 6px",
              }}
            >
              Build your Morocco itinerary
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Select your city and duration above, then let Wayvo AI build a
              personalised day-by-day plan based on your travel style.
            </p>
            <div
              style={{
                display: "flex",
                gap: 7,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {[
                "🏜️ Sahara adventure",
                "🕌 Imperial cities",
                "🌊 Coastal escape",
                "🧗 Mountain trek",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    padding: "4px 9px",
                    borderRadius: 100,
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {genBusy && (
          <div
            style={{
              textAlign: "center",
              padding: "28px",
              background: "var(--color-background-primary)",
              borderRadius: 14,
              border: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <p style={{ fontSize: 30, margin: "0 0 10px" }}>🤖</p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 6px",
              }}
            >
              Wayvo AI is planning your trip…
            </p>
            <p
              style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
            >
              Building a {itiDays}-day itinerary for {itiCity}…
            </p>
          </div>
        )}

        {/* Itinerary result */}
        {itiBuilt && itiText && (
          <>
            <div
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 14,
                padding: "16px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 11,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Your {itiDays}-day {itiCity} itinerary
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 10,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    ✨ AI-personalised · Based on your interests
                  </p>
                </div>
                <Pill text="+10 pts earned!" color="#F5A623" />
              </div>

              <div
                style={{
                  background: "var(--color-background-secondary)",
                  borderRadius: 10,
                  padding: "12px",
                }}
              >
                {itiText
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <p
                      key={i}
                      style={{
                        margin: "0 0 7px",
                        fontSize: 12,
                        color: line
                          .toLowerCase()
                          .startsWith("day")
                          ? "var(--color-text-primary)"
                          : "var(--color-text-secondary)",
                        fontWeight: line
                          .toLowerCase()
                          .startsWith("day")
                          ? 700
                          : 400,
                        lineHeight: 1.6,
                        borderTop:
                          line.toLowerCase().startsWith("day") && i > 0
                            ? "0.5px solid var(--color-border-tertiary)"
                            : "none",
                        paddingTop:
                          line.toLowerCase().startsWith("day") && i > 0
                            ? "7px"
                            : "0",
                      }}
                    >
                      {line}
                    </p>
                  ))}
              </div>

              <div style={{ display: "flex", gap: 7, marginTop: 11 }}>
                <button
                  onClick={onGoToAgents}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#00C896",
                    border: "none",
                    borderRadius: 9,
                    color: "#fff",
                    fontSize: 11,
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
                  Customise with AI
                </button>
              </div>
            </div>

            {/* Bookable experiences */}
            {itiItems.length > 0 && (
              <>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    marginBottom: 9,
                  }}
                >
                  📅 Bookable experiences in {itiCity}
                </p>
                {itiItems.map((it) => (
                  <Card
                    key={it.id}
                    item={it}
                    wished={wished.has(it.id)}
                    onWish={onToggleWish}
                    onOpen={onOpenItem}
                    compact
                  />
                ))}
              </>
            )}

            <button
              onClick={onGoToPackages}
              style={{
                width: "100%",
                padding: "11px",
                background: "var(--color-background-primary)",
                border: "1px solid #00C896",
                borderRadius: 10,
                color: "#00C896",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4,
                transition: "all 0.2s ease",
              }}
            >
              View all-inclusive packages →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
