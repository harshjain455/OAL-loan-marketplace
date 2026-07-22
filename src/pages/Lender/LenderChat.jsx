import React, { useState } from "react";
import { Send } from "lucide-react";

export default function LenderChat() {
  const [messages, setMessages] = useState([
    { sender: "Agent", text: "Hello! I am your OAL Broker. Let me know if you need help with Lead details." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "User", text: input }]);
    setInput("");
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Broker Communication Console</h1>
        <p className="text-sm text-slate-400">Secure messaging line with OAL Representative.</p>
        <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-500">
          🔒 Notice: Communication is restricted strictly to assigned OAL Agents. Direct contact with Borrowers is blocked.
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl h-[400px] flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl text-sm ${
                msg.sender === "User" ? "bg-indigo-600 text-slate-50" : "bg-slate-850 text-slate-200"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-850 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none"
            placeholder="Type your message..."
          />
          <button type="submit" className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
