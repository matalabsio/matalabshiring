import { randomUUID } from "crypto";
import { appendApplicationRow } from "./sheets";
import type { Application, ApplicationInput } from "./types";

/**
 * Application persistence layer.
 *
 * Appends each submission to Google Sheets (source of truth) and keeps an
 * in-memory copy for local debugging. See `.env.example` / docs/GOOGLE_SHEETS_SETUP.md.
 */

const applications: Application[] = [];

export async function saveApplication(
  input: ApplicationInput,
  meta?: { ip?: string },
): Promise<Application> {
  const application: Application = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ip: meta?.ip,
  };

  try {
    await appendApplicationRow(application);
  } catch (error) {
    console.error("[applications] Google Sheets write failed", error);
    throw error instanceof Error
      ? error
      : new Error(
          "Unable to save your application to Google Sheets. Please try again.",
        );
  }

  applications.push(application);

  if (process.env.NODE_ENV === "development") {
    console.info("[applications] saved", {
      id: application.id,
      fullName: application.fullName,
    });
  }

  return application;
}

export async function listApplications(): Promise<Application[]> {
  return [...applications];
}
