import {
  AI_PROFICIENCY_LEVELS,
  DEVELOPMENT_PREFERENCES,
  HYDERABAD_WORK_OPTIONS,
  type ApplicationInput,
  type FieldErrors,
  type ValidationResult,
} from "./types";

const CURRENT_YEAR = new Date().getFullYear();

/** Graduation years covering recent grads and upcoming cohorts */
export const GRADUATION_YEARS = Array.from(
  { length: 10 },
  (_, i) => String(CURRENT_YEAR - 4 + i),
);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isGoogleDriveUrl(value: string): boolean {
  try {
    const host = new URL(value.trim()).hostname.toLowerCase();
    return host === "drive.google.com" || host === "docs.google.com";
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Accepts +91XXXXXXXXXX, 10-digit Indian numbers, or international with + */
function isValidWhatsAppNumber(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, "");
  if (/^\+[1-9]\d{7,14}$/.test(cleaned)) return true;
  if (/^[6-9]\d{9}$/.test(cleaned)) return true;
  return false;
}

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Shared validation used by both client and server.
 */
export function validateApplication(raw: unknown): ValidationResult {
  const input = (raw ?? {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const fullName = trim(input.fullName);
  const email = trim(input.email).toLowerCase();
  const whatsappNumber = trim(input.whatsappNumber);
  const graduationYear = trim(input.graduationYear);
  const developmentPreference = trim(input.developmentPreference);
  const techStack = trim(input.techStack);
  const bestProject = trim(input.bestProject);
  const projectLink = trim(input.projectLink);
  const resumeLink = trim(input.resumeLink);
  const aiProficiency = trim(input.aiProficiency);
  const hyderabadHybrid = trim(input.hyderabadHybrid);
  const whyHireYou = trim(input.whyHireYou);

  if (!isNonEmptyString(fullName)) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length > 100) {
    errors.fullName = "Name must be 100 characters or fewer.";
  }

  if (!isNonEmptyString(email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or fewer.";
  }

  if (!isNonEmptyString(whatsappNumber)) {
    errors.whatsappNumber = "WhatsApp number is required.";
  } else if (!isValidWhatsAppNumber(whatsappNumber)) {
    errors.whatsappNumber =
      "Enter a valid WhatsApp number (e.g. +919876543210 or 9876543210).";
  }

  if (!isNonEmptyString(graduationYear)) {
    errors.graduationYear = "Graduation year is required.";
  } else if (!GRADUATION_YEARS.includes(graduationYear)) {
    errors.graduationYear = "Please select a valid graduation year.";
  }

  if (!isNonEmptyString(developmentPreference)) {
    errors.developmentPreference = "Development preference is required.";
  } else if (
    !DEVELOPMENT_PREFERENCES.includes(
      developmentPreference as (typeof DEVELOPMENT_PREFERENCES)[number],
    )
  ) {
    errors.developmentPreference = "Please select a valid preference.";
  }

  if (!isNonEmptyString(techStack)) {
    errors.techStack = "Tech stack is required.";
  } else if (techStack.length > 300) {
    errors.techStack = "Tech stack must be 300 characters or fewer.";
  }

  if (!isNonEmptyString(bestProject)) {
    errors.bestProject = "Please describe your best project.";
  } else if (bestProject.length < 20) {
    errors.bestProject =
      "Please share a bit more detail (at least 20 characters).";
  } else if (bestProject.length > 2000) {
    errors.bestProject = "Project description must be 2000 characters or fewer.";
  }

  if (!isNonEmptyString(projectLink)) {
    errors.projectLink = "A project, GitHub, or portfolio link is required.";
  } else if (!isValidUrl(projectLink)) {
    errors.projectLink = "Please enter a valid URL (https://...).";
  }

  if (!isNonEmptyString(resumeLink)) {
    errors.resumeLink = "A Google Drive resume link is required.";
  } else if (!isValidUrl(resumeLink)) {
    errors.resumeLink = "Please enter a valid URL (https://...).";
  } else if (!isGoogleDriveUrl(resumeLink)) {
    errors.resumeLink =
      "Please use a Google Drive or Google Docs link (drive.google.com).";
  }

  if (!isNonEmptyString(aiProficiency)) {
    errors.aiProficiency = "Please tell us how comfortable you are with AI coding.";
  } else if (
    !AI_PROFICIENCY_LEVELS.includes(
      aiProficiency as (typeof AI_PROFICIENCY_LEVELS)[number],
    )
  ) {
    errors.aiProficiency = "Please select a valid option.";
  }

  if (!isNonEmptyString(hyderabadHybrid)) {
    errors.hyderabadHybrid =
      "Please confirm your comfort with the Hyderabad hybrid role.";
  } else if (
    !HYDERABAD_WORK_OPTIONS.includes(
      hyderabadHybrid as (typeof HYDERABAD_WORK_OPTIONS)[number],
    )
  ) {
    errors.hyderabadHybrid = "Please select a valid option.";
  }

  if (!isNonEmptyString(whyHireYou)) {
    errors.whyHireYou = "Please tell us why we should hire you.";
  } else if (whyHireYou.length < 20) {
    errors.whyHireYou =
      "Please share a bit more detail (at least 20 characters).";
  } else if (whyHireYou.length > 2000) {
    errors.whyHireYou = "Response must be 2000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const data: ApplicationInput = {
    fullName,
    email,
    whatsappNumber: whatsappNumber.replace(/[\s()-]/g, ""),
    graduationYear,
    developmentPreference,
    techStack,
    bestProject,
    projectLink,
    resumeLink,
    aiProficiency,
    hyderabadHybrid,
    whyHireYou,
  };

  return { success: true, data };
}
