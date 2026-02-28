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
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const typeWriter = (text, callback) => {
    let index = 0;
    let current = "";
    setTyping(true);

    const interval = setInterval(() => {
      current += text[index];
      index++;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });

      if (index >= text.length) {
        clearInterval(interval);
        setTyping(false);
        if (callback) callback();
      }
    }, 25);
  };

  const sendMessage = () => {
    if (!input || typing) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);

    setInput("");

    if (count >= 5) {
      const limitMsg = {
        sender: "ai",
        text: ""
      };

      setMessages(prev => [...prev, limitMsg]);
      typeWriter("Demo limit reached.", null);
      return;
    }

    const reply =
      responses[Math.floor(Math.random() * responses.length)];

    const aiMessage = {
      sender: "ai",
      text: ""
    };

    setMessages(prev => [...prev, aiMessage]);

    typeWriter(reply);

    setCount(prev => prev + 1);
  };

  return (
    <div className="container">
      <div className={`card ${visible ? "visible" : ""}`}>
        <div className="logoWrapper">
          <div className="pulseRing" />
          <img src="/logo.jpg" alt="Treasure Logic" />
        </div>

        <h1>TREASURE LOGIC</h1>
        <p className="subtitle">
          Strategic intelligence powered by Treasure David
        </p>

        <div className="chatBox">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === "user"
                  ? "bubble userBubble"
                  : "bubble aiBubble"
              }
            >
              {msg.text}
            </div>
          ))}

          {typing && (
            <div className="bubble aiBubble thinkingBubble">
              ...
            </div>
          )}
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
        }

        .card {
          width: 100%;
          max-width: 480px;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.9);
          opacity: 0;
          transform: scale(0.96);
          transition: all 0.8s ease;
        }

        .card.visible {
          opacity: 1;
          transform: scale(1);
        }

        .logoWrapper {
          width: 90px;
          height: 90px;
          margin: 0 auto 20px auto;
          border-radius: 50%;
          position: relative;
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

        h1 {
          font-size: 24px;
          letter-spacing: 4px;
          font-weight: 300;
          margin-bottom: 6px;
        }

        .subtitle {
          color: #aaa;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .chatBox {
          min-height: 120px;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bubble {
          padding: 10px 14px;
          border-radius: 16px;
          max-width: 75%;
          font-size: 15px;
          line-height: 1.5;
        }

        .userBubble {
          align-self: flex-end;
          background: #ffffff;
          color: #000;
        }

        .aiBubble {
          align-self: flex-start;
          background: #1a1a1a;
          color: #fff;
        }

        .thinkingBubble {
          opacity: 0.6;
        }

        .inputArea {
          display: flex;
          gap: 10px;
        }

        .inputArea input {
          flex: 1;
          padding: 12px;
          background: #0f0f0f;
          border: 1px solid #1c1c1c;
          border-radius: 14px;
          color: #fff;
          font-size: 16px;
          outline: none;
        }

        .inputArea button {
          padding: 12px 16px;
          background: #ffffff;
          color: #000;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
