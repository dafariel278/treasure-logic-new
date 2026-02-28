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
    }, 1000);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ letterSpacing: "8px", fontWeight: 300 }}>
          TREASURE LOGIC
        </h1>
        <p style={{ color: "#aaa", marginTop: "10px" }}>
          Strategic intelligence powered by Treasure David
        </p>
      </div>

      <div style={{ flex: 1 }}>
        {messages.map((msg, i) => (
          <p key={i} style={{ lineHeight: "1.8" }}>
            {msg}
          </p>
        ))}

        {loading && (
          <p style={{ color: "#888" }}>Thinking...</p>
        )}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask with intent."
        style={{
          padding: "16px",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
          marginTop: "40px",
          outline: "none"
        }}
      />
    </div>
  );
}
