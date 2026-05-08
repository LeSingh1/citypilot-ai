# CityPilot AI

**AI planning copilot for fast-growing cities.**

> Submitted to the Creator Colosseum Startup Competition · 2025

---

## What is CityPilot AI?

CityPilot AI helps small and midsize cities test infrastructure decisions before spending millions on formal studies.

Traditional feasibility studies cost $50K–$200K and take months. CityPilot AI gives planning teams scenario analysis in under a minute.

---

## Core Demo Flow

1. **Select Fremon City** — an AI-generated fast-growing suburb built for gap analysis
2. **Analyze Infrastructure Gaps** — AI detects emergency, transit, education, and green space gaps
3. **Apply AI Plan** — add the top-recommended infrastructure (e.g. South Emergency Gap Clinic)
4. **See Metrics Improve** — City Health 61 → 82, Emergency Access +12, Equity +8
5. **Generate Report** — planning memo with before/after metrics, cost estimates, and residents served

---

## Pitch Mode

Click **Pitch Mode** in the top bar to open the full startup pitch panel:

- Problem & market size
- Solution and product demo
- Before/after impact (City Health 61 → 82, 74K residents served)
- Customer segments (5 types)
- Business model (3 pricing tiers)
- Next steps

---

## Customer Segments

| Segment | Use Case |
|---|---|
| City Planning Departments | Early feasibility before expensive studies |
| School Districts | Enrollment growth and site capacity |
| Transit Agencies | Coverage gap analysis and route planning |
| Climate Resilience Teams | Green infrastructure and resilience mapping |
| Real Estate Developers | Infrastructure risk before land acquisition |

---

## Business Model

| Plan | Price | For |
|---|---|---|
| Starter | $299/mo | Small city simulations |
| Team | $999/mo | Planning departments |
| Enterprise | Custom | Regional agencies |

*(Demo pricing — not a payment integration)*

---

## ROI vs. Traditional Studies

| | Traditional | CityPilot AI |
|---|---|---|
| Analysis time | Weeks | Under 1 min |
| Feasibility report | $50K+ | Instant |
| Service gap map | Manual GIS | AI-generated |
| Before/after metrics | Estimated | Quantified |

---

## Tech Stack

- **React 18** + TypeScript
- **Vite** for fast dev server
- **Mapbox GL JS** / **MapLibre GL** for interactive city map
- **Framer Motion** for animations
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Lucide React** for icons

No backend required for the Fremon demo — runs entirely in the browser.

---

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The app starts on the CityPilot AI landing page. Click **Launch Demo — Fremon City** to begin the demo flow.

### Environment Variables

Copy `.env.example` to `.env.local` and add your Mapbox token:

```bash
cp .env.example .env.local
```

```env
VITE_MAPBOX_TOKEN=your_mapbox_public_token
```

---

## Submission Summary

**Product name:** CityPilot AI

**Subtitle:** AI planning copilot for fast-growing cities

**Hackathon:** Creator Colosseum Startup Competition 2025

**Core claim:** CityPilot AI analyzed a fast-growing city, detected service gaps, recommended infrastructure, improved City Health from 61 to 82, and generated a planning memo in under a minute.

**Demo:** Select Fremon City → Analyze → Apply AI Plan → See metrics improve → Generate Report → Open Pitch Mode for investor presentation

**GitHub:** See `/src/components/UI/LandingScreen.tsx`, `PitchModeModal.tsx`, `PlanningReportModal.tsx`

---

## File Structure

```
src/
  components/
    UI/
      LandingScreen.tsx      — startup landing with hero, customers, pricing, ROI
      PitchModeModal.tsx     — 7-slide pitch mode panel
      PlanningReportModal.tsx — investor-ready planning report
    Layout/
      TopBar.tsx             — nav with Pitch Mode button
      RightPanel.tsx         — AI copilot with business value framing
  data/
    fremonDemo.ts            — Fremon city scenario data
    staticCities.ts          — city profiles
  stores/
    simulationStore.ts       — planning state and demo logic
```
