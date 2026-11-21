# UP Kisan Sewa — Project Specification (Draft v1)

**Developer:** Akhil Yadav  
**Institution:** Acharya Narendra Deva University of Agriculture and Technology (NDUAT), Kumarganj, Ayodhya

## 1. Overview

Hindi-first web portal for farmers of Uttar Pradesh under NDUAT. Provides verified crop information, mandi prices, weather links, schemes, trainings, advisories, videos, KVK directory, and expert questions. Admin panel for university team.

**Goals:** trusted, simple, mobile-first, slow-internet friendly, every content item has source + last-updated.

**Non-goals (v1):** payments, ads, marketplace, native app.

**Critical rules:**
- Never invent farming advice, doses, pesticide names, scheme rules, or prices.
- Missing content → labeled: `Sample content - pending approval from NDUAT`.
- Content fields: `source`, `approved_by`, `approved_at`, `updated_at`, `status` (`draft` / `in_review` / `published` / `archived`). Only `published` is public.
- Public pages show **Source** and **Last updated**.
- Site is for NDUAT; **not** a government (`gov.in`) site. No emblems, no word “Sarkari”. Footer: `Developed for NDUAT, Kumarganj, Ayodhya` (developer credit only if university approves).

## 2. Tech stack

- Frontend: React + TypeScript (strict) + Vite + Tailwind, React Router, TanStack Query, RHF + Zod, i18next (hi default).
- Backend: FastAPI, Pydantic v2, Motor, JWT, bcrypt, slowapi.
- DB: MongoDB Atlas. Indexes in code.
- Email: Brevo/Resend via EmailService interface.
- Hosting: Vercel (FE), Render (BE), GitHub Actions cron.
- Quality: ruff + pytest; eslint + prettier + vitest.

## 3–15. Full product requirements

See original master build prompt sections for folder structure, data sources, roles, pages, APIs, mandi sync, security, phases, and definition of done. Design details: `docs/frontend-design-system.md`.

## Quick phase order

1. Scaffold  
2. Auth + approval  
3. Admin foundation  
4. Content modules  
5. Mandi + weather  
6. Questions + notifications  
7. Polish + launch  

Before live content: written NDUAT permission + named nodal officer.
