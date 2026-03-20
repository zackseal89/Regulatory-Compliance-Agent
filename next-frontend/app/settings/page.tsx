import React from "react";

export default function Settings() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-dark overflow-hidden">
      {/* Top Header */}
      <header className="h-14 flex items-center justify-between px-8 border-b border-border-subtle bg-background-dark flex-shrink-0">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
            <input 
              className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-xs uppercase tracking-widest text-slate-300 placeholder-slate-600 focus:ring-0 outline-none font-display font-medium" 
              placeholder="Search system repository..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-500 hover:text-slate-100 transition-colors">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="text-slate-500 hover:text-slate-100 transition-colors">
            <span className="material-symbols-outlined text-xl">help_outline</span>
          </button>
        </div>
      </header>
      
      {/* Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Area (60%) - Settings List */}
        <div className="w-[60%] flex flex-col overflow-y-auto bg-background-dark custom-scrollbar">
          <div className="p-10">
            <h1 className="text-2xl font-light tracking-tight text-slate-100 mb-1">Configuration Center</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Enterprise Management Console</p>
          </div>
          <div className="px-10 pb-10 space-y-2">
            {[
              { id: 'api', title: 'API Integration', sub: 'Endpoint connectivity and auth tokens', icon: 'api', status: 'Active' },
              { id: 'webhook', title: 'Tinyfish Webhook', sub: 'External synchronization relay', icon: 'webhook', status: 'Enabled' },
              { id: 'profile', title: 'Executive Profile', sub: 'Credentials and identity parameters', icon: 'person', status: '', active: true },
              { id: 'units', title: 'Business Units', sub: 'Structure and hierarchy management', icon: 'corporate_fare', status: '' },
              { id: 'alerts', title: 'Alert Protocols', sub: 'Notification thresholds and dispatching', icon: 'notifications_active', status: '' },
            ].map((item) => (
              <div 
                key={item.id} 
                className={`group cursor-pointer p-5 border transition-all flex items-center justify-between ${
                  item.active 
                  ? 'bg-surface border-l-4 border-l-primary border-y-border-subtle border-r-border-subtle' 
                  : 'bg-surface/50 border-border-subtle hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`size-10 border border-border-subtle flex items-center justify-center ${item.active ? 'bg-primary text-white' : 'bg-background-dark text-slate-400'}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${item.active ? 'text-slate-100' : 'text-slate-200'}`}>{item.title}</h3>
                    <p className={`text-[10px] uppercase tracking-tight ${item.active ? 'text-slate-400' : 'text-slate-500'} font-display font-medium`}>{item.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {item.status && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 border border-border-subtle px-2 py-1">{item.status}</span>
                  )}
                  <span className={`material-symbols-outlined ${item.active ? 'text-slate-400' : 'text-slate-600 group-hover:text-slate-300'}`}>chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Area (40%) - Detail Panel */}
        <aside className="w-[40%] overflow-y-auto bg-surface border-l border-border-subtle flex flex-col custom-scrollbar">
          <div className="p-8 border-b border-border-subtle sticky top-0 bg-surface z-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Section: Identity</h2>
              <button className="p-1 hover:text-white text-slate-500 transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="size-16 border border-border-subtle overflow-hidden bg-background-dark grayscale">
                  <img alt="Profile" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMI5lieJzst4n-fA9gIKNkkZqIueD0AVhunuyyIF3nArpveT0uuSrg8AG0kF_V3UNTB72s4Bp7_blR-bnqCvTqAB8hRXbxeT2wnBk3bssWgD9r3DIx5-kN6sJvMIi10IlDNPA3HFzcrdpqNLslJ28JEU_ZokbDt7ekNA761Q7qYPRC1zvIVbCzRpEEb_pzSiKmVcGmAv98N5B_T8mb2HoB0xsHBwqReC6dVmqj5Ix8ysiTRaUTgq_xOJdhoHknbMvCavqaEKS7N2I" />
                </div>
                <button className="absolute -bottom-1 -right-1 size-5 bg-primary text-white flex items-center justify-center border border-white/10 shadow-lg">
                  <span className="material-symbols-outlined text-[10px]">edit</span>
                </button>
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-slate-100">Alex Rivera</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Chief Regulatory Officer</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal Name</label>
                <input 
                  className="w-full bg-background-dark border border-border-subtle rounded-none px-4 py-3 text-xs tracking-wide text-slate-300 focus:border-primary focus:ring-0 outline-none font-display font-medium" 
                  type="text" 
                  defaultValue="Alex Rivera"
                />
              </div>
              <div className="space-y-2 font-display">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Corporate Designation</label>
                <input 
                  className="w-full bg-background-dark border border-border-subtle rounded-none px-4 py-3 text-xs tracking-wide text-slate-300 focus:border-primary focus:ring-0 outline-none font-medium" 
                  type="text" 
                  defaultValue="Chief Regulatory Officer"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 font-display">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Jurisdiction</label>
                  <select className="w-full bg-background-dark border border-border-subtle rounded-none px-4 py-3 text-xs tracking-wide text-white focus:border-primary focus:ring-0 outline-none appearance-none cursor-pointer font-medium">
                    <option>European Union</option>
                    <option>North America</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Temporal Zone</label>
                  <select className="w-full bg-background-dark border border-border-subtle rounded-none px-4 py-3 text-xs tracking-wide text-white focus:border-primary focus:ring-0 outline-none appearance-none cursor-pointer font-medium">
                    <option>GMT+1 (Berlin)</option>
                    <option>EST (New York)</option>
                    <option>PST (LA)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 pt-10 border-t border-border-subtle font-display">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Security Parameters</h3>
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">2FA Authentication</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tight mt-1 font-medium">Enhanced biometric/token validation</p>
                </div>
                <div className="w-10 h-5 bg-background-dark border border-border-subtle relative transition-all">
                   <div className="absolute top-[3px] left-[3px] bg-primary h-3 w-5"></div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button className="flex-1 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 border border-white/5 hover:bg-slate-800 transition-colors shadow-lg">Commit Changes</button>
              <button className="flex-1 border border-border-subtle text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-background-dark hover:text-slate-300 transition-colors">Discard</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
