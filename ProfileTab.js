// ============================================
// ONBOARDING SCREEN
// Multi-step user onboarding flow
// ============================================

import React, { useState } from "react";
import Logo from "../ui/Logo";
import { INTERESTS, BUDGETS, CITIES, NATIONALITIES } from "../../data/items";
import { POINTS } from "../../utils/constants";

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    name: "",
    nat: "",
    interests: [],
    city: "Marrakech",
    budget: "",
  });

  const toggleInterest = (id) => {
    setUser((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((x) => x !== id)
        : [...prev.interests, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return user.name.trim().length > 0;
      case 2:
        return user.interests.length > 0;
      case 3:
        return user.budget !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    onComplete({ ...user, points: POINTS.SIGNUP_BONUS });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background-tertiary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Progress Header */}
      <div
        style={{
          padding: "14px 18px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        {step > 1 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            aria-label="Go back"
            style={{
              background: "none",
              border: "none",
              fontSize: 17,
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              padding: 0,
            }}
          >
            ←
          </button>
        )}
        <div
          style={{
            flex: 1,
            height: 4,
            background: "var(--color-background-secondary)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(step / 4) * 100}%`,
              background: "#00C896",
              borderRadius: 4,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-tertiary)",
            fontWeight: 600,
          }}
        >
          {step}/4
        </span>
      </div>

      {/* Step Content */}
      <div style={{ padding: "18px 18px 40px" }}>
        {step === 1 && (
          <Step1Profile
            user={user}
            onUpdate={setUser}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2Interests
            user={user}
            onToggle={toggleInterest}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3Budget
            user={user}
            onUpdate={setUser}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <Step4City user={user} onUpdate={setUser} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}

// Step 1: Profile
function Step1Profile({ user, onUpdate, onNext }) {
  return (
    <>
      <Logo size={40} />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: -1,
          margin: "12px 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        Welcome to Wayvo 🇲🇦
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          margin: "0 0 20px",
          lineHeight: 1.6,
        }}
      >
        Morocco's premium AI travel companion. Personalised for you from the
        first second.
      </p>

      <label
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 1,
          display: "block",
          marginBottom: 6,
        }}
      >
        Your first name
      </label>
      <input
        value={user.name}
        onChange={(e) => onUpdate({ ...user, name: e.target.value })}
        placeholder="e.g. Sophie"
        autoFocus
        style={{
          width: "100%",
          padding: "13px 14px",
          borderRadius: 11,
          border: "1px solid var(--color-border-secondary)",
          background: "var(--color-background-primary)",
          fontSize: 14,
          color: "var(--color-text-primary)",
          outline: "none",
          fontFamily: "var(--font-sans)",
          marginBottom: 12,
        }}
      />

      <label
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 1,
          display: "block",
          marginBottom: 6,
        }}
      >
        Nationality
      </label>
      <select
        value={user.nat}
        onChange={(e) => onUpdate({ ...user, nat: e.target.value })}
        style={{
          width: "100%",
          padding: "13px 14px",
          borderRadius: 11,
          border: "1px solid var(--color-border-secondary)",
          background: "var(--color-background-primary)",
          fontSize: 13,
          color: user.nat
            ? "var(--color-text-primary)"
            : "var(--color-text-tertiary)",
          outline: "none",
          fontFamily: "var(--font-sans)",
          marginBottom: 20,
        }}
      >
        <option value="">Select your country</option>
        {NATIONALITIES.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <button
        onClick={onNext}
        disabled={!user.name.trim()}
        style={{
          width: "100%",
          padding: "13px",
          background: user.name.trim()
            ? "#00C896"
            : "var(--color-background-secondary)",
          border: "none",
          borderRadius: 12,
          color: user.name.trim() ? "#fff" : "var(--color-text-tertiary)",
          fontSize: 14,
          fontWeight: 700,
          cursor: user.name.trim() ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}
      >
        Continue →
      </button>

      <button
        onClick={onNext}
        style={{
          width: "100%",
          padding: "10px",
          background: "none",
          border: "none",
          color: "var(--color-text-tertiary)",
          fontSize: 11,
          cursor: "pointer",
          marginTop: 5,
        }}
      >
        Skip for now
      </button>
    </>
  );
}

// Step 2: Interests
function Step2Interests({ user, onToggle, onNext }) {
  return (
    <>
      <h1
        style={{
          fontSize: 23,
          fontWeight: 900,
          letterSpacing: -1,
          margin: "0 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        Your travel style{user.name ? `, ${user.name}` : ""}? ✈️
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        Pick everything that applies — we use this to personalise everything
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {INTERESTS.map((it) => {
          const selected = user.interests.includes(it.id);
          return (
            <button
              key={it.id}
              onClick={() => onToggle(it.id)}
              style={{
                padding: "13px 8px",
                borderRadius: 12,
                border: selected
                  ? "2px solid #00C896"
                  : "1px solid var(--color-border-tertiary)",
                background: selected ? "#00C89614" : "var(--color-background-primary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: 20 }}>{it.icon}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: selected ? 700 : 400,
                  color: selected ? "#009E78" : "var(--color-text-primary)",
                }}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={user.interests.length === 0}
        style={{
          width: "100%",
          padding: "13px",
          background: user.interests.length
            ? "#00C896"
            : "var(--color-background-secondary)",
          border: "none",
          borderRadius: 12,
          color: user.interests.length ? "#fff" : "var(--color-text-tertiary)",
          fontSize: 14,
          fontWeight: 700,
          cursor: user.interests.length ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}
      >
        Continue ({user.interests.length} selected) →
      </button>
    </>
  );
}

// Step 3: Budget
function Step3Budget({ user, onUpdate, onNext }) {
  return (
    <>
      <h1
        style={{
          fontSize: 23,
          fontWeight: 900,
          letterSpacing: -1,
          margin: "0 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        Your trip budget? 💰
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          margin: "0 0 18px",
        }}
      >
        Per person, not including flights
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 22,
        }}
      >
        {BUDGETS.map((b) => (
          <button
            key={b}
            onClick={() => onUpdate({ ...user, budget: b })}
            style={{
              padding: "13px 16px",
              borderRadius: 12,
              border:
                user.budget === b
                  ? "2px solid #00C896"
                  : "1px solid var(--color-border-tertiary)",
              background:
                user.budget === b
                  ? "#00C89614"
                  : "var(--color-background-primary)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: user.budget === b ? 700 : 400,
                color: "var(--color-text-primary)",
              }}
            >
              {b}
            </span>
            {user.budget === b && (
              <span style={{ color: "#00C896", fontSize: 14 }}>✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!user.budget}
        style={{
          width: "100%",
          padding: "13px",
          background: user.budget
            ? "#00C896"
            : "var(--color-background-secondary)",
          border: "none",
          borderRadius: 12,
          color: user.budget ? "#fff" : "var(--color-text-tertiary)",
          fontSize: 14,
          fontWeight: 700,
          cursor: user.budget ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}
      >
        Continue →
      </button>
    </>
  );
}

// Step 4: City & Complete
function Step4City({ user, onUpdate, onComplete }) {
  return (
    <>
      <h1
        style={{
          fontSize: 23,
          fontWeight: 900,
          letterSpacing: -1,
          margin: "0 0 4px",
          color: "var(--color-text-primary)",
        }}
      >
        First stop in Morocco? 📍
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "var(--color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        Where does your adventure begin?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 7,
          marginBottom: 16,
        }}
      >
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => onUpdate({ ...user, city: c })}
            style={{
              padding: "12px 9px",
              borderRadius: 10,
              border:
                user.city === c
                  ? "2px solid #00C896"
                  : "1px solid var(--color-border-tertiary)",
              background:
                user.city === c
                  ? "#00C89614"
                  : "var(--color-background-primary)",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: user.city === c ? 700 : 400,
                color: "var(--color-text-primary)",
              }}
            >
              {c}
            </p>
          </button>
        ))}
      </div>

      {/* Profile Summary */}
      <div
        style={{
          background: "var(--color-background-secondary)",
          borderRadius: 11,
          padding: "12px",
          marginBottom: 18,
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            fontSize: 10,
            fontWeight: 700,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Your profile
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--color-text-primary)",
            lineHeight: 2,
          }}
        >
          👤 <strong>{user.name}</strong>
          {user.nat ? ` · ${user.nat}` : ""}
          <br />
          🎯{" "}
          {user.interests
            .slice(0, 5)
            .map((id) => INTERESTS.find((x) => x.id === id)?.icon)
            .join(" ")}
          <br />
          💰 Budget: <strong>{user.budget}</strong>
          <br />
          📍 <strong>{user.city}</strong>
        </p>
      </div>

      <button
        onClick={onComplete}
        style={{
          width: "100%",
          padding: "15px",
          background: "#00C896",
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Let's explore Morocco! 🚀
      </button>
    </>
  );
}
