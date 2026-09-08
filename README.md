# Mata Labs Hiring

Fresh-graduate internship application form for website and app development roles (3–6 months, PPO path).

Built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. Submissions are stored in a **Google Sheet** via an **Apps Script** webhook.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets setup (Apps Script)

**→ [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md)**

1. Open your spreadsheet → **Extensions → Apps Script** → paste `doPost`
2. **Deploy → Web app** (Execute as Me, Who has access: Anyone)
3. Put the web app URL in `.env.local` as `GOOGLE_SHEETS_WEBHOOK_URL`
4. Restart `npm run dev`

Without the webhook URL, local development still accepts submissions (logged only). Production requires the webhook.

Optional later: CSV download → Notion import — [docs/NOTION_SETUP.md](docs/NOTION_SETUP.md).

## API

`POST /api/applications` — validates and forwards a row to Google Sheets.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
