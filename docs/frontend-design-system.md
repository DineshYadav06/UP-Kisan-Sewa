# UP Kisan Sewa — Frontend Design System

**Based on research of:** agridarshan.up.gov.in, agriculture.up.gov.in, mkisan.gov.in, india.gov.in / Farmers Portal patterns, nduat.org, MeitY Digital Brand Identity Manual (DBIM) 3.0, Guidelines for Indian Government Websites (GIGW 3.0).

**Important legal note:** This portal is developed **for NDUAT, Kumarganj, Ayodhya**. It is **not** a `gov.in` site. Do **not** use the State Emblem of India, do **not** use the word “Sarkari”, and do **not** imply this is an official UP Government portal. Design language follows DBIM/GIGW *patterns* for trust and accessibility; branding is NDUAT / UP Kisan Sewa.

---

## 1. What official portals do (and what we copy)

| Pattern | Seen on | Our rule |
|---|---|---|
| Top utility strip: Skip to content, font size, language | india.gov.in, agridarshan, GIGW | Always present |
| Hindi first + English toggle (`अ \| A`) | DBIM §7.5, UP agri sites | Default `hi`, persist choice |
| Dense service tiles (not marketing hero) | agridarshan, mkisan | Quick services grid |
| Announcements / notices list | nduat.org, agridarshan | Text-first, dated |
| Helpline card | UP agri / KCC 1800-180-1551 | Verify before launch |
| Source + last-updated on content | Project spec + trust | Every detail page |
| Footer: org address, links, disclaimer | All gov portals | Dark key-colour footer |
| Large touch targets, 16px+ body | GIGW / WCAG | Mobile-first |

## 2. What we deliberately avoid (AI / startup look)

- Purple / indigo gradients, glassmorphism, neon glow
- Floating badge stickers on hero media
- Stock Unsplash farmers as “real” content
- Inter / Roboto / Arial as brand fonts
- Card soup on the home first screen
- Fake government seals or Ashoka Chakra

## 3. Typography (official)

Per DBIM: **Noto Sans** + **Noto Sans Devanagari** (self-hosted via `@fontsource`).

| Role | Font | Desktop | Mobile |
|---|---|---|---|
| H1 | Noto Sans Devanagari / Noto Sans, Bold | 36px | 24px |
| H2 | SemiBold | 24px | 20px |
| H3 | Medium | 20px | 16px |
| Body | Regular | 16px | 16px (min) |
| Meta / captions | Regular | 14px | 14px |

Stack: `'Noto Sans Devanagari', 'Noto Sans', sans-serif`

## 4. Colour (DBIM functional + NDUAT green key)

**Functional palette (exact DBIM Table 1):**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--linen` | `#EBEAEA` | Subtle panels, outlines |
| `--text` | `#150202` | Body text (not pure black) |
| `--success` | `#198754` | Success status |
| `--warning` | `#FFC107` | Warning |
| `--danger` | `#DC3545` | Error |
| `--info` | `#0D6EFD` | Links / info |
| `--grey-01` | `#C6C6C6` | Borders |
| `--grey-02` | `#8E8E8E` | Secondary text |
| `--grey-03` | `#606060` | Muted |

**Primary green group (agriculture / NDUAT extension — documented choice; DBIM Toolkit hex plate is SSO-gated):**

| Token | Hex | Use |
|---|---|---|
| `--brand-key` | `#0B3D2E` | Footer, key icons (darkest) |
| `--brand` | `#146C43` | Header bar, primary buttons |
| `--brand-mid` | `#1B7A4E` | Hover / accents |
| `--brand-soft` | `#E8F5EE` | Soft backgrounds, selected chips |

Saffron accent strip (`#FF671F`) only as a thin top identity line (tricolour cue), **not** as fill for large areas.

## 5. Layout anatomy

1. **Skip link** → main content  
2. **Utility bar** — font A− / A / A+, language `अ | A`, search  
3. **Brand bar** — NDUAT wordmark text + “UP Kisan Sewa” (logo image only after written permission)  
4. **Primary nav** — services, not marketing slogans  
5. **Main** — one job per section  
6. **Footer** — `--brand-key`, address, official outbound links, disclaimer, last updated  

## 6. Images & logos

- Prefer NDUAT / department photos with `credit` + `permission_ref`.  
- Until permission: use solid brand panels + SVG icons (Lucide-style line icons in brand key colour). **No dummy crop photos labeled as real.**  
- Never hotlink Google Images / other universities.  
- Outbound official links only: `.gov.in`, `.nic.in`, `nduat.org`.

## 7. Bilingual UX

- `i18next` with `hi` default, `en` optional.  
- `document.documentElement.lang` switches with language.  
- Language control always in utility bar.  
- Hindi strings use Unicode Devanagari; test layout at 360px.

## 8. Allowed official link destinations (examples)

- https://www.nduat.org/  
- https://agriculture.up.gov.in/  
- https://agridarshan.up.gov.in/  
- https://mkisan.gov.in/  
- https://www.india.gov.in/topics/agriculture  
- https://pmkisan.gov.in/  
- https://agmarknet.gov.in / data.gov.in (mandi)  

Do **not** use commercial tutorial sites (e.g. toprankers) or random font demo pages as content sources.
