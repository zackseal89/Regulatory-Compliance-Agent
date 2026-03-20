import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <header className="h-20 flex-shrink-0 flex items-center justify-between px-10 bg-surface border-b border-border-subtle sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm transition-colors">
        <div className="flex items-center gap-12">
          <h2 className="text-sm font-bold text-text-main tracking-[0.2em] uppercase font-display">Executive Overview</h2>
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-text-muted text-sm">search</span>
            <input 
              className="w-full bg-transparent border-none py-2 pl-8 pr-4 text-xs text-text-main focus:ring-0 placeholder:text-text-muted font-medium" 
              placeholder="SEARCH REGULATORY DATABASE..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-primary text-white dark:bg-transparent dark:border dark:border-border-subtle dark:text-text-muted px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-primary/90 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Generate Report
          </button>
          <button className="size-10 flex items-center justify-center border border-border-subtle text-text-muted hover:text-text-main transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div 
            className="size-8 border border-border-subtle grayscale opacity-60 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgMvtZAIUm8exrXDBwHtszpQAMeZT2vBZOoYKAE55VB_qO69fHVbebVqO4AdEFPw6Ox1Ob9Oyg9gpDB2eQLpv141XkGsjj0qu3KU1ywUFcpvYl6KPSeQhGIPoqEtBzOo23M1aCrrOMW1Dh-7jd-P2oxb-sH9raMBhFFurLiMDSWu_TBmCOkJRlOosr4WKDJ1a9bCy-vMaogGzvf01V1a8fF2LWyo_YaFXJ2Xe8dfPhbwXb524uPSiQL_fWd91cFxM7W09x5IQNQeg')" }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="p-10 space-y-10 max-w-[1400px]">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-border-subtle overflow-hidden border border-border-subtle mb-10">
          {[
            { label: "Daily Updates", value: "24", icon: "rss_feed", status: "+3" },
            { label: "High Priority", value: "12", icon: "warning", status: "Critical" },
            { label: "Pending Review", value: "08", icon: "rule", status: "Review" },
            { label: "Active Files", value: "156", icon: "folder_open", status: "Archive" },
          ].map((stat, i) => (
            <div key={i} className="bg-surface p-8 flex items-start justify-between group hover:bg-[#252a36] transition-all">
              <div className="space-y-4">
                <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-4xl font-light text-text-main leading-none font-display">{stat.value}</h3>
                  <span className={`text-[10px] font-bold uppercase py-0.5 px-1.5 border font-display ${
                    stat.status === "Critical" ? "text-red-500 border-red-500/30" : "text-text-muted border-border-subtle"
                  }`}>{stat.status}</span>
                </div>
              </div>
              <div className="size-8 flex items-center justify-center text-slate-100 bg-background-dark border border-border-subtle group-hover:border-slate-500 transition-colors">
                <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Panel: Materiality Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-baseline justify-between border-b border-border-subtle pb-4">
              <h2 className="text-xs font-bold text-text-main uppercase tracking-[0.2em]">Materiality Assessment</h2>
              <button className="text-text-muted text-[10px] font-bold uppercase hover:text-text-main transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">fact_check</span>
                Audit All
              </button>
            </div>
            <div className="space-y-4">
              {/* Update Card 1 */}
              <div className="bg-surface border border-border-subtle p-6 flex gap-8 hover:bg-[#252a36] transition-colors group">
                <div 
                  className="w-40 h-24 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all border border-border-subtle" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDy1oAZjgB3kGh4rW6IjprNpqxb99H-SNmfFAxS9OO99WSZTvJKfw8T-y-AzhHVLPy4XYdEe7nE3FF6z70aOOAlL3ky1Nt8dFylsajy8_gzbjddOv5_9g0MQfVgw40s303UagsafHjx5yqKoWbYYwCKoi6aG53BfVuVqzlDOfZJYfH23tLIjeimUAk0vzCL4GeIEtPO5E_xesG--yNCK8Zmbxh643_vy63CUGlNHNl8lzIC8T2aHIQmAmijaojH6Yuf9va_gMkehdU')" }}
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-200 bg-primary px-2 py-0.5">High Impact</span>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">SEC Amendment</span>
                    </div>
                    <h4 className="text-white font-semibold text-base tracking-tight">Rule 204 Reporting Cycle Updates</h4>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">Mandatory amendment regarding institutional manager reporting cycles. Significant exposure identified.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-600 text-[10px] font-bold uppercase">2 Hours Elapsed</span>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white flex items-center gap-2">
                      Review Case <span className="material-symbols-outlined text-xs">north_east</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Update Card 2 */}
              <div className="bg-surface border border-border-subtle p-6 flex gap-8 hover:bg-[#252a36] transition-colors group">
                <div 
                  className="w-40 h-24 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all border border-border-subtle" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAeKrT637bVL1XyzXcL2_b5LLNPyPg0887bCeuXOYfRnTcMu0ZJvTn-Ud7WI-cZZ1LVftTcTNt4zZPzkTc1qczv2KgW8s2gbhvnc-erqn9uYAgV6tUgE8hFX6gUn8h6GO5DQ9S0wBj0Kc2TLs_PsWvwSZ69LRx54xQk0I5Zi95RjWwPZHrbCUPtIgcmbuzVKnBKduWbYQ1wImlfeeVE1UStMjzrmr1X8JDa98CWvQTzVQb32gwE7ubAsNvd29SyQ7I_4IuHd9nzvY')" }}
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 border border-slate-700 px-2 py-0.5">Moderate</span>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">FINRA Disclosure</span>
                    </div>
                    <h4 className="text-text-main font-semibold text-base tracking-tight">Section 13F Filing Thresholds</h4>
                    <p className="text-text-muted text-xs mt-2 leading-relaxed">Proposed changes to disclosure requirements for high-net-worth asset managers.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-600 text-[10px] font-bold uppercase transition-colors">5 Hours Elapsed</span>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main flex items-center gap-2">
                      Review Case <span className="material-symbols-outlined text-xs">north_east</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Source Distribution */}
          <div className="space-y-6">
            <div className="border-b border-border-subtle pb-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Data Provenance</h2>
            </div>
            <div className="bg-surface border border-border-subtle p-8 space-y-8">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Source Heatmap</p>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(21)].map((_, i) => (
                    <div key={i} className={`aspect-square ${i === 3 ? 'bg-primary/40' : i === 4 ? 'bg-primary/80' : i === 9 ? 'bg-primary' : 'bg-slate-800'}`}></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-text-muted uppercase">
                    <span>Securities & Exchange Commission</span>
                    <span className="text-text-main">42%</span>
                  </div>
                  <div className="h-1 bg-slate-200 dark:bg-slate-800 w-full overflow-hidden">
                    <div className="h-full bg-primary w-[42%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    <span>FINRA Compliance Data</span>
                    <span className="text-slate-300">28%</span>
                  </div>
                  <div className="h-1 bg-slate-800 w-full overflow-hidden">
                    <div className="h-full bg-slate-600 w-[28%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    <span>CFTC Filings</span>
                    <span className="text-slate-300">15%</span>
                  </div>
                  <div className="h-1 bg-slate-800 w-full overflow-hidden">
                    <div className="h-full bg-slate-700 w-[15%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Activity Log */}
        <div className="bg-surface border border-border-subtle overflow-hidden">
          <div className="px-8 py-6 border-b border-border-subtle flex items-center justify-between">
            <h2 className="text-xs font-bold text-text-main uppercase tracking-[0.2em] font-display">Operational Ledger</h2>
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main flex items-center gap-2 border border-border-subtle px-3 py-1.5 transition-colors">
                <span className="material-symbols-outlined text-sm">ios_share</span>
                Export
              </button>
              <span className="material-symbols-outlined text-slate-600 cursor-pointer">more_horiz</span>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
              {/* Log Entry 1 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-1 size-8 border border-border-subtle bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-slate-500 text-sm">history_edu</span>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">Protocol.RegAI.01</span>
                    <span className="text-[10px] text-text-muted font-mono">12:45:08 UTC</span>
                  </div>
                  <p className="text-text-muted text-xs mt-1 leading-relaxed">System-wide scan initiated across 14 regulatory nodes. Two (2) unique amendments identified in Rule 204. Primary indexing complete.</p>
                </div>
              </div>
              {/* Log Entry 2 */}
              <div className="relative pl-12">
                <div className="absolute left-0 top-1 size-8 border border-border-subtle bg-background-dark flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-slate-500 text-sm">assignment_turned_in</span>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Analysis.Logic.Core</span>
                    <span className="text-[10px] text-slate-600 font-mono">11:30:12 UTC</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">Assigned <span className="text-slate-200 underline underline-offset-4">CRITICAL</span> priority status to SEC-2024-X-04. Alignment with institutional risk profile confirmed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

