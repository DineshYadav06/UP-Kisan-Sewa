# UP Kisan Sewa

Hindi-first farmer information portal developed **for NDUAT, Kumarganj, Ayodhya**.  
Not a government (`gov.in`) website.

## Design direction

Research notes and rules: [`docs/frontend-design-system.md`](docs/frontend-design-system.md)

- Fonts: **Noto Sans Devanagari** + **Noto Sans** (DBIM)
- Hindi default, English toggle (`अ | A`)
- Official-style utility bar, green brand header, dark footer
- Source + last-updated on content blocks
- Official outbound links only (`.gov.in` / `.nic.in` / `nduat.org`)

## Run locally

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs

## Secrets

Never commit `.env`. Use `.env.example` as a template.  
If any password or API key was pasted in chat, **rotate it** in MongoDB Atlas / email provider immediately.

## Spec

Follow [`PROJECT_SPEC.md`](PROJECT_SPEC.md) and Cursor rule in `.cursor/rules/`.
