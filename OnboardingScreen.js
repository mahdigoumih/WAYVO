// ============================================
// PROFILE TAB - User profile & settings
// ============================================

import React from "react";
import { CITIES, INTERESTS } from "../../data/items";
import { getInitials } from "../../utils/helpers";

export default function ProfileTab({
  user,
  wished,
  wishlistCount,
  wishlistValue,
  onGoToWishlist,
  onRestartOnboarding,
  onGoToPartner,
  onShowToast,
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Profile Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "22px 14px 26px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#00C896",
            margin: "0 auto 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {getInitials(user.name)}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {user.name || "Wayvo Traveller"}
        </p>
        <p
          style={{
            margin: "3px 0 7px",
            fontSize: 11,
            color: "rgba(255,255,255,.4)",
          }}
        >
          {user.nat || "Set your nationality"} · {user.city}
        </p>

        {user.points > 0 && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(245,163,35,.2)",
              border: "1px solid rgba(245,163,35,.3)",
              borderRadius: 100,
              padding: "5px 13px",
              marginBottom: 7,
            }}
          >
            <span style={{ fontSize: 13 }}>🌟</span>
            <span
              style={{ fontSize: 12, color: "#F5A623", fontWeight: 700 }}
            >
              {user.points} Wayvo Points
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 5,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {user.interests.map((id) => {
            const it = INTERESTS.find((x) => x.id === id);
            return it ? (
              <span
                key={id}
                style={{
                  fontSize: 10,
                  padding: "3px 9px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.7)",
                }}
              >
                {it.icon} {it.label}
              </span>
            ) : null;
          })}
        </div>
      </div>

      <div style={{ padding: "13px" }}>
        {/* Morocco Passport */}
        <div
          style={{
            background: "var(--gradient-gold)",
            border: "1px solid #F5A62330",
            borderRadius: 12,
            padding: "13px",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            🛂 Morocco Passport
          </p>
          <p
            style={{
              margin: "0 0 9px",
              fontSize: 11,
              color: "var(--color-text-secondary)",
            }}
          >
            Collect a digital stamp for every city you visit through Wayvo.
            Share on Instagram.
          </p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {CITIES.slice(0, 6).map((c, i) => (
              <span
                key={c}
                style={{
                  fontSize: 10,
                  padding: "4px 9px",
                  borderRadius: 8,
                  background: i === 0 ? "#F5A62320" : "var(--color-background-secondary)",
                  color: i === 0 ? "#F5A623" : "var(--color-text-tertiary)",
                  border:
                    i === 0 ? "1px solid #F5A62330" : "0.5px solid var(--color-border-tertiary)",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {i === 0 ? "✅ " : ""}
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Wishlist Shortcut */}
        <button
          onClick={onGoToWishlist}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 12,
            padding: "12px 13px",
            cursor: "pointer",
            marginBottom: 10,
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 22 }}>❤️</span>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#B91C1C",
              }}
            >
              My Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </p>
            <p style={{ margin: 0, fontSize: 10, color: "#E53935" }}>
              {wishlistCount > 0
                ? `${wishlistCount} saved · $${wishlistValue} total value`
                : "Tap ❤️ on any card to save"}
            </p>
          </div>
          <span style={{ color: "#E53935", fontSize: 14 }}>›</span>
        </button>

        {/* Update Preferences */}
        <button
          onClick={onRestartOnboarding}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "var(--color-background-primary)",
            border: "1px solid #00C896",
            borderRadius: 12,
            padding: "12px 13px",
            cursor: "pointer",
            marginBottom: 10,
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 20 }}>✏️</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#009E78",
              flex: 1,
            }}
          >
            Update my travel preferences
          </span>
          <span style={{ color: "#00C896", fontSize: 14 }}>›</span>
        </button>

        {/* Menu Items */}
        {[
          {
            icon: "🌍",
            title: "My Trips",
            desc: "0 upcoming · 0 completed",
          },
          {
            icon: "⭐",
            title: "My Reviews",
            desc: "Rate your experiences",
          },
          {
            icon: "💳",
            title: "Payment Methods",
            desc: "Add card for instant booking",
          },
          {
            icon: "🛡️",
            title: "Travel Insurance",
            desc: "Covered from $3/day",
          },
          {
            icon: "🔔",
            title: "Notifications",
            desc: "Deals, price drops, trip reminders",
          },
        ].map((item) => (
          <div
            key={item.title}
            onClick={() => onShowToast("Coming soon!")}
            role="button"
            tabIndex={0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px",
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 11,
              marginBottom: 7,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: 20, width: 32, textAlign: "center" }}>
              {item.icon}
            </span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.desc}
              </p>
            </div>
            <span style={{ color: "var(--color-text-tertiary)", fontSize: 14 }}>
              ›
            </span>
          </div>
        ))}

        {/* Partner Portal */}
        <button
          onClick={onGoToPartner}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "var(--gradient-primary)",
            border: "none",
            borderRadius: 12,
            padding: "13px",
            cursor: "pointer",
            marginTop: 4,
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(255,255,255,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Partner Portal
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "rgba(255,255,255,.5)",
              }}
            >
              Hotels · Guides · Tours · Transport
            </p>
          </div>
          <span style={{ color: "#00C896", fontSize: 14 }}>›</span>
        </button>

        {/* Global Expansion */}
        <div
          style={{
            background: "var(--gradient-primary)",
            borderRadius: 12,
            padding: "13px",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            🌍 Wayvo is going global
          </p>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 10,
              color: "rgba(255,255,255,.4)",
            }}
          >
            Morocco first · North Africa next · The world by 2030
          </p>
          <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["🇲🇦 Active", "🌍 Africa 2027", "🌎 World 2028+"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  padding: "3px 9px",
                  borderRadius: 100,
                  background: "#00C89628",
                  color: "#00C896",
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
