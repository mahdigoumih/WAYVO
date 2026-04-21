// ============================================
// SEARCH TAB COMPONENT
// With debounced search and filtering
// ============================================

import React, { useState, useMemo } from "react";
import SearchBar from "../ui/SearchBar";
import Card from "../ui/Card";
import Pill from "../ui/Pill";
import { ITEMS, CATEGORIES, CITIES, TRENDING_SEARCHES, SORT_OPTIONS } from "../../data/items";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchTab({
  wished,
  onToggleWish,
  onOpenItem,
}) {
  const [query, setQuery] = useState("");
  const [fCat, setFCat] = useState("all");
  const [fCity, setFCity] = useState("All cities");
  const [fPrice, setFPrice] = useState(600);
  const [fSort, setFSort] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query for performance
  const debouncedQuery = useDebounce(query, 200);

  // Filter and sort items
  const filtered = useMemo(() => {
    const sq = debouncedQuery.toLowerCase();
    let results = ITEMS.filter((it) => {
      const matchesSearch =
        !sq ||
        [it.title, it.loc, it.city, ...it.tags].some((x) =>
          x.toLowerCase().includes(sq)
        );
      const matchesCategory = fCat === "all" || it.cat === fCat;
      const matchesCity = fCity === "All cities" || it.city === fCity;
      const matchesPrice = it.price <= fPrice;
      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    });

    // Sort
    switch (fSort) {
      case "Price: low to high":
        results.sort((a, b) => a.price - b.price);
        break;
      case "Price: high to low":
        results.sort((a, b) => b.price - a.price);
        break;
      case "Highest rated":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "Most popular":
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return results;
  }, [debouncedQuery, fCat, fCity, fPrice, fSort]);

  const clearAll = () => {
    setQuery("");
    setFCat("all");
    setFCity("All cities");
    setFPrice(600);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Search Header */}
      <div
        style={{
          background: "var(--color-background-primary)",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          padding: "10px 13px",
          flexShrink: 0,
        }}
      >
        <div style={{ marginBottom: 9 }}>
          <SearchBar
            query={query}
            onChange={setQuery}
            inPage
            placeholder="Search hotels, tours, food, transport…"
          />
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: 5,
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: 2,
            marginBottom: 6,
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFCat(c.id)}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 11px",
                borderRadius: 18,
                fontSize: 11,
                fontWeight: fCat === c.id ? 700 : 400,
                border:
                  fCat === c.id
                    ? "1.5px solid #0D1B2A"
                    : "0.5px solid var(--color-border-secondary)",
                background: fCat === c.id ? "#0D1B2A" : "var(--color-background-primary)",
                color: fCat === c.id ? "#fff" : "var(--color-text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: 13 }}>{c.icon}</span>
              {c.label}
            </button>
          ))}

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              flexShrink: 0,
              padding: "5px 11px",
              borderRadius: 18,
              fontSize: 11,
              fontWeight: 600,
              border: showFilters
                ? "1.5px solid #00C896"
                : "0.5px solid var(--color-border-secondary)",
              background: showFilters
                ? "#00C89615"
                : "var(--color-background-primary)",
              color: showFilters ? "#009E78" : "var(--color-text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ⚙️ Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div
            style={{
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 10,
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <select
                value={fCity}
                onChange={(e) => setFCity(e.target.value)}
                aria-label="Filter by city"
                style={{
                  flex: 1,
                  padding: "7px 9px",
                  borderRadius: 7,
                  border: "0.5px solid var(--color-border-secondary)",
                  background: "var(--color-background-secondary)",
                  fontSize: 11,
                  color: "var(--color-text-primary)",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {["All cities", ...CITIES].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={fSort}
                onChange={(e) => setFSort(e.target.value)}
                aria-label="Sort results"
                style={{
                  flex: 1,
                  padding: "7px 9px",
                  borderRadius: 7,
                  border: "0.5px solid var(--color-border-secondary)",
                  background: "var(--color-background-secondary)",
                  fontSize: 11,
                  color: "var(--color-text-primary)",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span
                style={{ fontSize: 10, color: "var(--color-text-secondary)" }}
              >
                Max price / person
              </span>
              <span
                style={{ fontSize: 10, fontWeight: 700, color: "#0D1B2A" }}
              >
                ${fPrice}
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={600}
              step={10}
              value={fPrice}
              onChange={(e) => setFPrice(Number(e.target.value))}
              aria-label="Maximum price filter"
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 13px 80px",
        }}
      >
        {/* Trending (only when no query) */}
        {!query && (
          <div style={{ marginBottom: 14 }}>
            <h2
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              🔥 Trending in Morocco
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {TRENDING_SEARCHES.map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  style={{
                    padding: "6px 11px",
                    borderRadius: 18,
                    background: "var(--color-background-primary)",
                    border: "0.5px solid var(--color-border-secondary)",
                    fontSize: 11,
                    color: "var(--color-text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  🔍 {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {query && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {filtered.length} results for "
              <span style={{ color: "#00C896" }}>{query}</span>"
            </p>
            <button
              onClick={clearAll}
              style={{
                fontSize: 10,
                color: "#E53935",
                fontWeight: 600,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        )}

        {!query && (
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 12,
              color: "var(--color-text-secondary)",
            }}
          >
            {filtered.length} experiences available
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "36px 20px",
            }}
          >
            <p style={{ fontSize: 36, margin: "0 0 9px" }}>🔍</p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 5px",
              }}
            >
              No results
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--color-text-secondary)",
                margin: "0 0 14px",
              }}
            >
              Try adjusting your filters
            </p>
            <button
              onClick={clearAll}
              style={{
                padding: "9px 18px",
                borderRadius: 9,
                background: "#00C896",
                border: "none",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Reset all
            </button>
          </div>
        ) : (
          /* Results list */
          filtered.map((it) => (
            <Card
              key={it.id}
              item={it}
              wished={wished.has(it.id)}
              onWish={onToggleWish}
              onOpen={onOpenItem}
              compact
            />
          ))
        )}
      </div>
    </div>
  );
}
