"use client";

import React, { useState } from "react";

export default function UpdatesFeed() {
  const [selectedCase, setSelectedCase] = useState(true);

  return (
    <div className="flex flex-col h-full overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="h-14 flex-shrink-0 flex items-center justify-between px-8 border-b border-border-subtle bg-surface">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main font-display">Updates Feed</h2>
        <div className="flex items-center gap-4">
          <button className="size-8 flex items-center justify-center text-text-muted hover:text-text-main transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm">
            Manual Entry
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="px-8 py-3 bg-surface/50 border-b border-border-subtle flex flex-wrap items-center gap-6 transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Source:</span>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-text-main hover:text-primary transition-colors">
            ALL <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Level:</span>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-text-main hover:text-primary transition-colors">
            HIGH <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
        <div className="flex items-center gap-2 border-l border-border-subtle pl-6">
          <span className="material-symbols-outlined text-[16px] text-text-muted">calendar_today</span>
          <span className="text-[11px] font-semibold text-text-main tracking-tight uppercase">MAR 01 - MAR 31, 2026</span>
        </div>
        <div className="flex-1 min-w-[250px] border-l border-border-subtle pl-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">search</span>
            <input 
              className="w-full bg-transparent border-none p-0 pl-7 text-[11px] focus:ring-0 text-text-main placeholder:text-text-muted uppercase tracking-tight font-medium" 
              placeholder="Filter by jurisdiction, entity or keyword..." 
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Content Grid with Drawer */}
      <div className="flex-1 flex overflow-hidden">
        {/* List of Cards */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-background-dark custom-scrollbar transition-colors">
          {/* Card 1 (Active/Selected) */}
          <div className={`relative bg-surface border ${selectedCase ? 'border-primary shadow-md' : 'border-border-subtle hover:border-text-muted'} p-6 transition-all group cursor-pointer`} onClick={() => setSelectedCase(true)}>
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-primary dark:text-primary/80 uppercase tracking-[0.2em] border border-primary/20 px-1.5 py-0.5">Circular</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">15 MAR 2026</span>
                </div>
                <h3 className="text-base font-bold text-text-main tracking-tight leading-snug group-hover:text-primary transition-colors">[CBK] Circular 15/2026 — Digital Credit Providers Regulatory Framework</h3>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest border border-red-500/30 px-2 py-0.5 inline-block bg-red-500/5">Materiality: 0.87</div>
                <p className="text-[10px] text-text-muted mt-2 uppercase tracking-tight font-bold">5 Affected Entities</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-sm">View Analysis</button>
              <button className="border border-border-subtle text-text-muted hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-800 px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all">Override</button>
              <div className="flex -space-x-1 ml-auto grayscale opacity-80 group-hover:grayscale-0 transition-all">
                <div className="size-6 border-2 border-surface bg-slate-200 rounded-full" />
                <div className="size-6 border-2 border-surface bg-slate-400 rounded-full" />
                <div className="size-6 border-2 border-surface bg-primary/20 flex items-center justify-center text-[9px] text-primary font-bold rounded-full">+3</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface border border-border-subtle p-6 hover:border-text-muted transition-all group cursor-pointer" onClick={() => setSelectedCase(false)}>
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] border border-border-subtle px-1.5 py-0.5">Notice</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">14 MAR 2026</span>
                </div>
                <h3 className="text-base font-bold text-text-main tracking-tight leading-snug group-hover:text-primary transition-colors">[CMA] Notice — REITs Amendment Regulations (Compliance Update)</h3>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest border border-amber-500/30 px-2 py-0.5 inline-block bg-amber-500/5">Materiality: 0.52</div>
                <p className="text-[10px] text-text-muted mt-2 uppercase tracking-tight font-bold">2 Affected Entities</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="border border-border-subtle text-text-muted hover:text-text-main px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all">Details</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Drawer/Panel (Open) */}
        {selectedCase && (
          <aside className="w-[450px] bg-surface border-l border-border-subtle flex flex-col overflow-y-auto custom-scrollbar transition-all duration-300">
            <div className="p-8 border-b border-border-subtle flex items-center justify-between sticky top-0 bg-surface z-10 transition-colors">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-[0.2em] font-display">Case Analysis</h4>
              <button onClick={() => setSelectedCase(false)} className="text-text-muted hover:text-text-main transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-8 space-y-10">
              {/* Source Link */}
              <div className="p-5 border border-border-subtle flex items-center justify-between bg-background-dark/30 hover:bg-background-dark transition-colors group">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-red-500">description</span>
                  <div>
                    <p className="text-[11px] font-bold text-text-main tracking-tight uppercase">CBK_CIRCULAR_15_2026.PDF</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-tight font-bold">Official Publication • 2.4 MB</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-primary tracking-widest hover:text-text-main transition-colors uppercase flex items-center gap-1">
                  Open <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>

              {/* Portfolio Impact Matrix */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Portfolio Impact Matrix</h5>
                <div className="border border-border-subtle overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-background-dark border-b border-border-subtle font-display">
                      <tr>
                        <th className="px-5 py-3 text-[10px] font-bold uppercase text-text-muted tracking-widest">Entity</th>
                        <th className="px-5 py-3 text-[10px] font-bold uppercase text-text-muted tracking-widest text-right">Sensitivity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {[
                        { name: "Acme Fintech Limited", level: "Critical", color: "text-red-500" },
                        { name: "TelCo Kenya PLC", level: "Nominal", color: "text-text-muted" },
                        { name: "Equity Bank Group", level: "Moderate", color: "text-amber-500" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-background-dark/40 transition-colors">
                          <td className="px-5 py-4 text-[11px] font-bold text-text-main uppercase tracking-tight">{row.name}</td>
                          <td className="px-5 py-4 text-right"><span className={`${row.color} font-bold text-[10px] tracking-widest uppercase`}>{row.level}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Agent Reasoning */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">model_training</span>
                  <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Clinical Rationale</h5>
                </div>
                <div className="p-6 border-l-2 border-primary bg-background-dark transition-colors">
                  <p className="text-[12px] text-text-main leading-relaxed font-medium">
                    "Mandatory capital requirements for Digital Credit Providers (DCPs) identified. Strategic analysis of Acme Fintech's liquidity (1.2 ratio) indicates failure to meet KES 50M core capital threshold. Compliance window (30 days) is atypical. Recommend immediate executive notification and capitalization plan."
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col gap-2 sticky bottom-0 bg-surface pb-8 mt-12 transition-colors">
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-md">
                  Finalize Notification Draft
                </button>
                <button className="w-full border border-border-subtle text-text-muted hover:text-text-main hover:bg-background-dark py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all">
                  Adjust Scoring Parameters
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
