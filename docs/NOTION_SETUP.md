# Notion Setup — Start From Scratch (Mata Labs Hiring)

Do these steps **in order**. Skipping Share/Content access is why the API failed before.

You need only two values in `.env`:

```bash
NOTION_API_KEY=ntn_...
NOTION_DATABASE_ID=...
```

---

## Step 0 — Clean start (optional but recommended)

1. Keep your existing integration **MataLabsHiring** (or create a new one).
2. Open your hiring page. If it’s confusing, delete the old page and create a fresh one in the next step.

---

## Step 1 — Create a real **database** (table)

1. In Notion, click **New page**.
2. Title it: `MataLabsHiring`.
3. Type `/table` and choose **Table – Full page**  
   (must be a **database table**, not a blank page).
4. You should see a table with a **Name** column.

### Add these properties (exact names)

Click **+** next to the columns and add:

| Property name | Type |
| --- | --- |
| Name | Title (already there — rename if needed) |
| Graduation Year | Text |
| Development Preference | Text |
| Tech Stack | Text |
| Best Project | Text |
| Project Link | URL |
| Resume Link | URL |
| AI Proficiency | Text |
| Hyderabad Hybrid | Text |
| Why Hire You | Text |
| Submitted At | Date |

---

## Step 2 — Create / open the Internal Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)  
   (or Developer tools → Connections).
2. Open **MataLabsHiring** (or **+ New integration**).
3. On **Configuration**, enable:
   - Read content
   - Update content
   - **Insert content**
4. Copy the **Access token** (`ntn_...`).  
   This is `NOTION_API_KEY`.

> Capabilities alone are **not** enough. Step 3 is mandatory.

---

## Step 3 — Connect the database to the integration (CRITICAL)

Do **one** of these:

### A) From the database page (easiest)

1. Open the **MataLabsHiring** table page.
2. Click **Share** (top right).
3. In the invite box, type: `MataLabsHiring`.
4. Select the **integration** (not a person).
5. Click **Invite** / **Confirm**.

You should now see **MataLabsHiring** listed under Share/Connections.

### B) From the integration “Content access” tab

1. Open the integration → **Content access**.
2. Add / allow the **MataLabsHiring** database page.

If this step is skipped, the API will say `object_not_found` and search will show **0 objects**.

---

## Step 4 — Copy the Database ID

1. Open the **table** as a full page.
2. Click **Copy link**.
3. From a URL like:

```text
https://app.notion.com/p/MataLabsHiring-3d5e995156ee803a8f23fca8a57549d3
```

the ID is the 32-character hex at the end:

```text
3d5e995156ee803a8f23fca8a57549d3
```

That is `NOTION_DATABASE_ID`.

---

## Step 5 — Put keys in `.env`

In the project root, create/update **`.env`** (or `.env.local`):

```bash
NOTION_API_KEY=ntn_your_token_here
NOTION_DATABASE_ID=your_32_char_id_here
```

- Do **not** put real tokens in `.env.example`
- Do **not** commit `.env` (already gitignored)

---

## Step 6 — Test

Tell the assistant **“retry notion test”**, or submit the hiring form locally after `npm run dev`.

**Success looks like:**
- A new row appears in the Notion table (e.g. test user name)
- API no longer returns `object_not_found`

**Still failing?**
- Share/Connections still missing the integration → redo Step 3
- Wrong ID (page vs table) → copy link from the **table** full page again
- Property name typo → fix column names in Step 1

---

## Checklist

- [ ] Full-page **Table** database created
- [ ] All property names/types added
- [ ] Integration token copied (`ntn_...`)
- [ ] Insert/Read/Update content enabled
- [ ] Database **shared** with integration (Share or Content access)
- [ ] Database ID in `.env`
- [ ] Test row appears in Notion
