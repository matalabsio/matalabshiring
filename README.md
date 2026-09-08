# Mata Labs Hiring

Fresh-graduate internship application form for website and app development roles (3–6 months, PPO path).

Built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. Submissions are stored in a **Notion** database.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notion setup

Full walkthrough (API key, database columns, connections, troubleshooting):

**→ [docs/NOTION_SETUP.md](docs/NOTION_SETUP.md)**

Quick checklist:

1. Create a [Notion Internal Integration](https://www.notion.so/my-integrations) → copy `NOTION_API_KEY`
2. Create the Applications database with the properties in that guide
3. Share / connect the database to the integration
4. Copy `NOTION_DATABASE_ID` from the database URL
5. Put both in `.env.local` and restart `npm run dev`

Without Notion env vars, local development still accepts submissions (logged only). Production requires Notion to be configured.

## API

`POST /api/applications` — validates and creates a Notion row.

Example body:

```json
{
  "fullName": "Jane Doe",
  "graduationYear": "2026",
  "developmentPreference": "Both Web & App",
  "techStack": "React, Next.js, Flutter",
  "bestProject": "Built a campus marketplace…",
  "projectLink": "https://github.com/jane/project",
  "resumeLink": "https://drive.google.com/file/d/...",
  "aiProficiency": "Comfortable — use AI coding to make tasks easier",
  "hyderabadHybrid": "Yes — comfortable with hybrid / office in Hyderabad",
  "whyHireYou": "I ship clean product features…"
}
```

Resume links must be Google Drive/Docs URLs set to **Anyone with the link**.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
