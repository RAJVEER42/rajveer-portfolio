# Rajveer Bishnoi — Portfolio

Personal portfolio site for Rajveer Bishnoi — open-source contributor and full-stack / AI engineer.

Live: _deployed on Vercel_

## Highlights

- **60+ merged open-source pull requests** across GRASS GIS (OSGeo), FOSSology (Linux Foundation) and QGIS.
- Projects spanning real-time platforms, RAG systems, LLM agents and backend systems.
- Admitted to the Apple Developer Academy (Università Federico II with Apple, 2026–27).

## Tech

Plain **HTML, CSS and JavaScript** — no build step, no framework. Fast, accessible and easy to host.

- Light / dark theme with system preference + manual toggle (persisted in `localStorage`)
- Responsive layout, keyboard-accessible navigation
- Scroll-reveal animations via `IntersectionObserver` (respects `prefers-reduced-motion`)
- Inter + JetBrains Mono via Google Fonts

## Structure

```
.
├── index.html      # markup and content
├── styles.css      # theme + layout
├── main.js         # theme toggle, nav, reveal animations
├── favicon.svg
└── assets/
    └── Rajveer_Bishnoi_Resume.pdf
```

## Run locally

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Deploy

Deployed as a static site on Vercel. Any static host works — no configuration required.

## Contact

- Email — irajveer.bishnoi2310@gmail.com
- GitHub — [@RAJVEER42](https://github.com/RAJVEER42) · [@Valyrian-Code](https://github.com/Valyrian-Code)
- LinkedIn — [rajveer-bishnoi](https://www.linkedin.com/in/rajveer-bishnoi-576b62356)
