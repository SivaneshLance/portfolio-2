import { useState, useEffect, useRef } from "react";
import { useTheme } from "../App";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SystemIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export default function Navbar({ activePage, setActivePage, onHire }) {
  const { theme, themeMode, setThemeMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setThemeDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isDark = theme === "dark";

  const glassBase = isDark
    ? "bg-gray-900/40 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    : "bg-white/40 border-white/60 shadow-[0_8px_32px_rgba(59,130,246,0.12)]";

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "w-[92%] md:w-[80%]" : "w-[96%] md:w-[85%]"
      }`}
    >
      {/* Liquid drop shape */}
      <div
        className={`relative backdrop-blur-xl border rounded-[2rem] px-6 py-3 flex items-center justify-between transition-all duration-500 ${glassBase}`}
        style={{
          borderRadius: "2rem 2rem 1.5rem 1.5rem",
          background: isDark
            ? "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,58,138,0.3) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(219,234,254,0.5) 100%)",
        }}
      >
        {/* Liquid drop bubble accent */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full blur-sm opacity-60"
          style={{ background: "linear-gradient(90deg, #3b82f6, #60a5fa)" }}
        />

        {/* Logo */}
        <button
          onClick={() => setActivePage("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-black text-sm">SK</span>
          </div>
          <span className={`font-bold text-lg tracking-tight hidden sm:block ${isDark ? "text-white" : "text-gray-900"}`}>
            Sivanesh<span className="text-blue-500">.</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activePage === link.id
                  ? "text-blue-500"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {activePage === link.id && (
                <span
                  className="absolute inset-0 rounded-xl opacity-20 bg-blue-500"
                  style={{ backdropFilter: "blur(4px)" }}
                />
              )}
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setThemeDropdown(!themeDropdown)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                isDark
                  ? "bg-white/10 border-white/20 text-gray-300 hover:text-white hover:bg-white/20"
                  : "bg-black/5 border-black/10 text-gray-600 hover:text-gray-900 hover:bg-black/10"
              }`}
            >
              {themeMode === "dark" ? <MoonIcon /> : themeMode === "system" ? <SystemIcon /> : <SunIcon />}
            </button>

            {themeDropdown && (
              <div
                className={`absolute top-12 right-0 w-36 rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-xl z-50 ${
                  isDark ? "bg-gray-900/90 border-white/10 text-gray-200" : "bg-white/90 border-gray-200 text-gray-700"
                }`}
              >
                {[
                  { key: "light", label: "Light", icon: <SunIcon /> },
                  { key: "dark", label: "Dark", icon: <MoonIcon /> },
                  { key: "system", label: "System", icon: <SystemIcon /> },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setThemeMode(opt.key); setThemeDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      themeMode === opt.key
                        ? "text-blue-500 bg-blue-500/10"
                        : isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                    {themeMode === opt.key && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hire Me Button */}
          <button
            onClick={onHire}
            className="relative overflow-hidden px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 hidden sm:block"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
              isDark ? "bg-white/10 border-white/20" : "bg-black/5 border-black/10"
            }`}
          >
            <span className={`block w-4 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-800"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-4 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-800"} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-800"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className={`mt-2 rounded-2xl border backdrop-blur-xl px-4 py-4 flex flex-col gap-2 md:hidden ${glassBase}`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activePage === link.id
                  ? "bg-blue-500/20 text-blue-500"
                  : isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-black/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onHire(); setMobileOpen(false); }}
            className="w-full mt-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}