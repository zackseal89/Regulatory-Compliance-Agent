"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: "dashboard", label: "Dashboard", href: "/" },
    { icon: "rss_feed", label: "Updates Feed", href: "/updates-feed" },
    { icon: "smart_toy", label: "AI Assistant", href: "/chat" },
    { icon: "group", label: "Client Profiles", href: "/entities" },
    { icon: "notifications", label: "Notifications", href: "/notifications" },
    { icon: "settings", label: "Settings", href: "/settings" },
  ];

  if (!mounted) return null;

  return (
    <aside className="w-[260px] fixed inset-y-0 left-0 bg-surface border-r border-border-subtle flex flex-col z-50 transition-colors duration-300">
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary size-7 flex items-center justify-center text-white rounded-sm">
            <span className="material-symbols-outlined text-lg">balance</span>
          </div>
          <Link href="/">
            <h1 className="text-lg font-bold tracking-[0.15em] text-primary dark:text-white uppercase cursor-pointer">RegAI</h1>
          </Link>
        </div>
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-text-muted hover:text-text-main transition-colors"
        >
          <span className="material-symbols-outlined text-lg transition-transform hover:rotate-12">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>
      <nav className="flex-1 px-6 space-y-2 mt-4 font-display">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-4 px-3 py-2 transition-all group ${
                isActive ? "active-nav" : "text-text-muted hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-xs font-semibold tracking-wider uppercase">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-border-subtle mt-auto bg-slate-50/50 dark:bg-transparent">
        <div className="flex items-center gap-4 px-2 py-4 mb-2">
          <div className="size-9 rounded-full border border-border-subtle overflow-hidden grayscale opacity-80 ring-2 ring-primary/5 flex-shrink-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXj2DtAAhwARyxSF5WRn3b2kF2dBt_PpbINzU7gooF2UXIOcPMaMstshL3bsS3jyjFtLBJP8Uv57yIO3043lUfjENGcVVHsxPjPltLi2sRbAz3nfVbMtX044knODTcru19LvkmnEy8o0yHcfwo5_voMBiFjPU9R1smEQvTpn6LRAp-ZDIibb2OkeMZZVi0KHJilTyxGoABYxhWPJL204dqdoX2xOxxelt4iHggBNj4_RmVChyd5HeqZ1A6p70m3hdNcKZ8Bt6cAkE" alt="Alex Rivera" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-text-main uppercase tracking-tight truncate">Alex Sterling</span>
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-medium truncate">Counsel</span>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-text-muted hover:text-primary dark:hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors font-display border border-transparent hover:border-border-subtle">
          <span className="material-symbols-outlined text-sm">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
