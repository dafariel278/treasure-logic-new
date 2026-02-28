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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sendMessage = () => {
    if (!input || loading) return;

    if (count >= 5) {
      setMessages(prev => [...prev, "Treasure Logic: Demo limit reached."]);
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
      className="container"
      style={{
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.08), transparent 40%)
        `
      }}
    >
      <div className={`card ${visible ? "visible" : ""}`}>

        <div className="logoWrapper">
          <div className="pulseRing" />
          <img src="/logo.jpg" alt="Treasure Logic" />
        </div>

        <h1>TREASURE LOGIC</h1>
        <p className="subtitle">
          Strategic intelligence powered by Treasure David
        </p>

        <div className="messages">
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
          {loading && <p className="thinking">Thinking...</p>}
        </div>

        <div className="inputArea">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Speak with precision..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          transition: background 0.2s ease;
        }

        .card {
          width: 100%;
          max-width: 460px;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: clamp(28px, 6vw, 45px);
          text-align: center;
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.9);
          opacity: 0;
          transform: scale(0.96);
          transition: all 0.8s ease;
          animation: float 6s ease-in-out infinite;
        }

        .card.visible {
          opacity: 1;
          transform: scale(1);
        }

        .logoWrapper {
          width: clamp(90px, 25vw, 110px);
          height: clamp(90px, 25vw, 110px);
          margin: 0 auto 20px auto;
          border-radius: 50%;
          position: relative;
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .logoWrapper img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .pulseRing {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.25);
          animation: pulse 3s infinite;
        }

        .logoWrapper:hover {
          transform: scale(1.12);
          box-shadow: 0 0 60px rgba(255, 255, 255, 0.5);
        }

        h1 {
          font-size: clamp(24px, 6vw, 28px);
          letter-spacing: 4px;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #aaa;
          font-size: clamp(14px, 3.5vw, 15px);
          margin-bottom: 28px;
        }

        .messages {
          min-height: 70px;
          margin-bottom: 24px;
          font-size: clamp(15px, 4vw, 16px);
          line-height: 1.7;
          color: #ddd;
        }

        .messages p {
          margin-bottom: 10px;
        }

        .thinking {
          color: #888;
        }

        .inputArea {
          display: flex;
          gap: 10px;
        }

        .inputArea input {
          flex: 1;
          padding: 14px;
          background: #0f0f0f;
          border: 1px solid #1c1c1c;
          border-radius: 14px;
          color: #fff;
          font-size: 16px;
          outline: none;
        }

        .inputArea button {
          padding: 14px 18px;
          background: #ffffff;
          color: #000;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .inputArea button:hover {
          transform: translateY(-2px);
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
