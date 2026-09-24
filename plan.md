# AI Political Poster Maker - Project Plan

## 1. Overview
A web platform where users (local political workers, committee members, publicity agents) generate ready-to-print political posters by filling a form and letting AI (Gemini) compose/edit the poster layout automatically, in the style of typical Bangladeshi political posters.

## 2. Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS
- **Backend:** Express.js (TypeScript)
- **Database:** MongoDB (Mongoose)
- **AI:** Google Gemini API
- **File Storage:** Cloudinary or S3-compatible bucket
- **Auth:** JWT (email/password)
- **Rendering Engine:** Puppeteer or node-canvas (Server-side rendering for precise Bangla text)

## 3. Project Architecture: Monorepo Structure
Using Turborepo or npm workspaces to manage frontend, backend, and shared resources in a single repository.

```text
ai-political-poster-maker/
├── apps/
│   ├── web/                # Next.js Frontend
│   └── api/                # Express.js Backend
├── packages/
│   ├── shared-types/       # TypeScript interfaces shared across apps
│   ├── ui/                 # Reusable UI components
│   └── eslint-config/      # Shared linting rules
├── package.json
└── turbo.json
```

## 4. UI/UX Design Philosophy
- **Mobile-First:** Large touch targets, easy photo upload flows.
- **Progressive Disclosure:** Multi-step form (wizard) for poster generation.
- **Clean & Minimal:** Distraction-free editor interface.
- **Typography:** Sans-serif font (Inter/Roboto) for the UI; stylize Bangla fonts (Kalpurush, SolaimanLipi) strictly for the generated posters.

## 5. Gemini Integration Approach (Option B)
AI is used for layout/aesthetics (color palettes, decorative motifs, photo cropping guidance). The actual rendering is done server-side via HTML/Canvas (Puppeteer) to ensure clean, correctly-spelled Bangla text, which is a common failure point for pure AI image generation.
