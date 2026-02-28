"use client";

import { useState, useEffect, useRef } from "react";

/* ============================= */
/* ===== AI KNOWLEDGE BASE ===== */
/* ============================= */

const greetingReplies = [
  "Hello. What outcome are you trying to achieve?",
  "Hi. Define the problem clearly.",
  "Hey. What are you optimizing for?",
  "Greetings. State your objective."
];

const knowledgeBase = [
  {
    keywords: ["business", "start", "company"],
    answer:
      "Start with a defined problem and a specific audience. Validate demand before scaling. Revenue follows relevance."
  },
  {
    keywords: ["money", "wealth", "rich"],
    answer:
      "Wealth is built through ownership and leverage. Skills generate income. Assets generate scale."
  },
  {
    keywords: ["focus", "distract"],
    answer:
      "Focus improves when alternatives decrease. Reduce environmental noise before attempting mental control."
  },
  {
    keywords: ["discipline", "consistent"],
    answer:
      "Discipline strengthens when negotiation ends. Set rules. Execute regardless of mood."
  },
  {
    keywords: ["confidence"],
    answer:
      "Confidence is evidence-based. Increase competence. Track measurable progress."
  },
  {
    keywords: ["fear"],
    answer:
      "Fear usually signals uncertainty. Reduce uncertainty through preparation and clarity."
  },
  {
    keywords: ["respect"],
    answer:
      "Respect follows consistency and delivery. Speak less. Demonstrate more."
  },
  {
    keywords: ["strategy", "strategic"],
    answer:
      "Strategic thinking prioritizes positioning before action. Movement without positioning wastes energy."
  },
  {
    keywords: ["overthink"],
    answer:
      "Define decision criteria in advance. Act once thresholds are met. Refine after feedback."
  },
  {
    keywords: ["lost", "direction"],
    answer:
      "Clarity often emerges from elimination. Define what you refuse to tolerate."
  },
  {
    keywords: ["productive", "productivity"],
    answer:
      "Identify the one task that shifts your trajectory. Complete it before lower-impact work."
  },
  {
    keywords: ["motivation"],
    answer:
      "Motivation fluctuates. Systems endure. Build routines that function without emotion."
  },
  {
    keywords: ["leader", "leadership"],
    answer:
      "Leadership requires decision stability and emotional control. Volatility weakens authority."
  },
  {
    keywords: ["risk"],
    answer:
      "Quantify downside. If loss is survivable and upside asymmetric, the risk may be rational."
  },
  {
    keywords: ["time"],
    answer:
      "Audit your time allocation. If effort does not compound, restructure your schedule."
  },
  {
    keywords: ["compare", "comparison"],
    answer:
      "Comparison is useful only when it reveals strategic gaps. Otherwise, it distorts focus."
  },
  {
    keywords: ["doubt"],
    answer:
      "Doubt decreases as competence increases. Expand capability. Reduce internal uncertainty."
  },
  {
    keywords: ["procrastinate"],
    answer:
      "Break tasks into defined units. Reduce psychological weight. Begin before feeling ready."
  },
  {
    keywords: ["habit"],
    answer:
      "Attach new habits to existing routines. Lower friction. Track completion daily."
  },
  {
    keywords: ["network"],
    answer:
      "Access follows value. Increase utility before seeking connections."
  }
];

const defaultReplies = [
  "Clarify the objective before acting.",
  "Structure determines outcome.",
  "Leverage changes scale.",
  "Define constraints before deciding.",
  "Optimize long-term positioning."
];

/* ============================= */
/* ========= COMPONENT ========= */
/* ============================= */

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [count, setCount] = useState(0);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const getTime = () => {
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
  };

  const typeWriter = (text) => {
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
      }
    }, 20);
  };

  const generateReply = (userInput) => {
    const lowerInput = userInput.toLowerCase().trim();

    if (["hi", "hello", "hey"].includes(lowerInput)) {
      return greetingReplies[
        Math.floor(Math.random() * greetingReplies.length)
      ];
    }

    const found = knowledgeBase.find(item =>
      item.keywords.some(keyword =>
        lowerInput.includes(keyword)
      )
    );

    if (found) return found.answer;

    return defaultReplies[
      Math.floor(Math.random() * defaultReplies.length)
    ];
  };

  const sendMessage = () => {
    if (!input || typing) return;

    const userMsg = {
      sender: "user",
      text: input,
      time: getTime()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    const aiMsg = {
      sender: "ai",
      text: "",
      time: getTime()
    };

    setMessages(prev => [...prev, aiMsg]);

    const reply =
      count >= 5
        ? "Demo limit reached."
        : generateReply(input);

    typeWriter(reply);
    setCount(prev => prev + 1);
  };

  /* ============================= */
  /* ======== UI SECTION ========= */
  /* ============================= */

  return (
    <div className="container">
      <div className="card">

        <div className="logoWrapper">
          <div className="rotatingRing"></div>
          <div className="pulseRing"></div>
          <img src="/logo.jpg" alt="Treasure Logic" />
        </div>

        <h1>TREASURE LOGIC</h1>
        <p className="subtitle">
          Strategic intelligence powered by Treasure David
        </p>

        <div className="chatBox" ref={chatRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`bubbleWrapper ${
                msg.sender === "user" ? "right" : "left"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="avatar"></div>
              )}

              <div className={`bubble ${msg.sender}`}>
                {msg.text}
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="bubbleWrapper left">
              <div className="avatar"></div>
              <div className="bubble ai thinking">...</div>
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

      {/* ===== STYLES (UNCHANGED) ===== */}
      <style jsx global>{`
        body { margin:0; }

        .container {
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .card {
          width:100%;
          max-width:520px;
          background:rgba(0,0,0,0.92);
          backdrop-filter:blur(30px);
          border-radius:30px;
          padding:35px;
          box-shadow:0 0 120px rgba(0,0,0,0.9);
          animation:float 6s ease-in-out infinite;
        }

        .logoWrapper {
          width:100px;
          height:100px;
          margin:0 auto 20px auto;
          position:relative;
          border-radius:50%;
          cursor:pointer;
          transition:0.5s;
        }

        .logoWrapper img {
          width:100%;
          height:100%;
          border-radius:50%;
          object-fit:cover;
          position:relative;
          z-index:2;
        }

        .pulseRing {
          position:absolute;
          width:100%;
          height:100%;
          border-radius:50%;
          border:2px solid rgba(255,255,255,0.3);
          animation:pulse 3s infinite;
        }

        .rotatingRing {
          position:absolute;
          width:120%;
          height:120%;
          top:-10%;
          left:-10%;
          border-radius:50%;
          border:1px solid rgba(255,255,255,0.15);
          animation:rotate 6s linear infinite;
        }

        .logoWrapper:hover {
          transform:scale(1.2);
          box-shadow:0 0 80px rgba(255,255,255,0.6);
        }

        h1 {
          text-align:center;
          letter-spacing:4px;
          font-weight:300;
          font-size:24px;
          margin-bottom:5px;
        }

        .subtitle {
          text-align:center;
          color:#aaa;
          font-size:14px;
          margin-bottom:20px;
        }

        .chatBox {
          max-height:260px;
          overflow-y:auto;
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-bottom:15px;
        }

        .bubbleWrapper {
          display:flex;
          align-items:flex-end;
          gap:8px;
          animation:fadeIn 0.4s ease;
        }

        .bubbleWrapper.right {
          justify-content:flex-end;
        }

        .avatar {
          width:28px;
          height:28px;
          border-radius:50%;
          background:url('/logo.jpg');
          background-size:cover;
        }

        .bubble {
          padding:10px 14px;
          border-radius:18px;
          max-width:75%;
          font-size:15px;
          position:relative;
        }

        .bubble.user {
          background:#fff;
          color:#000;
        }

        .bubble.ai {
          background:#1a1a1a;
          color:#fff;
        }

        .bubble .time {
          display:block;
          font-size:10px;
          opacity:0.5;
          margin-top:4px;
        }

        .thinking { opacity:0.6; }

        .inputArea {
          display:flex;
          gap:10px;
        }

        .inputArea input {
          flex:1;
          padding:12px;
          background:#0f0f0f;
          border:1px solid #1c1c1c;
          border-radius:14px;
          color:#fff;
          font-size:15px;
        }

        .inputArea button {
          padding:12px 16px;
          border:none;
          border-radius:14px;
          background:#fff;
          font-weight:600;
          cursor:pointer;
          transition:0.3s;
        }

        .inputArea button:hover {
          transform:translateY(-2px);
        }

        @keyframes pulse {
          0% {transform:scale(1);opacity:0.6;}
          50% {transform:scale(1.15);opacity:0.2;}
          100% {transform:scale(1);opacity:0.6;}
        }

        @keyframes rotate {
          from {transform:rotate(0deg);}
          to {transform:rotate(360deg);}
        }

        @keyframes fadeIn {
          from {opacity:0; transform:translateY(8px);}
          to {opacity:1; transform:translateY(0);}
        }

        @keyframes float {
          0% {transform:translateY(0px);}
          50% {transform:translateY(-6px);}
          100% {transform:translateY(0px);}
        }
      `}</style>
    </div>
  );
}
