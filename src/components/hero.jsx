import { useEffect, useRef } from "react";
import { useTheme } from "../App";

const roles = [ "Full Stack Developer"];

export default function Hero({ onHire, setActivePage }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const roleRef = useRef(null);
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const type = () => {
      const current = roles[roleIndex.current];
      if (!deleting.current) {
        charIndex.current++;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charIndex.current);
        if (charIndex.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex.current--;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charIndex.current);
        if (charIndex.current === 0) {
          deleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      }
      timeout = setTimeout(type, deleting.current ? 60 : 100);
    };
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #1d4ed8, transparent)", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }}
        />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? "#60a5fa" : "#1d4ed8"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
            style={{
              background: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.08)",
              borderColor: isDark ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.25)",
              color: "#3b82f6",
            }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Hi, I'm{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                Sivanesh K
              </span>
            </span>
          </h1>

          <div className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 justify-center lg:justify-start ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <span ref={roleRef} className="text-blue-500" />
            <span className="inline-block w-0.5 h-8 bg-blue-500 animate-pulse" />
          </div>

          <p className={`text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Master of Engineering in Computer Science with a passion for building intelligent systems and beautiful interfaces. 
            Specializing in Machine Learning, Deep Learning, and Full Stack Development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={onHire}
              className="group relative overflow-hidden px-8 py-4 rounded-2xl text-base font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Hire Me
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => setActivePage("resume")}
              className={`px-8 py-4 rounded-2xl text-base font-bold border-2 hover:-translate-y-1 transition-all duration-300 ${
                isDark
                  ? "border-white/20 text-white hover:border-blue-400 hover:text-blue-400"
                  : "border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              View Resume
            </button>

            <button
              onClick={() => setActivePage("contact")}
              className={`px-8 py-4 rounded-2xl text-base font-bold hover:-translate-y-1 transition-all duration-300 ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Contact Me →
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 justify-center lg:justify-start">
            {[
              { num: "2+", label: "Projects Published" },
              { num: "IEEE", label: "Paper Published" },
              { num: "CSE", label: "M.E Graduate" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-black text-blue-500">{s.num}</div>
                <div className={`text-xs font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Avatar Card */}
        <div className="relative flex-shrink-0">
          <div
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-[3rem] flex items-center justify-center shadow-2xl"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(30,58,138,0.6), rgba(15,23,42,0.8))"
                : "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(255,255,255,0.9))",
              backdropFilter: "blur(20px)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(59,130,246,0.2)"}`,
            }}
          >
            {/* Abstract avatar */}
            <div className="relative w-48 h-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)" }}
              />
              <div
                className="absolute inset-4 rounded-full flex items-center justify-center"
                style={{ background: isDark ? "rgba(15,23,42,0.9)" : "rgba(239,246,255,0.95)" }}
              >
                <span
                  className="text-5xl font-black"
                  style={{ background: "linear-gradient(135deg, #2563eb, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  SK
                </span>
              </div>
            </div>

            {/* Floating chips */}
            <FloatingChip className="absolute -top-4 -right-4" label="React JS" delay="0s" isDark={isDark} />
            <FloatingChip className="absolute -bottom-4 -left-4" label="Machine Learning" delay="0.5s" isDark={isDark} />
            <FloatingChip className="absolute top-1/2 -right-16 -translate-y-1/2" label="Fullstack" delay="1s" isDark={isDark} />
          </div>

          {/* Decorative ring */}
          <div
            className="absolute inset-0 rounded-[3rem] border-2 border-blue-500/20 -m-3 animate-spin"
            style={{ animationDuration: "20s" }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>Scroll</span>
        <div className={`w-0.5 h-8 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
      </div>
    </section>
  );
}

function FloatingChip({ className, label, delay, isDark }) {
  return (
    <div
      className={`${className} px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-bounce`}
      style={{
        animationDelay: delay,
        animationDuration: "3s",
        background: isDark ? "rgba(30,58,138,0.9)" : "rgba(219,234,254,0.95)",
        color: "#3b82f6",
        border: "1px solid rgba(59,130,246,0.3)",
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}