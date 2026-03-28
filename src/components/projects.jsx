import { useTheme } from "../App";

const projects = [
  {
    title: "Sales Prediction for Newly Launched Mobiles",
    type: "Published Journal",
    badge: "IJIRSET 2023",
    badgeColor: "#22c55e",
    tags: ["Machine Learning", "K-Means", "Linear Regression", "Python"],
    description:
      "Research examining factors like brand, price, and features to forecast mobile sales. Employs K-Mean clustering and Linear Regression to attain highest prediction accuracy.",
    link: "https://www.ijirset.com/upload/2023/ncact'23/69_Prediction.pdf",
    icon: "📱",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    title: "Smart Radiology System: Pneumonia Identification",
    type: "IEEE Paper Published",
    badge: "Conference 2025",
    badgeColor: "#3b82f6",
    tags: ["Deep Learning", "VGG16", "CNN", "Medical AI"],
    description:
      "Develops a Smart Radiology System to identify pneumonia using a VGG16-enhanced CNN model on chest X-ray images. Enables faster and more reliable medical decision-making with high accuracy.",
    link: "https://ieeexplore.ieee.org/document/11436696",
    icon: "🫁",
    gradient: "from-blue-700 to-indigo-800",
  },
];

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className={`text-4xl md:text-5xl font-black mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isDark
                  ? "bg-gray-900 border-white/10 hover:border-blue-500/40 hover:shadow-blue-500/10"
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-blue-100"
              }`}
            >
              {/* Header gradient */}
              <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                <span className="text-6xl opacity-30">{project.icon}</span>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3), transparent)",
                  }}
                />
                {/* Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: project.badgeColor + "cc", backdropFilter: "blur(8px)" }}
                >
                  {project.badge}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm">
                  {project.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-black mb-3 leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDark ? "bg-blue-900/40 text-blue-300" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    View Publication
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                ) : (
                  <span className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    📋 Conference submission pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications section */}
        <div className="mt-16">
          <h3 className={`text-2xl font-black text-center mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { name: "Personal Expense Tracker Application", issuer: "IBM", icon: "🏆" },
              { name: "Java, C++ & PHP Crash Course", issuer: "Udemy", icon: "📜" },
            ].map((cert) => (
              <div
                key={cert.name}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${
                  isDark ? "bg-gray-800/60 border-white/10" : "bg-white border-gray-200"
                }`}
              >
                <span className="text-3xl">{cert.icon}</span>
                <div>
                  <div className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{cert.name}</div>
                  <div className="text-xs text-blue-500 font-semibold">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}