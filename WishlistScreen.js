// ============================================
// STATUS BADGE COMPONENT
// ============================================

import React from "react";

const STATUS_MAP = {
  confirmed: { bg: "#DCFCE7", color: "#166534", label: "Confirmed" },
  pending: { bg: "#FEF3C7", color: "#92400E", label: "Pending" },
  completed: { bg: "#E0E7FF", color: "#3730A3", label: "Completed" },
  active: { bg: "#DCFCE7", color: "#166534", label: "Active" },
  paid: { bg: "#DCFCE7", color: "#166534", label: "Paid" },
  upcoming: { bg: "#E0E7FF", color: "#3730A3", label: "Upcoming" },
};

export default function StatusBadge({ status }) {
  const config = STATUS_MAP[status] || STATUS_MAP.completed;

  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 100,
        background: config.bg,
        color: config.color,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {config.label}
    </span>
  );
}
