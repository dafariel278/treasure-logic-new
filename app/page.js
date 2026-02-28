"use client";

import { useState, useEffect, useRef } from "react";

/* ============================= */
/* ===== TREASURE LOGIC AI ===== */
/* ============================= */

const greetingReplies = [
`Hello.

I am Treasure Logic — a strategic intelligence system built on clarity, leverage, and structural thinking.

I do not operate on impulse. I operate on precision.

Tell me your objective. I will respond with structure.`,

`Hi.

Treasure Logic online.

I analyze positioning, discipline, and long-term outcomes. My responses are optimized for clarity, not comfort.

What can I help you solve today?`,

`Hey.

You are speaking with Treasure Logic — engineered to remove noise and sharpen direction.

Define the problem. I will assist.`,

`Greetings.

Clarity precedes control.

State your objective clearly, and I will help you design the optimal approach.`
];

const knowledgeBase = [
{
keywords:["business","start","company","entrepreneur"],
answer:
`To start a business properly:

1. Identify a painful problem.
2. Validate demand before building.
3. Focus on distribution early.
4. Optimize for recurring value.

Revenue follows relevance.`
},
{
keywords:["wealth","money","rich","financial"],
answer:
`Wealth is built through ownership and leverage.

Skills create income.
Assets create scale.
Systems create freedom.

Focus on long-term compounding.`
},
{
keywords:["focus","distract"],
answer:
`Focus is not mental strength — it is environmental design.

Remove distractions first.
Reduce decision fatigue.
Prioritize one high-impact task daily.`
},
{
keywords:["discipline","consistent"],
answer:
`Discipline increases when negotiation ends.

Create rules.
Reduce choices.
Execute regardless of emotion.`
},
{
keywords:["confidence"],
answer:
`Confidence grows from evidence.

Increase competence.
Track measurable progress.
Reduce uncertainty through preparation.`
},
{
keywords:["fear","afraid"],
answer:
`Fear often signals uncertainty.

Define worst-case scenarios.
Prepare mitigation.
Act with calculated exposure.`
},
{
keywords:["productivity","productive"],
answer:
`Productivity is not activity.

Identify the task that changes trajectory.
Complete it before reactive work.`
},
{
keywords:["lead","leader","leadership"],
answer:
`Leadership requires stability.

Control emotion.
Make clear decisions.
Communicate direction without volatility.`
},
{
keywords:["motivation"],
answer:
`Motivation fluctuates.

Systems endure.

Build routines that operate without emotion.`
},
{
keywords:["time"],
answer:
`Audit your time allocation.

If effort does not compound, restructure your schedule.`
},
{
keywords:["overthink"],
answer:
`Overthinking occurs when decision criteria are undefined.

Set criteria first.
Decide once thresholds are met.
Refine through feedback.`
},
{
keywords:["lost","direction","confused"],
answer:
`If you feel lost:

Remove noise.
Define what you refuse to tolerate.
Clarify one measurable objective.`
},
{
keywords:["network","connections"],
answer:
`Access follows value.

Increase utility before seeking connections.
Influence is earned, not requested.`
},
{
keywords:["stress","anxiety"],
answer:
`Stress increases when control decreases.

Regain control by:
• Breaking problems into smaller units
• Defining actionable steps
• Eliminating vague thinking`
}
];

const fallbackReplies = [
`Clarify your objective further.`,
`Structure determines outcome.`,
`Define constraints before deciding.`,
`Optimize long-term positioning.`,
`Break the problem into measurable parts.`
];

/* ============================= */
/* ========= COMPONENT ========= */
/* ============================= */

export default function Home() {

const [messages,setMessages]=useState([]);
const [input,setInput]=useState("");
const [typing,setTyping]=useState(false);
const chatRef=useRef(null);

useEffect(()=>{
if(chatRef.current){
chatRef.current.scrollTop=chatRef.current.scrollHeight;
}
},[messages,typing]);

const getTime=()=>{
const now=new Date();
return now.getHours()+":"+now.getMinutes().toString().padStart(2,"0");
};

const typeWriter=(text)=>{
let index=0;
let current="";
setTyping(true);

const interval=setInterval(()=>{
current+=text[index];
index++;

setMessages(prev=>{
const updated=[...prev];
updated[updated.length-1].text=current;
return updated;
});

if(index>=text.length){
clearInterval(interval);
setTyping(false);
}
},18);
};

const generateReply=(userInput)=>{
const lower=userInput.toLowerCase().trim();

if(["hi","hello","hey","greetings"].includes(lower)){
return greetingReplies[Math.floor(Math.random()*greetingReplies.length)];
}

const found=knowledgeBase.find(item=>
item.keywords.some(k=>lower.includes(k))
);

if(found) return found.answer;

return fallbackReplies[Math.floor(Math.random()*fallbackReplies.length)];
};

const sendMessage=()=>{
if(!input||typing) return;

const userMsg={
sender:"user",
text:input,
time:getTime()
};

setMessages(prev=>[...prev,userMsg]);
setInput("");

const aiMsg={
sender:"ai",
text:"",
time:getTime()
};

setMessages(prev=>[...prev,aiMsg]);

const reply=generateReply(input);
typeWriter(reply);
};

/* ============================= */
/* ======== UI (UNCHANGED) ===== */
/* ============================= */

return(
<div className="container">
<div className="card">

<div className="logoWrapper">
<div className="rotatingRing"></div>
<div className="pulseRing"></div>
<img src="/logo.jpg" alt="Treasure Logic"/>
</div>

<h1>TREASURE LOGIC</h1>
<p className="subtitle">
Strategic intelligence powered by Treasure David
</p>

<div className="chatBox" ref={chatRef}>
{messages.map((msg,i)=>(
<div key={i} className={`bubbleWrapper ${msg.sender==="user"?"right":"left"}`}>
{msg.sender==="ai"&&<div className="avatar"></div>}
<div className={`bubble ${msg.sender}`}>
{msg.text}
<span className="time">{msg.time}</span>
</div>
</div>
))}

{typing&&(
<div className="bubbleWrapper left">
<div className="avatar"></div>
<div className="bubble ai thinking">...</div>
</div>
)}
</div>

<div className="inputArea">
<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>e.key==="Enter"&&sendMessage()}
placeholder="Speak with precision..."
/>
<button onClick={sendMessage}>Send</button>
</div>

</div>

<style jsx global>{`
/* STYLES UNCHANGED — SAME AS YOUR VERSION */
body { margin:0; }
.container { min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; }
.card { width:100%; max-width:520px; background:rgba(0,0,0,0.92); backdrop-filter:blur(30px); border-radius:30px; padding:35px; box-shadow:0 0 120px rgba(0,0,0,0.9); animation:float 6s ease-in-out infinite; }
.logoWrapper { width:100px; height:100px; margin:0 auto 20px auto; position:relative; border-radius:50%; cursor:pointer; transition:0.5s; }
.logoWrapper img { width:100%; height:100%; border-radius:50%; object-fit:cover; position:relative; z-index:2; }
.pulseRing { position:absolute; width:100%; height:100%; border-radius:50%; border:2px solid rgba(255,255,255,0.3); animation:pulse 3s infinite; }
.rotatingRing { position:absolute; width:120%; height:120%; top:-10%; left:-10%; border-radius:50%; border:1px solid rgba(255,255,255,0.15); animation:rotate 6s linear infinite; }
.logoWrapper:hover { transform:scale(1.2); box-shadow:0 0 80px rgba(255,255,255,0.6); }
h1 { text-align:center; letter-spacing:4px; font-weight:300; font-size:24px; margin-bottom:5px; }
.subtitle { text-align:center; color:#aaa; font-size:14px; margin-bottom:20px; }
.chatBox { max-height:260px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; margin-bottom:15px; }
.bubbleWrapper { display:flex; align-items:flex-end; gap:8px; animation:fadeIn 0.4s ease; }
.bubbleWrapper.right { justify-content:flex-end; }
.avatar { width:28px; height:28px; border-radius:50%; background:url('/logo.jpg'); background-size:cover; }
.bubble { padding:10px 14px; border-radius:18px; max-width:75%; font-size:15px; position:relative; }
.bubble.user { background:#fff; color:#000; }
.bubble.ai { background:#1a1a1a; color:#fff; }
.bubble .time { display:block; font-size:10px; opacity:0.5; margin-top:4px; }
.thinking { opacity:0.6; }
.inputArea { display:flex; gap:10px; }
.inputArea input { flex:1; padding:12px; background:#0f0f0f; border:1px solid #1c1c1c; border-radius:14px; color:#fff; font-size:15px; }
.inputArea button { padding:12px 16px; border:none; border-radius:14px; background:#fff; font-weight:600; cursor:pointer; transition:0.3s; }
.inputArea button:hover { transform:translateY(-2px); }
@keyframes pulse { 0% {transform:scale(1);opacity:0.6;} 50% {transform:scale(1.15);opacity:0.2;} 100% {transform:scale(1);opacity:0.6;} }
@keyframes rotate { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }
@keyframes fadeIn { from {opacity:0; transform:translateY(8px);} to {opacity:1; transform:translateY(0);} }
@keyframes float { 0% {transform:translateY(0px);} 50% {transform:translateY(-6px);} 100% {transform:translateY(0px);} }
`}</style>

</div>
);
}
