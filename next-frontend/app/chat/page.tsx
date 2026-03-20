"use client";

import React, { useState } from "react";
import { runAgent, RunEvent } from "@/lib/api-client";

export default function AIChat() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      type: "Regulatory Analysis", 
      content: "Hello. I am the Regulatory Compliance Agent. How can I assist you with regulatory analysis, ingestion, or reporting today?" 
    }
  ]);

  const clearChat = () => setMessages([]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { role: "user", type: "Inquiry", content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      let assistantResponse = "";
      const assistantMessage = { role: "assistant", type: "AI Analysis", content: "" };
      setMessages(prev => [...prev, assistantMessage]);

      for await (const event of runAgent(inputText)) {
        if (event.content?.parts?.[0]?.text) {
          assistantResponse += event.content.parts[0].text;
          setMessages(prev => {
            const last = [...prev];
            last[last.length - 1] = { ...last[last.length - 1], content: assistantResponse };
            return last;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", type: "Error", content: "Failed to reach the analysis engine. Please ensure the backend is running." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="h-14 flex-shrink-0 border-b border-border-subtle flex items-center justify-between px-6 bg-surface">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-accent-silver text-lg">smart_toy</span>
          <h2 className="text-xs font-bold text-text-main uppercase tracking-widest font-display">AI Analysis Engine</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">search</span>
            <input 
              className="bg-background-dark border border-border-subtle rounded-sm pl-9 pr-4 py-1 text-xs w-64 focus:ring-0 focus:border-accent-silver text-text-main placeholder:text-text-muted" 
              placeholder="Search directives..." 
              type="text"
            />
          </div>
          <button 
            onClick={clearChat}
            className="p-1.5 text-text-muted hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">delete_sweep</span>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area (65%) */}
        <section className="w-full lg:w-[65%] flex flex-col relative border-r border-border-subtle bg-background-dark transition-colors duration-300">
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            {messages.map((msg: any, i) => (
              <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-sm bg-primary border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-sm">terminal</span>
                  </div>
                )}
                <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end max-w-[80%]' : 'items-start max-w-[90%]'}`}>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{msg.type}</p>
                  <div className="bg-surface border border-border-subtle text-text-main rounded-sm px-6 py-5 shadow-sm transition-colors duration-300">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    {msg.items && (
                      <div className="grid grid-cols-1 gap-4 mt-5">
                        {msg.items.map((item: any, j: number) => (
                          <div key={j} className="p-4 bg-background-dark border-l-2 border-primary">
                            <h4 className="text-xs font-bold text-text-main uppercase mb-1">{item.title}</h4>
                            <p className="text-xs leading-normal text-text-muted">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm bg-primary/20 animate-pulse border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white/50 text-sm">hourglass_empty</span>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Engine Processing...</p>
                  </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-surface border-t border-border-subtle transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="relative bg-background-dark border border-border-subtle rounded-sm p-1.5 flex items-center">
                <button className="p-2 text-text-muted hover:text-text-main transition-colors">
                  <span className="material-symbols-outlined text-xl">attach_file</span>
                </button>
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-xs py-2 px-3 text-text-main placeholder:text-text-muted font-medium" 
                  placeholder="Analyze regulatory text or inquire about specific articles..." 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <p className="text-[9px] text-center text-text-muted uppercase tracking-widest font-medium">Confidential Enterprise Environment • Verified Sources Only</p>
            </div>
          </div>
        </section>

        {/* Cited Sources Panel (35%) */}
        <aside className="hidden lg:flex w-[35%] flex-shrink-0 bg-surface flex flex-col border-l border-border-subtle transition-colors duration-300">
          <div className="p-5 border-b border-border-subtle flex items-center justify-between">
            <h3 className="font-bold text-text-main uppercase tracking-[0.15em] text-[10px] font-display">Reference Library</h3>
          </div>
          <div className="p-5">
             <p className="text-[11px] text-text-muted italic">Contextual references will appear here as they are cited by the AI Engine.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
