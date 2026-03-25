# Sivanesh K — Portfolio Website

A modern, professional portfolio built with **React + Tailwind CSS**.

## ✨ Features

- 🌊 **Liquid Drop Glassy Navbar** — animated glassmorphism with blur & gradient drop effect
- 🌗 **Light / Dark / System Theme** — default is Light, fully reactive
- 💼 **Hire Me Modal** — popup form that sends an email directly to your Gmail
- 📄 **Resume Page** — full resume rendered as a beautiful UI
- 📬 **Contact Form** — sends messages to your Gmail
- 🎨 **Black & Blue palette** — professional, modern design with Syne + DM Sans fonts

---

## 🚀 Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📧 Setting Up Email (EmailJS — FREE)

Both the **Hire Me** modal and the **Contact** form need EmailJS configured to actually send emails.

### Step 1 — Create EmailJS Account
Go to [https://www.emailjs.com](https://www.emailjs.com) and sign up for free.

### Step 2 — Add Gmail Service
- Dashboard → **Email Services** → **Add New Service** → Select **Gmail**
- Connect your Gmail account `Sivaneshgk2001@gmail.com`
- Note your **Service ID** (e.g. `service_abc123`)

### Step 3 — Create Two Email Templates

#### Template 1: Contact Form
- Dashboard → **Email Templates** → **Create New**
- Name: `Contact Form`
- Subject: `New Contact from {{from_name}}`
- Body:
```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```
- Note the **Template ID** (e.g. `template_contact`)

#### Template 2: Hire Me Form
- Create another template named `Hire Request`
- Subject: `🚀 Hiring Inquiry from {{company_name}} — {{role}}`
- Body:
```
HIRE REQUEST
====================
Company: {{company_name}}
Contact: {{contact_name}}
Email: {{from_email}}
Phone: {{phone}}
Role: {{role}}
Job Type: {{job_type}}
Budget: {{budget}}

Description:
{{description}}
```
- Note the **Template ID** (e.g. `template_hire`)

### Step 4 — Get Public Key
- Dashboard → **Account** → **General** → copy your **Public Key**

### Step 5 — Update the Code

Open `src/components/Contact.jsx` and replace:
```js
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";        // ← paste here
const EMAILJS_TEMPLATE_ID = "YOUR_CONTACT_TEMPLATE_ID"; // ← paste here
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";        // ← paste here
```

Open `src/components/HireModal.jsx` and replace:
```js
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";        // ← paste here
const EMAILJS_HIRE_TEMPLATE_ID = "YOUR_HIRE_TEMPLATE_ID"; // ← paste here
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";        // ← paste here
```

> **Fallback:** If EmailJS is not configured, both forms automatically open a pre-filled `mailto:` link so you never miss a message.

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx          # Entry point
    ├── App.jsx           # Root with ThemeContext + routing
    ├── index.css         # Global styles + Tailwind
    └── components/
        ├── Navbar.jsx    # Glassy liquid drop navbar + theme switcher
        ├── Hero.jsx      # Hero section with typewriter + animated card
        ├── About.jsx     # About + skills section
        ├── Projects.jsx  # Projects + certifications
        ├── ResumePage.jsx# Full resume page
        ├── Contact.jsx   # Contact form
        ├── HireModal.jsx # Hire Me popup form
        └── Footer.jsx    # Footer
```

---

## 🌐 Deployment

### Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the `dist/` folder to netlify.com
```

---

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` — blue palette is defined there
- **Fonts**: Syne (headings) + DM Sans (body) loaded from Google Fonts in `index.css`
- **Personal info**: All data is in the component files — search for "Sivanesh" to find them
