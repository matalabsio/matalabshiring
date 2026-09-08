export const DEVELOPMENT_PREFERENCES = [
  "Web Development",
  "App Development",
  "Both Web & App",
] as const;

/** Comfort using AI coding tools to make development tasks easier */
export const AI_PROFICIENCY_LEVELS = [
  "Not yet comfortable",
  "Somewhat comfortable — basic help & debugging",
  "Comfortable — use AI coding to make tasks easier",
  "Very comfortable — AI is part of my daily workflow",
] as const;

/** Hybrid role: work-from-office in Hyderabad as required */
export const HYDERABAD_WORK_OPTIONS = [
  "Yes — comfortable with hybrid / office in Hyderabad",
  "Open to hybrid as required by the team",
  "Prefer remote only",
] as const;

export type DevelopmentPreference =
  (typeof DEVELOPMENT_PREFERENCES)[number];

export type AIProficiency = (typeof AI_PROFICIENCY_LEVELS)[number];

export type HyderabadWorkOption =
  (typeof HYDERABAD_WORK_OPTIONS)[number];

export type ApplicationInput = {
  fullName: string;
  graduationYear: string;
  developmentPreference: string;
  techStack: string;
  bestProject: string;
  projectLink: string;
  resumeLink: string;
  aiProficiency: string;
  hyderabadHybrid: string;
  whyHireYou: string;
};

export type Application = ApplicationInput & {
  id: string;
  createdAt: string;
  ip?: string;
  notionPageId?: string;
};

export type FieldErrors = Partial<Record<keyof ApplicationInput, string>>;

export type ValidationResult =
  | { success: true; data: ApplicationInput }
  | { success: false; errors: FieldErrors };

export type ApiSuccessResponse = {
  success: true;
  message: string;
  applicationId: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: FieldErrors;
};
