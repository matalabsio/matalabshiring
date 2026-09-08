# Google Sheets Setup — Mata Labs Hiring (Apps Script)

Each form submission is POSTed to a **Google Apps Script** web app, which appends one row to your spreadsheet.

Your sheet:  
https://docs.google.com/spreadsheets/d/1SQn3IChvOtZNckvF8VVYA4uE1hzy3VVN1W7wWqxAH3g/edit

**Important:** Use `openById(...)` (below). Do **not** rely on `getActiveSpreadsheet()` — web apps often write nowhere / to the wrong place, while Executions still show `doPost` Completed.

---

## Step 1 — Open Apps Script from THIS sheet

1. Open the spreadsheet above (MataLabs Hiring).
2. **Extensions → Apps Script** (so the project is bound to this file).
3. Delete old code and paste the script in Step 2.

---

## Step 2 — Paste this script

```javascript
var SPREADSHEET_ID = "1SQn3IChvOtZNckvF8VVYA4uE1hzy3VVN1W7wWqxAH3g";
var SHEET_NAME = "Applications";
var SECRET = ""; // optional

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return json_({ ok: false, error: "Unauthorized" });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "id",
        "submittedAt",
        "fullName",
        "email",
        "whatsappNumber",
        "graduationYear",
        "developmentPreference",
        "techStack",
        "bestProject",
        "projectLink",
        "resumeLink",
        "aiProficiency",
        "hyderabadHybrid",
        "whyHireYou",
      ]);
    }

    sheet.appendRow([
      data.id || "",
      data.submittedAt || new Date().toISOString(),
      data.fullName || "",
      data.email || "",
      data.whatsappNumber || "",
      data.graduationYear || "",
      data.developmentPreference || "",
      data.techStack || "",
      data.bestProject || "",
      data.projectLink || "",
      data.resumeLink || "",
      data.aiProficiency || "",
      data.hyderabadHybrid || "",
      data.whyHireYou || "",
    ]);

    return json_({ ok: true, sheet: SHEET_NAME, row: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Run this once from the editor (Run ▶) to verify the sheet gets a row */
function testAppend() {
  doPost({
    postData: {
      contents: JSON.stringify({
        id: "manual-test-1",
        submittedAt: new Date().toISOString(),
        fullName: "MANUAL TEST from Apps Script editor",
        email: "manual@test.com",
        whatsappNumber: "+919876543210",
        graduationYear: "2026",
        developmentPreference: "Both Web & App",
        techStack: "React",
        bestProject: "Editor testAppend — safe to delete.",
        projectLink: "https://github.com/example/test",
        resumeLink: "https://drive.google.com/file/d/test/view",
        aiProficiency: "Comfortable — use AI coding to make tasks easier",
        hyderabadHybrid: "Yes — comfortable with hybrid / office in Hyderabad",
        whyHireYou: "Verifying openById writes to the correct spreadsheet.",
      }),
    },
  });
}
```

4. **Save**.

---

## Step 3 — Authorize + quick local test

1. Select function **`testAppend`** → **Run**.
2. Approve Google permissions (Sheets access).
3. Open the spreadsheet → click tab **`Applications`** (not Sheet1).
4. You should see a header + **MANUAL TEST from Apps Script editor**.

---

## Step 4 — Redeploy (required after code change)

1. **Deploy → Manage deployments**
2. Edit (pencil) → **Version: New version**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. **Deploy**
6. Confirm `.env` still has the same `/exec` URL (or paste the new URL if it changed)

---

## Step 5 — Where to look

Data appears on the **`Applications`** tab — **not** on **Sheet1**.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Executions = Completed, Sheet1 empty | Open **Applications** tab |
| Executions = Completed, Applications empty | Script not using this file — paste script with `openById` + redeploy |
| Permission error on `openById` | Run `testAppend` once and grant access |
| Still old behavior after edit | Must create a **New version** deployment |

App env:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```
