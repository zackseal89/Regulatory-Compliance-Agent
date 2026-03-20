"use client";

import React, { useState } from "react";

export default function Notifications() {
  const [selectedCase, setSelectedCase] = useState(0);

  const notifications = [
    {
      id: 0,
      status: "Draft",
      entity: "Acme Fintech",
      priority: "HIGH",
      subject: "RE: CBK DCP Circular 15/2026",
      preview: "Automated draft prepared based on the latest Central Bank of Kenya directive...",
      time: "2m ago",
      color: "border-primary"
    },
    {
      id: 1,
      status: "Draft",
      entity: "Global Bank Corp",
      priority: "MEDIUM",
      subject: "RE: MiFID II Reporting Amendments",
      preview: "Update required for transaction reporting workflows in line with new ESMA technical standards.",
      time: "1h ago",
      color: "border-border-subtle"
    }
  ];

  return (
    <div className="flex-1 flex overflow-hidden transition-colors duration-300">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-border-subtle bg-background-dark/30">
        {/* Header */}
        <header className="h-16 border-b border-border-subtle flex items-center justify-between px-8 bg-surface z-10 shrink-0">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main font-display">Notifications</h2>
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">search</span>
              <input 
                className="w-full bg-background-dark border border-border-subtle rounded-sm py-1.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none text-text-main placeholder:text-text-muted transition-all font-display font-medium shadow-sm" 
                placeholder="SEARCH SYSTEM..." 
                type="text"
              />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-8 border-b border-border-subtle bg-surface shrink-0 transition-colors">
          <div className="flex gap-8">
            <button className="py-4 text-[10px] font-bold tracking-widest uppercase text-primary border-b-2 border-primary">
              Pending Review (3)
            </button>
            <button className="py-4 text-[10px] font-bold tracking-widest uppercase text-text-muted hover:text-text-main border-b-2 border-transparent transition-colors">
              Approved
            </button>
            <button className="py-4 text-[10px] font-bold tracking-widest uppercase text-text-muted hover:text-text-main border-b-2 border-transparent transition-colors">
              Sent
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 font-display">
          {notifications.map((n, i) => (
            <div 
              key={n.id}
              onClick={() => setSelectedCase(i)}
              className={`group relative flex flex-col p-5 bg-surface border ${selectedCase === i ? 'border-primary/50 shadow-md' : 'border-border-subtle hover:border-text-muted'} rounded-sm cursor-pointer transition-all`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-text-muted uppercase">Status: {n.status}</span>
                  <span className="text-border-subtle">|</span>
                  <span className="text-[11px] font-bold text-text-main tracking-wide uppercase">{n.entity}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold shadow-sm ${n.priority === 'HIGH' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-slate-500/10 text-text-muted border border-border-subtle'} tracking-[0.15em]`}>
                  {n.priority}
                </span>
              </div>
              <h3 className={`text-sm font-bold mb-2 tracking-tight ${selectedCase === i ? 'text-primary' : 'text-text-main'}`}>{n.subject}</h3>
              <p className="text-xs text-text-muted line-clamp-1 font-medium italic opacity-80">{n.preview}</p>
              <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Modified {n.time}</span>
                <span className="material-symbols-outlined text-text-muted text-lg group-hover:text-primary transition-colors">arrow_right_alt</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Drawer */}
      <aside className="w-[45%] flex flex-col bg-surface overflow-hidden transition-colors">
        <div className="p-6 border-b border-border-subtle flex items-center justify-between shrink-0">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main font-display">Notification Engine</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors text-text-muted">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors text-text-muted">
              <span className="material-symbols-outlined text-lg">more_vert</span>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 font-display">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-sm text-[9px] font-bold bg-primary text-white tracking-[0.2em] uppercase shadow-sm">HIGH PRIORITY</span>
              <div className="flex items-center gap-2 group cursor-help">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">AI Confidence: 98%</span>
                <span className="material-symbols-outlined text-[14px] text-primary">info</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text-main mb-6 leading-tight uppercase font-display">RE: CBK DCP Circular 15/2026 - Action Required</h1>
            
            <div className="flex items-start gap-4 p-5 rounded-sm border border-primary/20 bg-primary/5 mb-10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl mt-0.5">verified_user</span>
              <div>
                <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1 font-display">Executive Intelligence Rapport</p>
                <p className="text-xs leading-relaxed text-text-muted font-bold uppercase tracking-tight">
                  This document was synthesized by <span className="text-text-main underline decoration-primary/30">RegAI protocol</span>. Cross-referencing verified institutional portfolios with CBK directive 15/2026.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mb-6 pb-2 border-b border-border-subtle">Impact Analysis</h4>
                <div className="text-[13px] leading-relaxed text-text-main space-y-6 font-medium">
                  <p>To the Executive Compliance Team at Acme Fintech,</p>
                  <p>The Central Bank of Kenya has codified <span className="font-bold underline">Circular 15/2026</span>. This mandate stipulates rigorous adjustments to the reporting architectures for Digital Credit Providers.</p>
                </div>
              </section>
              <section className="p-8 rounded-sm border-l-4 border-primary bg-background-dark/30 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2 font-display">
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  Strategic Recommendation
                </h4>
                <p className="text-[13px] leading-relaxed text-text-main font-bold uppercase tracking-tight font-display italic">
                  "Execute immediate update of the 'Interest Rate Disclosure' sub-module. Compliance deadline fixed for Oct 15th. Non-compliance invokes statutory penalties under Section 17."
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Executive Action Bar */}
        <div className="p-8 border-t border-border-subtle flex flex-col gap-4 bg-surface/80 backdrop-blur-md shrink-0 transition-colors">
          <button className="w-full py-4 px-4 bg-primary hover:bg-primary/90 text-white rounded-sm font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all shadow-lg border border-white/5 active:scale-[0.98]">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Authorize & Dispatch
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-background-dark border border-border-subtle hover:bg-slate-50 dark:hover:bg-slate-800 text-text-main rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">edit</span>
              Modify Draft
            </button>
            <button className="py-3 px-4 border border-border-subtle hover:bg-red-500/10 hover:border-red-500/30 text-text-muted hover:text-red-500 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">block</span>
              Suppress
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
