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
    setTimeout(() => setVisible(true), 200);
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
    }, 1200);
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
          maxWidth: "440px",
          padding: "2px",
          borderRadius: "30px",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.6))",
          animation: "borderGlow 6s infinite linear"
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: "28px",
            padding: "45px",
            textAlign: "center",
            boxShadow: "0 0 80px rgba(0,0,0,0.9)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.8s ease"
          }}
        >
          {/* Logo with Pulse */}
          <div
            style={{
              width: "110px",
              height: "110px",
              margin: "0 auto 20px auto",
              borderRadius: "50%",
              position: "relative"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)",
                animation: "pulse 3s infinite"
              }}
            />
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
              letterSpacing: "5px",
              fontWeight: 300,
              marginBottom: "8px"
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
              minHeight: "70px",
              marginBottom: "25px",
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#ddd"
            }}
          >
            {messages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}

            {loading && (
              <p style={{ color: "#888" }}>
                Thinking<span className="dots">...</span>
              </p>
            )}
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
                padding: "13px",
                background: "#0f0f0f",
                border: "1px solid #1c1c1c",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "14px",
                outline: "none"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "13px 18px",
                background: "#ffffff",
                color: "#000",
                border: "none",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "0.3s"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.7; }
        }

        @keyframes borderGlow {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}
