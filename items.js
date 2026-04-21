// ============================================
// WISHLIST SCREEN
// ============================================

import React from "react";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import { ITEMS } from "../../data/items";

export default function WishlistScreen({
  wished,
  wishlistCount,
  wishlistValue,
  userPoints,
  onToggleWish,
  onOpenItem,
  onGoToSearch,
  onBack,
}) {
  const wItems = ITEMS.filter((i) => wished.has(i.id));

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: -0.5,
              }}
            >
              My Wishlist
            </h1>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 10,
                color: "rgba(255,255,255,.4)",
              }}
            >
              {wishlistCount} saved · {userPoints} Wayvo Points
            </p>
          </div>
          {wishlistCount > 0 && (
            <Pill
              text={`❤️ ${wishlistCount}`}
              color="#FCA5A5"
              bg="rgba(229,57,53,.2)"
            />
          )}
        </div>
      </div>

      <div style={{ padding: "12px" }}>
        {wishlistCount === 0 ? (
          /* Empty state */
          <div style={{ textAlign: "center", padding: "44px 20px" }}>
            <p style={{ fontSize: 40, margin: "0 0 9px" }}>🤍</p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "var(--color-text-primary)",
                margin: "0 0 6px",
              }}
            >
              Wishlist is empty
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: "0 0 16px",
              }}
            >
              Tap ❤️ on any experience to save it.
            </p>
            <button
              onClick={onGoToSearch}
              style={{
                padding: "10px 20px",
                background: "#00C896",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Explore →
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 11,
              }}
            >
              <div
                style={{
                  background: "var(--color-background-primary)",
                  border: "0.5px solid var(--color-border-tertiary)",
                  borderRadius: 10,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 17 }}>💰</p>
                <p
                  style={{
                    margin: "3px 0 1px",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                  }}
                >
                  ${Math.round(
                    wItems.reduce((s, i) => s + i.price, 0) / wItems.length
                  )}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  avg price
                </p>
              </div>
              <div
                style={{
                  background: "var(--color-background-primary)",
                  border: "0.5px solid var(--color-border-tertiary)",
                  borderRadius: 10,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 17 }}>💰</p>
                <p
                  style={{
                    margin: "3px 0 1px",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                  }}
                >
                  ${wItems.reduce((s, i) => s + i.price, 0)}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  total value
                </p>
              </div>
            </div>

            {/* Items */}
            {wItems.map((it) => (
              <Card
                key={it.id}
                item={it}
                wished
                onWish={() => onToggleWish(it.id)}
                onOpen={onOpenItem}
                compact
              />
            ))}

            <button
              onClick={onGoToSearch}
              style={{
                width: "100%",
                padding: "10px",
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
              + Explore more
            </button>
          </>
        )}
      </div>
    </div>
  );
}
