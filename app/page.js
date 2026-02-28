"use client";

import { useState, useEffect } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

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
          maxWidth: "420px",
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "25px",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 0 60px rgba(0,0,0,0.8)",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: "all 0.8s ease"
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "100px",
            height: "100px",
            margin: "0 auto 20px auto",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(145deg, #ffffff33, #00000088)",
            boxShadow: "0 0 25px rgba(255,255,255,0.15)"
          }}
        >
          <img
            src="/logo.jpg"
            alt="Treasure Logic"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "22px",
            letterSpacing: "4px",
            fontWeight: 300,
            marginBottom: "6px"
          }}
        >
          TREASURE LOGIC
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "13px",
            marginBottom: "30px"
          }}
        >
          Strategic intelligence powered by Treasure David
        </p>

        {/* Messages */}
        <div
          style={{
            minHeight: "60px",
            marginBottom: "20px",
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#ddd"
          }}
        >
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}

          {loading && <p style={{ color: "#888" }}>Thinking...</p>}
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Speak with precision..."
            style={{
              flex: 1,
              padding: "12px",
              background: "#111",
              border: "1px solid #222",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "12px 16px",
              background: "#ffffff",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 500,
              transition: "0.3s"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
