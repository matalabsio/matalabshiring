import { randomUUID } from "crypto";
import { createApplicationPage } from "./notion";
import type { Application, ApplicationInput } from "./types";

/**
 * Application persistence layer.
 *
 * Writes each submission to Notion (source of truth) and keeps an in-memory
 * copy for local debugging. See `.env.example` for NOTION_* variables.
 */

const applications: Application[] = [];

export async function saveApplication(
  input: ApplicationInput,
  meta?: { ip?: string },
): Promise<Application> {
  const createdAt = new Date().toISOString();

  let notionPageId: string | undefined;

  try {
    const pageId = await createApplicationPage(input, { createdAt });
    if (pageId) {
      notionPageId = pageId;
    }
  } catch (error) {
    console.error("[applications] Notion write failed", error);
    throw new Error(
      "Unable to save your application to Notion. Please try again.",
    );
  }

  const application: Application = {
    ...input,
    id: randomUUID(),
    createdAt,
    ip: meta?.ip,
    notionPageId,
  };

  applications.push(application);

  if (process.env.NODE_ENV === "development") {
    console.info("[applications] saved", {
      id: application.id,
      fullName: application.fullName,
      notionPageId: application.notionPageId ?? null,
    });
  }

  return application;
}

export async function listApplications(): Promise<Application[]> {
  return [...applications];
}
