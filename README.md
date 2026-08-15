# rt.captured.on.film

A static photography portfolio/catalogue website — "Raffoul Traboulsy — Photography Catalogue." Built with plain HTML, CSS, and vanilla JavaScript (no build tools or frameworks required).

## ✨ Features

- **`index.html`** — Main landing page / photography catalogue with filterable card grid (Series / Session).
- **`photography.html`** — Photography section page.
- **`calm-and-informative.html`** — A themed gallery page.
- **`admin.html`** — A lightweight, client-side admin panel to add/edit/remove catalogue cards. Data is persisted in the browser's `localStorage` (no backend/server required).
- **`admin-cards.js`** — Renders catalogue cards saved by the admin panel onto the main page.
- **`images/`** — All image assets used across the site.

## 🚀 Getting Started

Since this is a static site, you can run it locally with any simple web server, for example:

```bash
# Using Python
python -m http.server 8000

# Or using Node's http-server (npm install -g http-server)
http-server .
```

Then open `http://localhost:8000` in your browser.

You can also just open `index.html` directly in a browser, though some features (like `localStorage` persistence) work best when served over HTTP rather than the `file://` protocol.

## 🔐 Admin Panel

The `admin.html` page includes a simple password gate (default password: `admin`) purely as a convenience lock for managing catalogue cards from the browser — it is **not** a real security mechanism since everything runs client-side. Anyone with access to the browser/computer can view or bypass it. Do not use this for sensitive data.

## 📦 Deployment

Since the site is 100% static, it can be deployed for free on:
- **GitHub Pages**
- **Netlify**
- **Vercel**

## 📄 License

This project is provided as-is for personal/portfolio use.
