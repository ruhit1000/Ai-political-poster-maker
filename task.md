# Execution Checklist

- [x] **Part 1: Monorepo Setup & Infrastructure**
  - Initialize Turborepo with Next.js (web) and Express (api).
  - Set up shared packages (ESLint, shared-types).

- [x] **Part 2: Database & Backend Foundation**
  - Provision MongoDB Atlas cluster.
  - Set up Express middleware (Helmet, CORS).
  - Create Mongoose schemas (User, Template, Poster).

- [x] **Part 3: Authentication System**
  - Implement backend JWT auth endpoints (`/register`, `/login`, `/me`).
  - Create minimal frontend login/register pages.
  - Implement auth state management (Zustand/Context).

- [x] **Part 4: UI/UX Foundation & Design System**
  - Configure Tailwind CSS.
  - Build global layout (Navbar, Footer).
  - Create reusable UI components (Buttons, Inputs, Spinners).

- [x] **Part 5: Media Storage & File Uploads**
  - Set up Cloudinary/S3.
  - Create backend `/upload` endpoint (multer).
  - Build frontend image upload component with preview.

- [x] **Part 6: Template System & Seed Data**
  - Design 2–3 base templates (HTML/CSS for Puppeteer).
  - Write backend seed script for templates collection.
  - Build frontend Template Gallery page.

- [x] **Part 7: Core User Flow - Poster Creation Form**
  - Build multi-step form (Template -> Text -> Photos).
  - Implement client-side validation.

- [x] **Part 8: AI Integration (Gemini)**
  - Integrate `@google/generative-ai` in backend.
  - Design prompts for color/layout suggestions.

- [ ] **Part 9: Server-Side Rendering Pipeline**
  - Set up Puppeteer in Express.
  - Create `POST /api/posters/generate` endpoint.
  - Inject text/photos into hidden HTML and screenshot.
  - Upload result to Cloudinary/S3.

- [ ] **Part 10: Preview, Polling, & Export**
  - Implement polling/loading screen on frontend.
  - Build Regenerate flow.
  - Add High-res PNG Download functionality.

- [ ] **Part 11: User Dashboard & History**
  - Build `/dashboard` route on frontend.
  - Implement `GET /api/posters/user/:userId`.
  - Display grid of past posters.

- [ ] **Part 12: Deployment & Final Polish**
  - Deploy frontend to Vercel.
  - Deploy backend to Render/Railway (with Puppeteer support).
  - Final UI polish and mobile testing.
