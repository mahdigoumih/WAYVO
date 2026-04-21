// ============================================
// BOOKING FLOW COMPONENT
// Multi-step booking: detail → guests → payment → confirmed
// ============================================

import React, { useState, useMemo } from "react";
import Logo from "../ui/Logo";
import Pill from "../ui/Pill";
import { formatPrice } from "../../utils/helpers";

const STEPS = ["detail", "guests", "confirm", "confirmed"];

export default function BookingFlow({
  item,
  user,
  onBack,
  onComplete,
  onStartChat,
}) {
  const [step, setStep] = useState("detail");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  const isHotel = item.cat === "hotels";

  // Consistent price calculation (fixed bug from original)
  const total = useMemo(() => {
    const adultTotal = item.price * guests.adults;
    const childPrice = Math.round(item.price * 0.5);
    const childTotal = childPrice * guests.children;
    return adultTotal + childTotal;
  }, [item.price, guests]);

  const goBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx <= 0) {
      onBack();
    } else {
      setStep(STEPS[idx - 1]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "detail":
        return (
          <DetailStep
            item={item}
            user={user}
            wished={false}
            onNext={() => setStep("guests")}
            onStartChat={onStartChat}
          />
        );
      case "guests":
        return (
          <GuestsStep
            item={item}
            guests={guests}
            setGuests={setGuests}
            total={total}
            onNext={() => setStep("confirm")}
          />
        );
      case "confirm":
        return (
          <PaymentStep
            item={item}
            user={user}
            guests={guests}
            total={total}
            onPay={() => setStep("confirmed")}
          />
        );
      case "confirmed":
        return (
          <ConfirmedStep
            item={item}
            user={user}
            guests={guests}
            total={total}
            onStartChat={onStartChat}
            onBack={onBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "10px 13px",
          display: "flex",
          alignItems: "center",
          gap: 9,
          flexShrink: 0,
        }}
      >
        <button
          onClick={goBack}
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,.7)",
            fontSize: 18,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title}
          </p>
          <p style={{ margin: 0, fontSize: 10, color: "#00C896" }}>
            {step === "detail"
              ? "Overview"
              : step === "guests"
              ? "Guests"
              : step === "confirm"
              ? "Payment"
              : "Confirmed"}
          </p>
        </div>
        {step !== "confirmed" && (
          <div style={{ display: "flex", gap: 3 }}>
            {STEPS.slice(0, 3).map((s) => (
              <div
                key={s}
                style={{
                  width: 20,
                  height: 3,
                  borderRadius: 3,
                  background:
                    s === step ? "#00C896" : "rgba(255,255,255,.2)",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {renderStep()}
      </div>
    </div>
  );
}

// Step 1: Detail
function DetailStep({ item, onNext, onStartChat }) {
  const urgency = item.avail <= 3;

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Hero */}
      <div
        style={{
          height: 150,
          background: `linear-gradient(135deg,${item.col}35,${item.col}72,#0D1B2A)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <span aria-hidden="true">{item.em}</span>
        {urgency && (
          <div style={{ position: "absolute", bottom: 9, right: 9 }}>
            <Pill
              text={`⚡ Only ${item.avail} left`}
              color="#fff"
              bg="rgba(229,57,53,.85)"
            />
          </div>
        )}
      </div>

      <div style={{ padding: "16px 14px" }}>
        {/* Title & Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                marginBottom: 5,
              }}
            >
              <Pill text={item.badge} color="#F5A623" />
              {item.eco && <Pill text="🌿 Eco" color="#0D9488" />}
              {item.hot && <Pill text="🔥 Hot" color="#E53935" />}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: -0.5,
                color: "var(--color-text-primary)",
              }}
            >
              {item.title}
            </h1>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "#0D1B2A",
              }}
            >
              ${item.price}
            </p>
            {item.orig && (
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "var(--color-text-tertiary)",
                  textDecoration: "line-through",
                }}
              >
                ${item.orig}
              </p>
            )}
            <p
              style={{
                margin: 0,
                fontSize: 9,
                color: "var(--color-text-tertiary)",
              }}
            >
              {item.cat === "hotels" ? "/ night" : "/ person"}
            </p>
          </div>
        </div>

        {/* Meta */}
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 11,
            color: "var(--color-text-secondary)",
          }}
        >
          📍 {item.loc}
          {item.duration && ` · ⏱ ${item.duration}`}
          {item.group && ` · 👥 ${item.group} people`}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 7,
            marginBottom: 14,
          }}
        >
          {[
            ["⭐", item.rating, "Rating"],
            ["💬", item.reviews, "Reviews"],
            ["⏱️", item.duration || "Flexible", "Duration"],
          ].map(([icon, value, label]) => (
            <div
              key={label}
              style={{
                background: "var(--color-background-secondary)",
                borderRadius: 9,
                padding: "9px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 15 }}>{icon}</p>
              <p
                style={{
                  margin: "2px 0 1px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  color: "var(--color-text-secondary)",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Includes */}
        {item.inc && (
          <>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              What's included
            </h2>
            {item.inc.map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 7,
                  padding: "5px 0",
                  borderBottom: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <span
                  style={{ color: "#00C896", fontWeight: 700, fontSize: 12 }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {i}
                </span>
              </div>
            ))}
          </>
        )}

        {/* Guarantee */}
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 9,
            padding: "9px 12px",
            margin: "14px 0",
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <span>🛡️</span>
          <p style={{ margin: 0, fontSize: 11, color: "#166534" }}>
            <strong>Wayvo Guarantee</strong> · Free cancellation 48h before ·
            Instant confirmation · Secure payment
          </p>
        </div>

        {/* Also Popular */}
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: 10,
            padding: "11px 13px",
            marginBottom: 14,
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Also popular with this experience
          </p>
          {/* Simplified - would show related items */}
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "var(--color-background-primary)",
          padding: "10px 14px 14px",
          borderTop: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onNext}
            style={{
              flex: 2,
              padding: "13px",
              borderRadius: 11,
              background: "#00C896",
              border: "none",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Book now — ${item.price} →
          </button>
          <button
            onClick={onStartChat}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: 11,
              background: "var(--color-background-secondary)",
              border: "0.5px solid var(--color-border-secondary)",
              color: "var(--color-text-secondary)",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Ask AI
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 9,
            color: "var(--color-text-tertiary)",
            margin: "6px 0 0",
          }}
        >
          Free cancellation · No hidden fees · Secure checkout
        </p>
      </div>
    </div>
  );
}

// Step 2: Guests
function GuestsStep({ item, guests, setGuests, total, onNext }) {
  const updateGuests = (key, delta) => {
    setGuests((prev) => {
      const min = key === "adults" ? 1 : 0;
      const max = 12;
      const newVal = Math.max(min, Math.min(max, prev[key] + delta));
      return { ...prev, [key]: newVal };
    });
  };

  return (
    <div style={{ padding: "18px 14px 90px" }}>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -0.5,
          margin: "0 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        How many guests?
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--color-text-secondary)",
          margin: "0 0 18px",
        }}
      >
        Prices adjust automatically
      </p>

      {[
        ["Adults", "18+ years", "adults", true],
        ["Children", "2–17 years (50% off)", "children", false],
      ].map(([label, subtitle, key, required]) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 13,
            marginBottom: 10,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              {subtitle}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <button
              onClick={() => updateGuests(key, -1)}
              aria-label={`Decrease ${label}`}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid var(--color-border-secondary)",
                background: "none",
                fontSize: 20,
                cursor: "pointer",
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                minWidth: 20,
                textAlign: "center",
              }}
            >
              {guests[key]}
            </span>
            <button
              onClick={() => updateGuests(key, 1)}
              aria-label={`Increase ${label}`}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid var(--color-border-secondary)",
                background: "none",
                fontSize: 20,
                cursor: "pointer",
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Group deal */}
      {guests.adults >= 2 && (
        <div
          style={{
            background: "#EAF3DE",
            border: "1px solid #97C459",
            borderRadius: 10,
            padding: "10px 13px",
            marginBottom: 14,
            display: "flex",
            gap: 7,
            alignItems: "center",
          }}
        >
          <span>🎉</span>
          <p style={{ margin: 0, fontSize: 11, color: "#27500A" }}>
            <strong>Group deal unlocked!</strong> 2+ adults get priority guide
            access and a free city map pack.
          </p>
        </div>
      )}

      {/* Price Breakdown */}
      <div
        style={{
          background: "var(--color-background-secondary)",
          borderRadius: 11,
          padding: "13px",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 0",
            borderBottom: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <span
            style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
          >
            Experience
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--color-text-primary)",
            }}
          >
            {item.title}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 0",
            borderBottom: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <span
            style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
          >
            Adults
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--color-text-primary)",
            }}
          >
            {guests.adults} × ${item.price} = ${item.price * guests.adults}
          </span>
        </div>
        {guests.children > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <span
              style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
            >
              Children
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {guests.children} × ${Math.round(item.price * 0.5)} = $
              {Math.round(item.price * 0.5) * guests.children}
            </span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Total
          </span>
          <span
            style={{ fontSize: 16, fontWeight: 800, color: "#0D1B2A" }}
          >
            ${total}
          </span>
        </div>
      </div>

      <button
        onClick={onNext}
        style={{
          width: "100%",
          padding: "14px",
          background: "#00C896",
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Continue to payment → ${total}
      </button>
    </div>
  );
}

// Step 3: Payment
function PaymentStep({ item, user, guests, total, onPay }) {
  return (
    <div style={{ padding: "18px 14px 90px" }}>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -0.5,
          margin: "0 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        Secure checkout
      </h1>

      <div
        style={{
          background: "#F0FDF4",
          border: "1px solid #BBF7D0",
          borderRadius: 9,
          padding: "9px 12px",
          marginBottom: 14,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <span>🔒</span>
        <p style={{ margin: 0, fontSize: 11, color: "#166534" }}>
          256-bit SSL · Powered by Stripe · PCI DSS compliant
        </p>
      </div>

      {/* Order Summary */}
      <div
        style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 12,
          padding: "14px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            paddingBottom: 10,
            borderBottom: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
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
              {guests.adults} adult{guests.adults !== 1 ? "s" : ""}
              {guests.children > 0
                ? ` · ${guests.children} child${
                    guests.children !== 1 ? "ren" : ""
                  }`
                : ""}
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 800,
              color: "#0D1B2A",
            }}
          >
            ${total}
          </p>
        </div>

        {[
          ["Card number", "1234 5678 9012 3456"],
          ["Cardholder name", user.name || "Full name"],
          ["Expiry", "MM/YY"],
          ["CVV", "•••"],
        ].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <label
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                display: "block",
                marginBottom: 5,
              }}
            >
              {label}
            </label>
            <input
              type={label === "CVV" ? "password" : "text"}
              placeholder={placeholder}
              aria-label={label}
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: 9,
                border: "1px solid var(--color-border-secondary)",
                background: "var(--color-background-secondary)",
                fontSize: 13,
                color: "var(--color-text-primary)",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onPay}
        style={{
          width: "100%",
          padding: "14px",
          background: "#0D1B2A",
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Pay ${total} securely →
      </button>
      <p
        style={{
          textAlign: "center",
          fontSize: 10,
          color: "var(--color-text-tertiary)",
          margin: "7px 0 0",
        }}
      >
        Free cancellation up to 48h before · No hidden fees
      </p>
    </div>
  );
}

// Step 4: Confirmed
function ConfirmedStep({ item, guests, total, onStartChat, onBack }) {
  const bookingRef = `WV-${Math.floor(Math.random() * 900000 + 100000)}`;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 18px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "#00C89620",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 38,
          marginBottom: 16,
        }}
      >
        ✅
      </div>

      <h1
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: "#0D1B2A",
          letterSpacing: -0.5,
          margin: "0 0 6px",
        }}
      >
        Booking confirmed!
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          margin: "0 0 6px",
        }}
      >
        A confirmation has been sent to your email
      </p>

      <div
        style={{
          background: "#00C89618",
          borderRadius: 9,
          padding: "6px 14px",
          marginBottom: 22,
        }}
      >
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#009E78" }}>
          🌟 You earned {Math.round(total * 0.1)} Wayvo Points!
        </p>
      </div>

      {/* Booking Summary */}
      <div
        style={{
          background: "var(--color-background-secondary)",
          borderRadius: 14,
          padding: "16px",
          width: "100%",
          marginBottom: 18,
        }}
      >
        {[
          ["Experience", item.title],
          ["Date", "Check confirmation email"],
          [
            "Guests",
            `${guests.adults} adult${guests.adults !== 1 ? "s" : ""}`,
          ],
          ["Total paid", `$${total}`],
          ["Reference", bookingRef],
        ].map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <span
              style={{ fontSize: 11, color: "var(--color-text-secondary)" }}
            >
              {key}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onStartChat}
        style={{
          width: "100%",
          padding: "12px",
          background: "#00C896",
          border: "none",
          borderRadius: 11,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 8,
          transition: "all 0.2s ease",
        }}
      >
        Get tips from Wayvo AI
      </button>
      <button
        onClick={onBack}
        style={{
          width: "100%",
          padding: "12px",
          background: "none",
          border: "0.5px solid var(--color-border-secondary)",
          borderRadius: 11,
          color: "var(--color-text-secondary)",
          fontSize: 12,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Back to home
      </button>
    </div>
  );
}
