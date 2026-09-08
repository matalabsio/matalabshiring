import { Client } from "@notionhq/client";
import type { ApplicationInput } from "./types";

function richText(content: string) {
  return [
    {
      type: "text" as const,
      text: { content: content.slice(0, 2000) },
    },
  ];
}

function getNotionConfig() {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim();
  return { apiKey, databaseId };
}

export function isNotionConfigured(): boolean {
  const { apiKey, databaseId } = getNotionConfig();
  return Boolean(apiKey && databaseId);
}

/**
 * Creates a Notion database row for an application.
 * Returns the Notion page id.
 *
 * In development without env vars configured, skips the write and returns null.
 * In production, missing config or API failures throw.
 */
export async function createApplicationPage(
  data: ApplicationInput,
  meta: { createdAt: string },
): Promise<string | null> {
  const { apiKey, databaseId } = getNotionConfig();

  if (!apiKey || !databaseId) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Notion is not configured. Set NOTION_API_KEY and NOTION_DATABASE_ID.",
      );
    }

    console.warn(
      "[notion] NOTION_API_KEY / NOTION_DATABASE_ID missing — skipping Notion write in development.",
    );
    return null;
  }

  const notion = new Client({ auth: apiKey });

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: richText(data.fullName),
      },
      "Graduation Year": {
        rich_text: richText(data.graduationYear),
      },
      "Development Preference": {
        rich_text: richText(data.developmentPreference),
      },
      "Tech Stack": {
        rich_text: richText(data.techStack),
      },
      "Best Project": {
        rich_text: richText(data.bestProject),
      },
      "Project Link": {
        url: data.projectLink,
      },
      "Resume Link": {
        url: data.resumeLink,
      },
      "AI Proficiency": {
        rich_text: richText(data.aiProficiency),
      },
      "Hyderabad Hybrid": {
        rich_text: richText(data.hyderabadHybrid),
      },
      "Why Hire You": {
        rich_text: richText(data.whyHireYou),
      },
      "Submitted At": {
        date: { start: meta.createdAt },
      },
    },
  });

  return response.id;
}
