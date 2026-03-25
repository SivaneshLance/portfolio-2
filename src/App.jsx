import { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import ResumePage from "./components/resumepage";
import Contact from "./components/contact";
import HireModal from "./components/hiremodal";
import Footer from "./components/footer";

export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [themeMode, setThemeMode] = useState("light"); // 'light' | 'dark' | 'system'
  const [activePage, setActivePage] = useState("home");
  const [hireOpen, setHireOpen] = useState(false);

  useEffect(() => {
    const applyTheme = () => {
      if (themeMode === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      } else {
        setTheme(themeMode);
      }
    };
    applyTheme();

    if (themeMode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", applyTheme);
      return () => mq.removeEventListener("change", applyTheme);
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      <div className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
        <Navbar activePage={activePage} setActivePage={setActivePage} onHire={() => setHireOpen(true)} />
        <main>
          {activePage === "home" && (
            <>
              <Hero onHire={() => setHireOpen(true)} setActivePage={setActivePage} />
              <About />
              <Projects />
            </>
          )}
          {activePage === "resume" && <ResumePage />}
          {activePage === "contact" && <Contact />}
        </main>
        <Footer setActivePage={setActivePage} onHire={() => setHireOpen(true)} />
        {hireOpen && <HireModal onClose={() => setHireOpen(false)} />}
      </div>
    </ThemeContext.Provider>
  );
}