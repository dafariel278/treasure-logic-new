"use client";

import { useState } from "react";

const responses = [
  "Clarity precedes control.",
  "Structure defines power.",
  "Leverage is silent strength.",
  "Remove noise. Keep direction.",
  "Discipline is engineered, not felt.",
  "Most move fast. Few move precise."
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input || loading) return;

    if (count >= 5) {
      setMessages(prev => [
        ...prev,
        "Treasure Logic: Demo limit reached."
      ]);
      return;
    }

    const userMsg = input;
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [
        ...prev,
        `You: ${userMsg}`,
        `Treasure Logic: ${reply}`
      ]);

      setCount(prev => prev + 1);
      setLoading(false);
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          padding: "50px 40px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              letterSpacing: "6px",
              fontWeight: 300,
              fontSize: "22px"
            }}
          >
            TREASURE LOGIC
          </h1>
          <p
            style={{
              color: "#aaa",
              fontSize: "13px",
              marginTop: "8px"
            }}
          >
            Strategic intelligence powered by Treasure David
          </p>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, marginBottom: "30px" }}>
          {messages.map((msg, i) => (
            <p
              key={i}
              style={{
                lineHeight: "1.7",
                marginBottom: "14px",
                fontSize: "14px"
              }}
            >
              {msg}
            </p>
          ))}

          {loading && (
            <p style={{ color: "#888", fontSize: "14px" }}>
              Thinking...
            </p>
          )}
        </div>

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask with intent."
          style={{
            padding: "14px 16px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "14px",
            outline: "none"
          }}
        />
      </div>
    </div>
  );
}
