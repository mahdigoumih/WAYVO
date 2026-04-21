// ============================================
// PARTNER PORTAL - For hoteliers, guides, etc.
// ============================================

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Logo from "../ui/Logo";
import StatusBadge from "../ui/StatusBadge";
import { PARTNER_TYPES, PARTNER_BOOKINGS, PARTNER_REVENUE } from "../../data/items";

export default function PartnerPortal({ onBack }) {
  const [partnerStep, setPartnerStep] = useState("intro");
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    type: "",
    email: "",
    phone: "",
  });

  const handleSubmit = () => {
    setPartnerStep("dashboard");
  };

  if (partnerStep === "intro") {
    return <PartnerIntro onBack={onBack} onStart={() => setPartnerStep("form")} />;
  }

  if (partnerStep === "form") {
    return (
      <PartnerForm
        form={partnerForm}
        setForm={setPartnerForm}
        onBack={() => setPartnerStep("intro")}
        onSubmit={handleSubmit}
      />
    );
  }

  return <PartnerDashboard onBack={() => setPartnerStep("intro")} />;
}

function PartnerIntro({ onBack, onStart }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "11px 13px 20px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={32} />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              Wayvo Partner Portal
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "rgba(255,255,255,.4)",
              }}
            >
              Grow your business with Morocco's #1 travel platform
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "13px" }}>
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            ["🌍", "50K+", "Monthly travellers"],
            ["⭐", "4.9", "Avg rating"],
            ["💰", "0%", "Commission for 6 months"],
            ["📈", "+340%", "Avg revenue growth"],
          ].map(([icon, value, label]) => (
            <div
              key={label}
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 10,
                padding: "11px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 17 }}>{icon}</p>
              <p
                style={{
                  margin: "3px 0 1px",
                  fontSize: 16,
                  fontWeight: 800,
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

        {/* Partner Types */}
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
          Who can join
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 7,
            marginBottom: 14,
          }}
        >
          {PARTNER_TYPES.map((p) => (
            <div
              key={p.id}
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 10,
                padding: "12px 8px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 22 }}>{p.icon}</p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: p.col,
                }}
              >
                {p.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}
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
          Why join Wayvo
        </p>
        {[
          "🚀 Instant booking engine with AI recommendations",
          "📊 Real-time analytics dashboard (demo below)",
          "🌍 Exposure to 50K+ monthly travellers",
          "💰 0% commission for first 6 months",
          "🛡️ Wayvo Guarantee — we handle disputes",
          "📱 Mobile-first — travellers book on the go",
        ].map((b) => (
          <div
            key={b}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              padding: "7px 0",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
            }}
          >
            <span style={{ color: "#00C896", fontSize: 12, flexShrink: 0 }}>
              ✓
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {b}
            </span>
          </div>
        ))}

        <button
          onClick={onStart}
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
            marginTop: 16,
            transition: "all 0.2s ease",
          }}
        >
          Apply to join Wayvo →
        </button>
      </div>
    </div>
  );
}

function PartnerForm({ form, setForm, onBack, onSubmit }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
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
          }}
        >
          Apply to join Wayvo
        </h1>
      </div>

      <div style={{ padding: "16px 14px" }}>
        {[
          { key: "name", label: "Business name", placeholder: "e.g. Riad Dar Anika" },
          { key: "email", label: "Email", placeholder: "hello@yourbusiness.com" },
          { key: "phone", label: "Phone", placeholder: "+212 6XX XXXXXX" },
        ].map(({ key, label, placeholder }) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: 1,
                display: "block",
                marginBottom: 5,
              }}
            >
              {label}
            </label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: "12px 13px",
                borderRadius: 10,
                border: "1px solid var(--color-border-secondary)",
                background: "var(--color-background-primary)",
                fontSize: 13,
                color: "var(--color-text-primary)",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: 1,
              display: "block",
              marginBottom: 5,
            }}
          >
            Business type
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {PARTNER_TYPES.map((p) => (
              <button
                key={p.id}
                onClick={() => setForm({ ...form, type: p.id })}
                style={{
                  padding: "10px",
                  borderRadius: 9,
                  border:
                    form.type === p.id
                      ? `2px solid ${p.col}`
                      : "0.5px solid var(--color-border-tertiary)",
                  background:
                    form.type === p.id
                      ? `${p.col}15`
                      : "var(--color-background-primary)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <p style={{ margin: 0, fontSize: 18 }}>{p.icon}</p>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 10,
                    fontWeight: form.type === p.id ? 700 : 400,
                    color: form.type === p.id ? p.col : "var(--color-text-primary)",
                  }}
                >
                  {p.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={!form.name || !form.type || !form.email}
          style={{
            width: "100%",
            padding: "14px",
            background: form.name && form.type && form.email ? "#00C896" : "var(--color-background-secondary)",
            border: "none",
            borderRadius: 12,
            color: form.name && form.type && form.email ? "#fff" : "var(--color-text-tertiary)",
            fontSize: 14,
            fontWeight: 700,
            cursor: form.name && form.type && form.email ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          Submit application →
        </button>
      </div>
    </div>
  );
}

function PartnerDashboard({ onBack }) {
  const totalRevenue = PARTNER_REVENUE.reduce((s, r) => s + r.rev, 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
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
          }}
        >
          Partner Dashboard
        </h1>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 10,
            color: "rgba(255,255,255,.4)",
          }}
        >
          Demo view — see what your dashboard will look like
        </p>
      </div>

      <div style={{ padding: "13px" }}>
        {/* Revenue Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            ["💰", `$${totalRevenue.toLocaleString()}`, "Total revenue"],
            ["📅", "12", "Active bookings"],
            ["⭐", "4.9", "Avg rating"],
            ["👥", "156", "Guests served"],
          ].map(([icon, value, label]) => (
            <div
              key={label}
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 10,
                padding: "11px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 17 }}>{icon}</p>
              <p
                style={{
                  margin: "3px 0 1px",
                  fontSize: 16,
                  fontWeight: 800,
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

        {/* Revenue Chart */}
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 12,
            padding: "13px",
            marginBottom: 14,
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
            📈 Monthly revenue
          </p>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PARTNER_REVENUE}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border-tertiary)"
                />
                <XAxis
                  dataKey="m"
                  tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }}
                  axisLine={{ stroke: "var(--color-border-tertiary)" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }}
                  axisLine={{ stroke: "var(--color-border-tertiary)" }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-background-primary)",
                    border: "0.5px solid var(--color-border-secondary)",
                    borderRadius: 8,
                    fontSize: 11,
                    color: "var(--color-text-primary)",
                  }}
                  formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Bar
                  dataKey="rev"
                  fill="#00C896"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
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
          Recent bookings
        </p>
        {PARTNER_BOOKINGS.map((b) => (
          <div
            key={b.id}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 10,
              padding: "11px",
              marginBottom: 7,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{b.flag}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {b.guest}
                </span>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              {b.svc} · {b.cin} → {b.cout}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#0D1B2A",
              }}
            >
              ${b.amt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
