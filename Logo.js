// ============================================
// EXPERIENCE CARD COMPONENT
// Follows SRP: single responsibility - display experience data
// Uses React.memo for performance optimization [^42^]
// ============================================

import React, { memo } from "react";
import Pill from "./Pill";
import Tag from "./Tag";
import HeartButton from "./HeartButton";

const Card = memo(function Card({
  item,
  wished,
  onWish,
  onOpen,
  compact = false,
}) {
  const isHotel = item.cat === "hotels";
  const urgency = item.avail <= 3;

  // Compact card variant (for search results)
  if (compact) {
    return (
      <article
        onClick={() => onOpen(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
        aria-label={`${item.title}, ${item.price} dollars`}
        style={{
          display: "flex",
          background: "var(--color-background-primary)",
          border: `0.5px solid ${urgency ? "#FCD34D" : "var(--color-border-tertiary)"}`,
          borderRadius: 13,
          overflow: "hidden",
          cursor: "pointer",
          marginBottom: 8,
          transition: "all 0.2s ease",
        }}
        className="hover-lift"
      >
        {/* Color block with emoji */}
        <div
          style={{
            width: 82,
            background: `linear-gradient(135deg,${item.col}40,${item.col}80,#0D1B2A)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
            gap: 3,
            padding: 4,
          }}
        >
          <span aria-hidden="true">{item.em}</span>
          {item.eco && (
            <span
              style={{
                fontSize: 8,
                background: "#DCFCE7",
                color: "#166534",
                padding: "1px 4px",
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              ECO
            </span>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "9px 11px 9px 12px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 2,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                paddingRight: 5,
              }}
            >
              {item.title}
            </h3>
            <HeartButton filled={wished} onToggle={() => onWish(item.id)} />
          </div>

          <p
            style={{
              margin: "0 0 4px",
              fontSize: 10,
              color: "var(--color-text-secondary)",
            }}
          >
            📍 {item.loc}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0D1B2A",
                }}
              >
                ${item.price}
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 400,
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {isHotel ? "/night" : "/person"}
                </span>
              </p>
              {item.orig && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 9,
                    color: "var(--color-text-tertiary)",
                    textDecoration: "line-through",
                  }}
                >
                  ${item.orig}
                </p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 10, color: "#F5A623" }}>
                ⭐ {item.rating}
              </p>
              {urgency && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 9,
                    color: "#E53935",
                    fontWeight: 700,
                  }}
                >
                  Only {item.avail} left!
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Full card variant (for home screen)
  return (
    <article
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      aria-label={`${item.title}, ${item.price} dollars, rated ${item.rating}`}
      style={{
        background: "var(--color-background-primary)",
        border: `0.5px solid ${urgency ? "#FCD34D" : "var(--color-border-tertiary)"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        marginBottom: 12,
        transition: "all 0.2s ease",
      }}
      className="hover-lift"
    >
      {/* Hero color block */}
      <div
        style={{
          height: 120,
          background: `linear-gradient(135deg,${item.col}30,${item.col}65,#0D1B2A)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          position: "relative",
        }}
      >
        <span aria-hidden="true">{item.em}</span>

        {/* Badges overlay */}
        <div
          style={{
            position: "absolute",
            top: 9,
            left: 10,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Pill text={item.badge} color="#F5A623" />
          {item.hot && <Pill text="🔥 Hot" color="#E53935" />}
          {item.eco && <Pill text="🌿 Eco" color="#0D9488" />}
          {item.orig && (
            <Pill
              text={`Save $${item.orig - item.price}`}
              color="#fff"
              bg="#E53935"
            />
          )}
        </div>

        {/* Heart button */}
        <div style={{ position: "absolute", top: 7, right: 8 }}>
          <HeartButton
            filled={wished}
            onToggle={() => onWish(item.id)}
            overlay
          />
        </div>

        {/* Urgency badge */}
        {urgency && (
          <div style={{ position: "absolute", bottom: 8, right: 8 }}>
            <Pill
              text={`⚡ ${item.avail} spots left`}
              color="#E53935"
              bg="rgba(229,57,53,.85)"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "11px 13px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 2,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              flex: 1,
              paddingRight: 5,
            }}
          >
            {item.title}
          </h3>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 800,
                color: "#0D1B2A",
              }}
            >
              ${item.price}
            </p>
            {item.orig && (
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  color: "var(--color-text-tertiary)",
                  textDecoration: "line-through",
                }}
              >
                ${item.orig}
              </p>
            )}
          </div>
        </div>

        <p
          style={{
            margin: "0 0 6px",
            fontSize: 10,
            color: "var(--color-text-secondary)",
          }}
        >
          📍 {item.loc}{" "}
          {item.duration && `· ⏱ ${item.duration}`}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {item.tags.slice(0, 2).map((t) => (
              <Tag key={t} text={t} />
            ))}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 10,
              color: "#F5A623",
              flexShrink: 0,
            }}
          >
            ⭐ {item.rating}{" "}
            <span style={{ color: "var(--color-text-tertiary)" }}>
              ({item.reviews})
            </span>
          </p>
        </div>
      </div>
    </article>
  );
});

export default Card;
