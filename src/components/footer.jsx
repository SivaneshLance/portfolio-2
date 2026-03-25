import { useTheme } from "../App";

export default function Footer({ setActivePage, onHire }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t py-12 ${isDark ? "border-white/10 bg-gray-950" : "border-gray-200 bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-black text-sm">SK</span>
            </div>
            <div>
              <div className={`font-black ${isDark ? "text-white" : "text-gray-900"}`}>Sivanesh K</div>
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>ML Engineer · Full Stack Developer</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "resume", label: "Resume" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-sm font-medium transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="mailto:Sivaneshgk2001@gmail.com" className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-blue-500 hover:text-blue-500 ${
              isDark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"
            }`} title="Email">
              ✉️
            </a>
            <button onClick={onHire}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
              Hire Me
            </button>
          </div>
        </div>

        <div className={`mt-8 pt-6 border-t text-center text-xs ${isDark ? "border-white/5 text-gray-600" : "border-gray-100 text-gray-400"}`}>
          © {new Date().getFullYear()} Sivanesh K · Built with React & Tailwind CSS · Chennai, India
        </div>
      </div>
    </footer>
  );
}