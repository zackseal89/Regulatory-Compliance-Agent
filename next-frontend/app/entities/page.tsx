"use client";

import React, { useState } from "react";

export default function Entities() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-border-subtle flex items-center justify-between px-8 bg-surface">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-text-muted text-[20px]">group</span>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-main font-display">Client Profiles</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Client
          </button>
          <div className="h-4 w-[1px] bg-border-subtle mx-2"></div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 transition-colors flex items-center gap-2 ${showFilters ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Filters</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* List Section */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-10 bg-background-dark/30">
          <div className="flex items-center justify-between mb-8 max-w-4xl">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">search</span>
                <input 
                  className="w-full bg-surface border border-border-subtle rounded-sm py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-muted text-sm text-text-main font-medium shadow-sm" 
                  placeholder="SEARCH CLIENTS, INDUSTRIES OR TAGS..." 
                  type="text"
                />
              </div>
            </div>
            
            {/* Bulk Actions */}
            <div className="flex items-center gap-3 ml-6">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Bulk:</span>
              <button className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/30">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
              <button className="p-2 text-text-muted hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/30">
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
              </button>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="grid grid-cols-1 gap-6 max-w-4xl">
            {/* Card 1 */}
            <div className="flex flex-col lg:flex-row items-stretch rounded-sm overflow-hidden border border-border-subtle bg-surface hover:border-primary transition-all group shadow-sm cursor-pointer">
              <div className="w-full lg:w-48 h-40 lg:h-auto overflow-hidden relative border-r border-border-subtle transition-colors">
                <img 
                  alt="Acme Fintech" 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr5cOlfQooc4Rt24n3WBClwNm6gA8l4G5pHo0032xEzCHr8WnxEj6Jp7Xp4QGQbNwsrfIGECR-Td8XqkwfzLnItaMfx4FwW2bwA1mpD6TmAbpkxClxEJFr1U34XX1VgNPKw5bfS4VG2J3RSNufQpaPptmzN2KYzpxu7ZgjIOUuh96LMbewD9EqsKprM62He9LSsvOHV7fU_oJ-2hjxDDQ7EMsaoqh14nRdH6IxhNX4nCeOFxQzuisDP6JTue3GDHZvz_XBICPowYE"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-primary text-[9px] font-bold text-white rounded-sm uppercase tracking-tighter">Active</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 text-text-main">
                    <h3 className="text-base font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Acme Fintech</h3>
                    <input type="checkbox" className="size-4 border-border-subtle text-primary focus:ring-primary rounded-sm transition-colors" />
                  </div>
                  <p className="text-[11px] text-text-muted uppercase tracking-widest mb-4 flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    Fintech • Series B
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 transition-colors">
                    {['DCP', 'AML', 'KYC'].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-background-dark border border-border-subtle text-text-muted rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border-subtle transition-colors">
                  <button className="flex items-center gap-1 text-text-muted text-[10px] uppercase font-bold tracking-widest hover:text-primary transition-all">
                    View Dossier
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col lg:flex-row items-stretch rounded-sm overflow-hidden border border-border-subtle bg-surface hover:border-amber-500/50 transition-all group shadow-sm cursor-pointer">
              <div className="w-full lg:w-48 h-40 lg:h-auto overflow-hidden relative border-r border-border-subtle transition-colors">
                <img 
                  alt="TelCo Kenya" 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJTk9EMVTO4oD0df_phODqv7fjpnxzU9_iUrtjj-aYgczyoFbNlw4KdVnp_OKauw9thfIPya24Xx4uHT3RWkKQyJaU42LJUeI_baXPzWwjlqn0qmZdfEDmJ-oODzCC22ph-U-tF8RbBEwJoYdfi4-kAIfCW5xjxQbbwNzoTSfztTe-I4eoCoXW9cdQqdO4-LhdALpUvPlW8v3m9lh7NePPk_OlA8Hmh93xGoJIrzLeCRPYUt-VM5QBzxerJuxMFZoogoEah5tiAXQ"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-amber-500 text-[9px] font-bold text-white rounded-sm uppercase tracking-tighter">Under Review</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between whitespace-nowrap">
                <div>
                  <div className="flex justify-between items-start mb-2 text-text-main">
                    <h3 className="text-base font-bold uppercase tracking-wide group-hover:text-amber-500 transition-colors">TelCo Kenya</h3>
                    <input type="checkbox" className="size-4 border-border-subtle text-primary focus:ring-primary rounded-sm transition-colors" />
                  </div>
                  <p className="text-[11px] text-text-muted uppercase tracking-widest mb-4 flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    Telecommunications • Listed
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 transition-colors">
                    {['DATA', 'LICENSE', 'VAT'].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-background-dark border border-border-subtle text-text-muted rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border-subtle transition-colors">
                  <button className="flex items-center gap-1 text-text-muted text-[10px] uppercase font-bold tracking-widest hover:text-amber-500 transition-all">
                    View Dossier
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter / Search Panel (Conditionally Shown) */}
        {showFilters && (
          <aside className="w-[300px] border-l border-border-subtle bg-surface flex flex-col overflow-y-auto transition-all shadow-xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-border-subtle flex items-center justify-between transition-colors">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-main">Filter Registry</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-text-muted hover:text-text-main transition-colors"
                title="Close Filters"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-8 space-y-8 font-display">
              <div className="space-y-4">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest">Industry Segment</label>
                <div className="space-y-2">
                  {['Fintech', 'Banking', 'Telecommunications', 'Retail'].map(industry => (
                    <label key={industry} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="size-4 border-border-subtle text-primary focus:ring-primary rounded-sm transition-colors" />
                      <span className="text-[11px] font-bold text-text-muted uppercase group-hover:text-text-main transition-colors font-sans">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-4 border-t border-border-subtle pt-8">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest">Compliance Status</label>
                <div className="space-y-2">
                  {['Compliant', 'Non-Compliant', 'Under Review'].map(status => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="size-4 border-border-subtle text-primary focus:ring-primary rounded-sm transition-colors" />
                      <span className="text-[11px] font-bold text-text-muted uppercase group-hover:text-text-main transition-colors font-sans">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="w-full bg-primary text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md">
                Apply Filters
              </button>
              <button className="w-full text-text-muted hover:text-text-main py-2 text-[10px] font-bold uppercase tracking-widest transition-colors">
                Clear All
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
