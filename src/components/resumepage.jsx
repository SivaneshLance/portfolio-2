import { useTheme } from "../App";

function Section({ title, children, isDark }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-6">
        <h2 className={`text-lg font-black uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
      </div>
      {children}
    </div>
  );
}

function TimelineItem({ period, title, subtitle, desc, link, isDark }) {
  return (
    <div className="relative pl-6 pb-8 last:pb-0">
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40" />
      <div className={`absolute left-[4px] top-5 w-px h-full -mb-8 ${isDark ? "bg-gray-700" : "bg-gray-200"} last:hidden`} />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
        <div>
          <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
          <p className="text-blue-500 text-sm font-semibold">{subtitle}</p>
        </div>
        <span className={`text-xs font-mono px-2 py-1 rounded-lg shrink-0 ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
          {period}
        </span>
      </div>
      {desc && <p className={`text-sm leading-relaxed mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{desc}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-blue-500 hover:text-blue-400 font-medium">
          View Publication →
        </a>
      )}
    </div>
  );
}

export default function ResumePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className={`rounded-3xl p-8 mb-8 border relative overflow-hidden ${
          isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-lg shadow-blue-100"
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
          
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl shadow-blue-500/30 shrink-0">
              <span className="text-white font-black text-2xl">SK</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>Sivanesh K</h1>
              <p className="text-blue-500 font-semibold mt-1">ML Engineer · Full Stack Developer</p>
              <div className={`flex flex-wrap gap-4 mt-3 text-sm justify-center sm:justify-start ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="flex items-center gap-1">📍 Pallikaranai, Chennai – 600100</span>
                <span className="flex items-center gap-1">📞 +91 8220488520</span>
                <a href="mailto:Sivaneshgk2001@gmail.com" className="flex items-center gap-1 text-blue-500 hover:text-blue-400">
                  ✉️ Sivaneshgk2001@gmail.com
                </a>
              </div>
            </div>
            <div className="sm:ml-auto">
              <a
                href="mailto:Sivaneshgk2001@gmail.com?subject=Hiring Inquiry"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 block text-center whitespace-nowrap"
              >
                Download / Contact
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-2">
            <div className={`rounded-3xl p-8 border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              
              {/* Summary */}
              <Section title="Summary" isDark={isDark}>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Master of Engineering graduate with strong analytical and problem-solving skills, specializing in engineering design and project execution. Experienced in applying technical knowledge to optimize processes, manage projects, and collaborate with multidisciplinary teams. Seeking an engineering role to contribute innovative solutions and enhance operational efficiency.
                </p>
              </Section>

              {/* Education */}
              <Section title="Education" isDark={isDark}>
                <TimelineItem
                  period="2024 – 2026"
                  title="Master of Engineering in Computer Science"
                  subtitle="St Joseph's College of Engineering"
                  isDark={isDark}
                />
                <TimelineItem
                  period="2019 – 2023"
                  title="Bachelor of Engineering in Computer Science"
                  subtitle="Velammal Engineering College"
                  isDark={isDark}
                />
              </Section>

              {/* Projects */}
              <Section title="Projects" isDark={isDark}>
                <TimelineItem
                  period="2023"
                  title="Sales Prediction for Newly Launched Mobiles Using ML"
                  subtitle="Published — IJIRSET"
                  desc="Employs K-Mean clustering and Linear Regression on factors like brand, price, and features to forecast sales with highest prediction accuracy."
                  link="https://www.ijirset.com/upload/2023/ncact'23/69_Prediction.pdf"
                  isDark={isDark}
                />
                <TimelineItem
                  period="2024"
                  title="Smart Radiology System: Pneumonia Identification via VGG16-Enhanced CNN"
                  subtitle="Applied — IEEE Conference Paper"
                  desc="Develops a deep-learning based Smart Radiology System to automatically detect and classify pneumonia from chest X-ray images with improved diagnostic performance."
                  isDark={isDark}
                />
              </Section>

              {/* Internship */}
              <Section title="Internship" isDark={isDark}>
                <TimelineItem
                  period="1.1 Months"
                  title="RedHat Linux – System Administrator"
                  subtitle="Vectra Technosoft Pvt. Ltd."
                  desc="Learned Linux fundamentals and their application in practical settings including system administration and command-line operations."
                  isDark={isDark}
                />
              </Section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Skills */}
            <div className={`rounded-3xl p-6 border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className={`font-black text-sm uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                Technical Skills
              </h3>
              {["React JS", "Machine Learning", "Deep Learning", "Python", "Java", "C++", "PHP", "Linux"].map((s) => (
                <div key={s} className={`flex items-center gap-2 py-1.5 border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-100"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{s}</span>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className={`rounded-3xl p-6 border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className={`font-black text-sm uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                Languages
              </h3>
              {[
                { lang: "English", level: "Proficient" },
                { lang: "Tamil", level: "Native" },
                { lang: "Telugu", level: "Conversational" },
              ].map((l) => (
                <div key={l.lang} className="flex justify-between items-center py-1.5">
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{l.lang}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-blue-900/40 text-blue-300" : "bg-blue-50 text-blue-600"}`}>{l.level}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className={`rounded-3xl p-6 border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className={`font-black text-sm uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                Certifications
              </h3>
              {[
                { name: "Personal Expense Tracker", issuer: "IBM" },
                { name: "Java & C++ & PHP Crash Course", issuer: "Udemy" },
              ].map((c) => (
                <div key={c.name} className={`py-2 border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-100"}`}>
                  <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{c.name}</div>
                  <div className="text-xs text-blue-500">{c.issuer}</div>
                </div>
              ))}
            </div>

            {/* Soft Skills */}
            <div className={`rounded-3xl p-6 border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className={`font-black text-sm uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Communication", "Independent", "Analytical", "Problem Solving", "Team Player"].map((s) => (
                  <span key={s} className={`text-xs px-2 py-1 rounded-full border font-medium ${
                    isDark ? "border-blue-500/30 text-blue-300 bg-blue-900/20" : "border-blue-200 text-blue-700 bg-blue-50"
                  }`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}