# Sakib — Portfolio Landing Page

React + Vite + Tailwind CSS (v3) · `@lucasmarkes/hairline` figures · Notion-style light design · installable PWA.

```bash
npm install
npm run dev
npm run build && npm run preview   # PWA (service worker) only runs on the production build
```

- Content (projects, links, timeline, skills): top of `src/App.jsx`
- Design tokens: `tailwind.config.js`; figure colours: `src/index.css`
- PWA: `public/manifest.webmanifest`, `public/sw.js`, install logic in `src/usePwaInstall.jsx`
- Icons: `public/icon-*.png`, `apple-touch-icon.png`, `favicon.ico`
- Deploy on a host that serves `/` for all routes over HTTPS (Vercel, Netlify…); PWA install needs HTTPS.

## Contact form
Uses Web3Forms (same access key as the portfolio). Override with `VITE_WEB3FORMS_KEY` in a `.env` file.

## 404
Any path other than `/` renders the hairline 404 page. `vercel.json` and `public/_redirects` serve the app for all paths.
