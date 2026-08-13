# Murthy Ateliers — MAv2

React + Vite frontend for the Murthy Ateliers heirloom jewelry website.

## Tech Stack

- React 19, React Router v7, Framer Motion
- Vite 8, PostCSS, Autoprefixer
- EmailJS (contact forms)
- Deployed on **Render** (Static Site)

---

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
# Output → dist/
```

---

## Deploying to Render

1. Push the repo to GitHub.
2. In the Render dashboard → **New → Static Site**.
3. Connect the repository and set:

| Setting | Value |
|---|---|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4. Under **Environment Variables**, add:

| Key | Value |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | your EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | your EmailJS public key |

5. Click **Create Static Site**. Render will build and deploy automatically on every push to the main branch.

> **SPA routing** is handled by `public/_redirects` — all paths fall back to `index.html` so React Router handles client-side navigation correctly.

---

## Environment Variables

Copy `.env.example` to `.env` for local development and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Never commit `.env` — it is listed in `.gitignore`.
