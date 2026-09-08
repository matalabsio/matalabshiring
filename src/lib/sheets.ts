import type { Application } from "./types";

export const SHEET_HEADERS = [
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
] as const;

function getWebhookConfig() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim() || "";
  return { webhookUrl, secret };
}

export function isSheetsConfigured(): boolean {
  return Boolean(getWebhookConfig().webhookUrl);
}

/**
 * Sends one application to a Google Apps Script web app,
 * which appends a row to the hiring spreadsheet.
 *
 * In development without env vars, skips the write and returns.
 * In production, missing config or webhook failures throw.
 */
export async function appendApplicationRow(
  application: Application,
): Promise<void> {
  const { webhookUrl, secret } = getWebhookConfig();

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Google Sheets webhook is not configured. Set GOOGLE_SHEETS_WEBHOOK_URL.",
      );
    }

    console.warn(
      "[sheets] GOOGLE_SHEETS_WEBHOOK_URL missing — skipping write in development.",
    );
    return;
  }

  const payload = {
    secret: secret || undefined,
    id: application.id,
    submittedAt: application.createdAt,
    fullName: application.fullName,
    email: application.email,
    whatsappNumber: application.whatsappNumber,
    graduationYear: application.graduationYear,
    developmentPreference: application.developmentPreference,
    techStack: application.techStack,
    bestProject: application.bestProject,
    projectLink: application.projectLink,
    resumeLink: application.resumeLink,
    aiProficiency: application.aiProficiency,
    hyderabadHybrid: application.hyderabadHybrid,
    whyHireYou: application.whyHireYou,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await response.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      // Apps Script sometimes returns HTML on misconfigured deploy
    }

    if (!response.ok || parsed?.ok === false) {
      console.error("[sheets] webhook failed", {
        status: response.status,
        body: text.slice(0, 300),
      });
      throw new Error(
        parsed?.error ||
          "Unable to save your application to Google Sheets. Please try again.",
      );
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unable to save your application")
    ) {
      throw error;
    }
    console.error("[sheets] webhook request error", error);
    throw new Error(
      "Unable to save your application to Google Sheets. Please try again.",
    );
  }
}
