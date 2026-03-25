import { useState, useEffect } from "react";
import { useTheme } from "../App";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_HIRE_TEMPLATE_ID = "YOUR_HIRE_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const roles = ["Full Stack Developer", "ML Engineer", "React Developer", "AI/Deep Learning", "Data Scientist", "Intern", "Other"];

export default function HireModal({ onClose }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    jobType: "full-time",
    budget: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.contactName.trim()) errs.contactName = "Contact name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.role) errs.role = "Please select a role";
    if (!form.description.trim()) errs.description = "Please describe the opportunity";
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
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_HIRE_TEMPLATE_ID,
        {
          company_name: form.companyName,
          contact_name: form.contactName,
          from_email: form.email,
          phone: form.phone || "Not provided",
          role: form.role,
          job_type: form.jobType,
          budget: form.budget || "Not specified",
          description: form.description,
          to_email: "Sivaneshgk2001@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch {
      // Fallback: mailto
      const body = `
Hire Request from ${form.companyName}
--------------------------------------
Contact: ${form.contactName}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Role: ${form.role}
Job Type: ${form.jobType}
Budget: ${form.budget || "Not specified"}

Description:
${form.description}
      `;
      window.open(
        `mailto:Sivaneshgk2001@gmail.com?subject=${encodeURIComponent(`Hiring Inquiry from ${form.companyName} - ${form.role}`)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );
      setStatus("success");
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 ${
      isDark
        ? `bg-gray-800 text-white placeholder-gray-500 ${errors[field] ? "border-red-500" : "border-white/10 focus:border-blue-500"}`
        : `bg-gray-50 text-gray-900 placeholder-gray-400 ${errors[field] ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`
    } focus:ring-2 focus:ring-blue-500/20`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl z-10 ${
          isDark ? "bg-gray-950 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-8 pt-8 pb-6 border-b backdrop-blur-xl"
          style={{
            background: isDark ? "rgba(3,7,18,0.95)" : "rgba(255,255,255,0.95)",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(229,231,235,1)",
          }}
        >
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isDark ? "bg-white/10 hover:bg-white/20 text-gray-400" : "bg-gray-100 hover:bg-gray-200 text-gray-500"
            }`}
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-black">SK</span>
            </div>
            <div>
              <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                Hire Sivanesh K
              </h2>
              <p className={`text-sm mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Fill in the details — I'll get back to you within 24 hours 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Form / Success */}
        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-5xl">🎉</div>
              <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Request Sent!</h3>
              <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Your hiring inquiry has been sent to Sivanesh. Expect a reply within 24 hours!
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company info */}
              <div>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                  Company Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Company Name *</label>
                    <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Acme Corp" className={inputClass("companyName")} />
                    {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Your Name *</label>
                    <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="John Doe" className={inputClass("contactName")} />
                    {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email *</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass("email")} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" className={inputClass("phone")} />
                  </div>
                </div>
              </div>

              {/* Role info */}
              <div>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                  Role Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Role / Position *</label>
                    <select name="role" value={form.role} onChange={handleChange} className={inputClass("role")}>
                      <option value="">Select a role...</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Job Type</label>
                    <div className="flex gap-2">
                      {["full-time", "part-time", "freelance", "intern"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, jobType: t })}
                          className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all capitalize ${
                            form.jobType === t
                              ? "bg-blue-500 border-blue-500 text-white"
                              : isDark
                              ? "border-white/10 text-gray-400 hover:border-blue-500/30"
                              : "border-gray-200 text-gray-500 hover:border-blue-300"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Budget / Salary Range</label>
                    <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹5–8 LPA or Negotiable" className={inputClass("budget")} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Describe the Opportunity *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about the role, your company, what you're looking for, and how Sivanesh would contribute..."
                  className={`${inputClass("description")} resize-none`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Submit */}
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
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    Send Hiring Request
                    <span>📨</span>
                  </>
                )}
              </button>

              <p className={`text-center text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                Your message will be sent directly to Sivaneshgk2001@gmail.com
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}