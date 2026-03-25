import { useState } from "react";
import { useTheme } from "../App";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_CONTACT_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    try {
      // EmailJS integration
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: "Sivaneshgk2001@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      // Fallback: open mailto
      const mailto = `mailto:Sivaneshgk2001@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)}`;
      window.open(mailto, "_blank");
      setStatus("success");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-300 ${
      isDark
        ? `bg-gray-800 text-white placeholder-gray-500 ${errors[field] ? "border-red-500" : "border-white/10 focus:border-blue-500"}`
        : `bg-gray-50 text-gray-900 placeholder-gray-400 ${errors[field] ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`
    } focus:ring-2 focus:ring-blue-500/20`;

  return (
    <section className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h1 className={`text-4xl md:text-5xl font-black mt-3 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Let's Work Together
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Have a project in mind or want to collaborate? I'd love to hear from you. Drop me a message!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info Panel */}
          <div className="md:col-span-2 space-y-4">
            {[
              { icon: "📧", label: "Email", value: "Sivaneshgk2001@gmail.com", href: "mailto:Sivaneshgk2001@gmail.com" },
              { icon: "📱", label: "Phone", value: "+91 8220488520", href: "tel:+918220488520" },
              { icon: "📍", label: "Location", value: "Pallikaranai, Chennai - 600100", href: null },
            ].map((item) => (
              <div
                key={item.label}
                className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:-translate-y-1 ${
                  isDark ? "bg-gray-900 border-white/10 hover:border-blue-500/30" : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-blue-500 hover:text-blue-400 break-all">{item.value}</a>
                  ) : (
                    <p className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-bold">Available for Hire</span>
              </div>
              <p className="text-xs text-blue-200 leading-relaxed">
                Open to full-time roles, internships, and freelance projects in ML, AI, and Full Stack development.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className={`p-8 rounded-3xl border ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-4xl">✅</div>
                  <h3 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Message Sent!</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>I'll get back to you soon. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass("name")} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email *</label>
                      <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass("email")} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Subject *</label>
                    <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass("subject")} />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project or opportunity..." className={`${inputClass("message")} resize-none`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </>
                    )}
                  </button>

                  <p className={`text-center text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Or email directly at{" "}
                    <a href="mailto:Sivaneshgk2001@gmail.com" className="text-blue-500 hover:text-blue-400">Sivaneshgk2001@gmail.com</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}