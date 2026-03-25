import { useTheme } from "../App";

const skills = [
  { name: "React JS", level: 75, color: "#61dafb" },
  { name: "Machine Learning", level: 80, color: "#3b82f6" },
  { name: "Deep Learning / CNN", level: 78, color: "#2563eb" },
  { name: "Python", level: 82, color: "#1d4ed8" },
  { name: "Java", level: 70, color: "#60a5fa" },
  { name: "RedHat Linux", level: 65, color: "#3b82f6" },
];

const highlights = [
  { icon: "🎓", title: "M.E in CSE", desc: "St Joseph's College of Engineering, 2024–2026" },
  { icon: "🔬", title: "IEEE Research", desc: "Applied for IEEE Paper on Smart Radiology System" },
  { icon: "📊", title: "Published Journal", desc: "Sales Prediction ML paper – IJIRSET 2023" },
  { icon: "🏢", title: "Industry Experience", desc: "RedHat Linux SysAdmin at Vectra Technosoft" },
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-24 relative ${isDark ? "bg-gray-900/50" : "bg-blue-50/50"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">About Me</span>
          <h2 className={`text-4xl md:text-5xl font-black mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            The Story Behind the Code
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Bio + Highlights */}
          <div>
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              I'm a passionate Computer Science engineer pursuing my Master's degree at St Joseph's College of Engineering, Chennai. 
              My journey spans from building intelligent ML models for sales prediction to developing smart medical diagnosis systems using deep learning.
            </p>
            <p className={`text-lg leading-relaxed mb-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              I thrive at the intersection of software development and artificial intelligence — creating solutions that are not just functional, but impactful.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className={`p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? "bg-gray-800/60 border-white/10 hover:border-blue-500/30"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-blue-100"
                  }`}
                >
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <div className={`font-bold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{h.title}</div>
                  <div className={`text-xs leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Skills */}
          <div>
            <h3 className={`text-xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
              Technical Proficiency
            </h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{skill.name}</span>
                    <span className="text-sm font-bold text-blue-500">{skill.level}%</span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, #1d4ed8, ${skill.color})`,
                        boxShadow: `0 0 10px ${skill.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tag cloud */}
            <div className="mt-10">
              <h4 className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Also familiar with</h4>
              <div className="flex flex-wrap gap-2">
                {["C++", "PHP", "K-Means", "Linear Regression", "VGG16", "CNN", "Linux CLI", "IBM Cloud"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      isDark
                        ? "bg-blue-900/30 border-blue-500/30 text-blue-300"
                        : "bg-blue-50 border-blue-200 text-blue-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}