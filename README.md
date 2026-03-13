# Quokka's Wild Life — Epipheo Case Study Landing Page

A polished, production-ready landing page for Epipheo's "Quokka's Wild Life" animated series case study. Built to attract potential clients who want to hire Epipheo as an animated series production company.

## Stack

- **Frontend:** React 19 + TypeScript + Tailwind CSS 4
- **Build:** Vite 7
- **Server:** Express 4 (production static server)
- **Fonts:** Barlow Condensed, DM Sans, Space Mono (Google Fonts)
- **Form:** HubSpot embedded form (Portal 20864859)

## Design

- Pure black base (#000), cyan accent (#00E5CC), orange-red accent (#FF5F3C)
- Barlow Condensed ExtraBold ALL CAPS for headlines
- DM Sans for body text, Space Mono for labels
- Full-bleed sections, pill CTAs, modern editorial style
- Scroll-triggered animations via Intersection Observer
- Animated counters for stats section

## Sections

1. **Nav** — Fixed, transparent → blur on scroll
2. **Hero** — Full-screen forest background with gradient overlay
3. **Character Showcase** — 6 animated characters with names
4. **Watch Banner** — Link to Angel Studios
5. **Stats Bar** — 4 animated counters
6. **Proof / Playbook** — 6-step vertical timeline
7. **Angel Studios** — Distribution platform section
8. **What We Bring** — 3 capability cards
9. **Who This Is For** — Audience segments + journey timeline
10. **CTA** — HubSpot form with desert background
11. **Footer** — Minimal with Epipheo branding

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deploy to Railway

### Option 1: Dockerfile (recommended)
Railway will auto-detect the Dockerfile and build accordingly.

### Option 2: Nixpacks
Railway can also use nixpacks.toml for builds.

### Option 3: Manual
```bash
pnpm install
pnpm build
NODE_ENV=production node dist/index.js
```

The server listens on `PORT` environment variable (default: 3000).

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | - | Set to `production` for production builds |

## Image Assets

All images are served from CloudFront CDN. No local image files needed.

## License

MIT
