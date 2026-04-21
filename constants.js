// ============================================
// CHAT SCREEN COMPONENT
// AI and human specialist chat interface
// ============================================

import React, { useState, useRef, useEffect, useCallback } from "react";
import Logo from "../ui/Logo";
import TypingIndicator from "../ui/TypingIndicator";
import { formatMarkdown } from "../../utils/helpers";
import { API_CONFIG } from "../../utils/constants";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";

export default function ChatScreen({
  mode,
  agent,
  user,
  onBack,
  onSwitchMode,
  onGoToAgents,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useScrollToBottom([messages, busy]);

  // Initialize greeting
  useEffect(() => {
    const greeting =
      mode === "agent" && agent
        ? `Hello! I'm **${agent.name}** 😊\n\nI specialise in **${agent.spec}** and I've helped over ${agent.handled.toLocaleString()} travellers explore Morocco in ${agent.exp}.\n\n${
            user.name ? "Great to meet you, " + user.name + "! " : ""
          }You're in **${user.city || "Morocco"}**. What kind of experience are you dreaming of?`
        : `Marhba${
            user.name ? " " + user.name : ""
          }! 👋 I'm **Wayvo AI** — your Morocco travel intelligence.\n\nYou're in **${
            user.city || "Morocco"
          }**${
            user.interests.length
              ? `, and I know you love ${user.interests
                  .slice(0, 2)
                  .join(" and ")}`
              : ""
          }. Ask me anything — I'll reply in your language. 🇲🇦`;

    setMessages([{ role: "assistant", content: greeting }]);
  }, [mode, agent, user]);

  const sendMessage = useCallback(
    async (text) => {
      const messageText = (text || input).trim();
      if (!messageText || busy) return;

      const userMessage = { role: "user", content: messageText };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setBusy(true);

      // Build system prompt
      const systemPrompt =
        mode === "agent" && agent
          ? `You are ${agent.name}, Wayvo senior travel specialist (${agent.spec}, ${agent.exp} experience). ${agent.bio} Tourist: ${
              user.name || "traveller"
            } from ${user.nat || "unknown"}, interests: ${
              user.interests.join(",") || "general"
            }, city: ${user.city}, budget: ${
              user.budget || "flexible"
            }. Auto-detect and respond in their language (EN/FR/AR/ES/IT/DE). Be warm, professional, expert. Suggest specific Wayvo experiences. End messages with: "${agent.name} · Wayvo Specialist"`
          : `You are Wayvo AI — Morocco's most intelligent travel companion. Tourist: ${
              user.name || "traveller"
            } from ${user.nat || "unknown"}, interests: ${
              user.interests.join(",") || "travel"
            }, city: ${user.city || "Morocco"}, budget: ${
              user.budget || "flexible"
            }. Auto-detect and respond in their language (EN/FR/AR/ES/IT/DE). Be warm, concise (max 3 paragraphs), practical. Give specific, hyperlocal Morocco recommendations. Emergency: Police 190, Ambulance 150, Tourist Police 177. Fair taxi prices: Marrakech medina → Gueliz = 20–30 MAD.`;

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
            max_tokens: API_CONFIG.MAX_TOKENS,
            system: systemPrompt,
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const reply =
          data.content?.[0]?.text || "Sorry, I didn't catch that. Try again?";

        setMessages([...newMessages, { role: "assistant", content: reply }]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              "⚡ Connection issue. Please check your API key configuration and try again.",
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [input, busy, messages, mode, agent, user]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "9px 13px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
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

        {mode === "agent" && agent ? (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: agent.col,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {agent.img}
          </div>
        ) : (
          <Logo size={30} />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
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
            {mode === "agent" && agent ? agent.name : "Wayvo AI"}
          </p>
          <p style={{ margin: 0, fontSize: 10, color: "#00C896" }}>
            {mode === "agent" && agent
              ? `${agent.spec} · ${agent.lang.join("·")}`
              : `AI · ${user.city || "Morocco"} · Auto language`}
          </p>
        </div>

        {mode === "ai" ? (
          <button
            onClick={onGoToAgents}
            style={{
              fontSize: 10,
              padding: "4px 9px",
              borderRadius: 17,
              background: "#00C89628",
              border: "1px solid #00C89645",
              color: "#00C896",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            👤 Human
          </button>
        ) : (
          <button
            onClick={() => onSwitchMode("ai")}
            style={{
              fontSize: 10,
              padding: "4px 9px",
              borderRadius: 17,
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.2)",
              color: "rgba(255,255,255,.6)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            🤖 AI
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 7,
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.role === "assistant" &&
              (mode === "agent" && agent ? (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: agent.col,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {agent.img}
                </div>
              ) : (
                <Logo size={24} />
              ))}

            <div
              style={{
                maxWidth: "78%",
                padding: "9px 12px",
                borderRadius:
                  msg.role === "user"
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                background:
                  msg.role === "user" ? "#0D1B2A" : "var(--color-background-primary)",
                border:
                  msg.role === "assistant"
                    ? "0.5px solid var(--color-border-tertiary)"
                    : "none",
                color:
                  msg.role === "user"
                    ? "#fff"
                    : "var(--color-text-primary)",
                fontSize: 12,
                lineHeight: 1.65,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {msg.role === "assistant"
                ? formatMarkdown(msg.content)
                : msg.content}
            </div>
          </div>
        ))}

        {busy && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
            {mode === "agent" && agent ? (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: agent.col,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {agent.img}
              </div>
            ) : (
              <Logo size={24} />
            )}
            <TypingIndicator
              color={mode === "agent" && agent ? agent.col : "#00C896"}
            />
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div
        style={{
          background: "var(--color-background-primary)",
          borderTop: "0.5px solid var(--color-border-tertiary)",
          padding: "8px 12px",
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Morocco…"
          aria-label="Chat message"
          style={{
            flex: 1,
            background: "var(--color-background-secondary)",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: 21,
            padding: "8px 13px",
            fontSize: 12,
            color: "var(--color-text-primary)",
            outline: "none",
            fontFamily: "var(--font-sans)",
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || busy}
          aria-label="Send message"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background:
              input.trim() && !busy
                ? "#00C896"
                : "var(--color-background-secondary)",
            border: "none",
            color:
              input.trim() && !busy ? "#fff" : "var(--color-text-tertiary)",
            fontSize: 14,
            cursor: input.trim() && !busy ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s ease",
            flexShrink: 0,
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
