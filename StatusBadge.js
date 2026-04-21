// ============================================
// HOME TAB COMPONENT
// ============================================

import React from "react";
import Logo from "../ui/Logo";
import Wordmark from "../ui/Wordmark";
import SearchBar from "../ui/SearchBar";
import Pill from "../ui/Pill";
import Card from "../ui/Card";
import { ITEMS, CATEGORIES } from "../../data/items";
import { getCurrentSeason } from "../../utils/helpers";

export default function HomeTab({
  user,
  wished,
  wishlistCount,
  wishlistValue,
  onToggleWish,
  onOpenItem,
  onStartChat,
  onGoToSearch,
  onGoToWishlist,
  onGoToAgents,
}) {
  const season = getCurrentSeason();
  const wItems = ITEMS.filter((i) => wished.has(i.id));

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Hero Section */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "18px 14px 22px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(0,200,150,.05)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={28} />
            <Wordmark light size={19} />
          </div>

          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            {user.points > 0 && (
              <div
                style={{
                  background: "rgba(245,163,35,.2)",
                  border: "1px solid rgba(245,163,35,.3)",
                  borderRadius: 18,
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 11 }}>🌟</span>
                <span
                  style={{ fontSize: 11, color: "#F5A623", fontWeight: 700 }}
                >
                  {user.points}pts
                </span>
              </div>
            )}

            <button
              onClick={onGoToWishlist}
              aria-label={`Wishlist, ${wishlistCount} items`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(255,255,255,.1)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 9,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill={wishlistCount > 0 ? "#E53935" : "none"}
                stroke={
                  wishlistCount > 0 ? "#E53935" : "rgba(255,255,255,.7)"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span
                style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}
              >
                {wishlistCount > 0 ? wishlistCount : "Save"}
              </span>
            </button>
          </div>
        </div>

        {/* Greeting */}
        <h1
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: -0.5,
            lineHeight: 1.2,
            margin: "0 0 2px",
          }}
        >
          Hey{user.name ? ` ${user.name}` : ""}! 👋
        </h1>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,.45)",
            margin: "0 0 13px",
          }}
        >
          🇲🇦 {user.city} · What are you looking for today?
        </p>

        {/* Search */}
        <SearchBar query="" onChange={() => {}} onFocus={onGoToSearch} />

        {/* Trust Strip */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 13,
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: 2,
          }}
        >
          {[
            "✅ Verified partners",
            "⭐ 4.9 avg rating",
            "🛡️ Wayvo Guarantee",
            "📞 24/7 support",
          ].map((t) => (
            <span
              key={t}
              style={{
                flexShrink: 0,
                fontSize: 9,
                fontWeight: 600,
                color: "rgba(255,255,255,.5)",
                background: "rgba(255,255,255,.07)",
                padding: "4px 9px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 14 }}>
        {/* Seasonal Banner */}
        <div
          style={{
            background: "var(--gradient-gold)",
            border: "1px solid #F5A62330",
            borderRadius: 12,
            padding: "11px 13px",
            marginBottom: 14,
            display: "flex",
            gap: 9,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 22 }}>{season.icon}</span>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {season.message}
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              {season.name} is ideal for Atlas treks and Sahara trips. Book
              soon — high season prices in 2 weeks.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            gap: 7,
            overflowX: "auto",
            scrollbarWidth: "none",
            marginBottom: 16,
            paddingBottom: 2,
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={onGoToSearch}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "7px 13px",
                borderRadius: 11,
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: 14 }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Wishlist Banner */}
        {wItems.length > 0 && (
          <button
            onClick={onGoToWishlist}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: 11,
              padding: "10px 13px",
              cursor: "pointer",
              marginBottom: 14,
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 20 }}>❤️</span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#B91C1C",
                }}
              >
                {wItems.length} saved to your wishlist
              </p>
              <p style={{ margin: 0, fontSize: 10, color: "#E53935" }}>
                Total value: ${wishlistValue}
              </p>
            </div>
            <span style={{ color: "#E53935", fontSize: 14 }}>›</span>
          </button>
        )}

        {/* AI Chat CTA */}
        <button
          onClick={() => onStartChat("ai")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "var(--color-background-primary)",
            border: "1.5px solid #00C896",
            borderRadius: 12,
            padding: "12px 13px",
            cursor: "pointer",
            marginBottom: 16,
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "#00C896",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Logo size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              Ask Wayvo AI anything
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "var(--color-text-secondary)",
              }}
            >
              Instant · Your language · 24/7 · Fair price guide
            </p>
          </div>
          <span style={{ color: "#00C896", fontSize: 16 }}>›</span>
        </button>

        {/* Hot Deals */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            🔥 Hot deals — limited spots
          </h2>
          <button
            onClick={onGoToSearch}
            style={{
              fontSize: 11,
              color: "#00C896",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            See all
          </button>
        </div>

        {ITEMS.filter((i) => i.hot || i.orig)
          .slice(0, 3)
          .map((it) => (
            <Card
              key={it.id}
              item={it}
              wished={wished.has(it.id)}
              onWish={onToggleWish}
              onOpen={onOpenItem}
            />
          ))}

        {/* Featured */}
        <h2
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            margin: "8px 0 10px",
          }}
        >
          ✨ Featured experiences
        </h2>

        {ITEMS.filter((i) => !i.hot && !i.orig)
          .slice(0, 4)
          .map((it) => (
            <Card
              key={it.id}
              item={it}
              wished={wished.has(it.id)}
              onWish={onToggleWish}
              onOpen={onOpenItem}
            />
          ))}

        {/* Specialist CTA */}
        <div
          style={{
            background: "var(--gradient-primary)",
            borderRadius: 14,
            padding: "16px 14px",
            marginTop: 4,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 30 }}>🤝</span>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 3px",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Need expert help?
            </p>
            <p
              style={{
                margin: "0 0 9px",
                fontSize: 11,
                color: "rgba(255,255,255,.5)",
              }}
            >
              Real Moroccan travel specialists on demand
            </p>
            <div style={{ display: "flex", gap: 7 }}>
              <button
                onClick={onGoToAgents}
                style={{
                  padding: "8px 13px",
                  background: "#00C896",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Chat now →
              </button>
              <button
                onClick={() =>
                  window.open("https://wa.me/212600000000", "_blank")
                }
                style={{
                  padding: "8px 13px",
                  background: "#25D366",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
