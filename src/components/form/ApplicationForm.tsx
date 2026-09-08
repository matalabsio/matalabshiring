"use client";

import { useId, useState, type FormEvent } from "react";
import {
  AI_PROFICIENCY_LEVELS,
  DEVELOPMENT_PREFERENCES,
  HYDERABAD_WORK_OPTIONS,
  type ApiErrorResponse,
  type ApiSuccessResponse,
  type ApplicationInput,
  type FieldErrors,
} from "@/lib/types";
import { GRADUATION_YEARS, validateApplication } from "@/lib/validation";
import { ChoiceGroup } from "./ChoiceGroup";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import { SelectInput } from "./SelectInput";
import { SubmitButton } from "./SubmitButton";
import { SuccessState } from "./SuccessState";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";

const INITIAL_VALUES: ApplicationInput = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  graduationYear: "",
  developmentPreference: "",
  techStack: "",
  bestProject: "",
  projectLink: "",
  resumeLink: "",
  aiProficiency: "",
  hyderabadHybrid: "",
  whyHireYou: "",
};

export function ApplicationForm() {
  const formId = useId();
  const [values, setValues] = useState<ApplicationInput>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof ApplicationInput>(
    key: K,
    value: ApplicationInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function fieldProps(
    name: keyof ApplicationInput,
    options?: { hasHint?: boolean },
  ) {
    const id = `${formId}-${name}`;
    const describedBy = [
      options?.hasHint ? `${id}-hint` : null,
      errors[name] ? `${id}-error` : null,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      id,
      hasError: Boolean(errors[name]),
      "aria-invalid": Boolean(errors[name]) || undefined,
      "aria-describedby": describedBy || undefined,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = validateApplication(values);
    if (!result.success) {
      setErrors(result.errors);
      const firstError = Object.keys(result.errors)[0];
      if (firstError) {
        document
          .getElementById(`${formId}-${firstError}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const payload = (await response.json()) as
        | ApiSuccessResponse
        | ApiErrorResponse;

      if (!response.ok || !payload.success) {
        const errorPayload = payload as ApiErrorResponse;
        if (errorPayload.errors) {
          setErrors(errorPayload.errors);
        }
        setFormError(
          errorPayload.message ||
            "Something went wrong. Please try again.",
        );
        return;
      }

      setSuccess(true);
      setValues(INITIAL_VALUES);
    } catch {
      setFormError(
        "Unable to submit right now. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <SuccessState
        onReset={() => {
          setSuccess(false);
          setFormError(null);
          setErrors({});
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-0 px-5 py-7 sm:px-8 sm:py-10"
    >
      <FormSection title="About you">
        <FormField
          id={`${formId}-fullName`}
          label="Full Name"
          error={errors.fullName}
        >
          <TextInput
            {...fieldProps("fullName")}
            name="fullName"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-email`}
          label="Email ID"
          error={errors.email}
        >
          <TextInput
            {...fieldProps("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-whatsappNumber`}
          label="WhatsApp Number"
          hint="Include country code if outside India (e.g. +919876543210)."
          error={errors.whatsappNumber}
        >
          <TextInput
            {...fieldProps("whatsappNumber", { hasHint: true })}
            name="whatsappNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+919876543210"
            value={values.whatsappNumber}
            onChange={(e) => updateField("whatsappNumber", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-graduationYear`}
          label="B.Tech CSE Graduation Year"
          error={errors.graduationYear}
        >
          <SelectInput
            {...fieldProps("graduationYear")}
            name="graduationYear"
            placeholder="Select graduation year"
            options={GRADUATION_YEARS}
            value={values.graduationYear}
            onChange={(e) => updateField("graduationYear", e.target.value)}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Development focus"
        description="Tell us where you want to grow during this internship."
      >
        <FormField
          id={`${formId}-developmentPreference`}
          label="Development Preference"
          error={errors.developmentPreference}
        >
          <SelectInput
            {...fieldProps("developmentPreference")}
            name="developmentPreference"
            placeholder="Select preference"
            options={DEVELOPMENT_PREFERENCES}
            value={values.developmentPreference}
            onChange={(e) =>
              updateField("developmentPreference", e.target.value)
            }
          />
        </FormField>

        <FormField
          id={`${formId}-techStack`}
          label="Tech Stack"
          error={errors.techStack}
        >
          <TextInput
            {...fieldProps("techStack")}
            name="techStack"
            placeholder="React, Next.js, Node.js, PostgreSQL, Flutter..."
            value={values.techStack}
            onChange={(e) => updateField("techStack", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-bestProject`}
          label="Best Project"
          hint="Briefly describe what you built and your role."
          error={errors.bestProject}
        >
          <TextArea
            {...fieldProps("bestProject", { hasHint: true })}
            name="bestProject"
            rows={4}
            placeholder="I built a campus marketplace app where I owned the full-stack features and deployment…"
            value={values.bestProject}
            onChange={(e) => updateField("bestProject", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-projectLink`}
          label="Project / GitHub / Portfolio Link"
          error={errors.projectLink}
        >
          <TextInput
            {...fieldProps("projectLink")}
            name="projectLink"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://github.com/you/project"
            value={values.projectLink}
            onChange={(e) => updateField("projectLink", e.target.value)}
          />
        </FormField>

        <FormField
          id={`${formId}-resumeLink`}
          label="Resume (Google Drive)"
          hint='Link must be set to “Anyone with the link” so we can open it.'
          error={errors.resumeLink}
        >
          <TextInput
            {...fieldProps("resumeLink", { hasHint: true })}
            name="resumeLink"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://drive.google.com/file/d/..."
            value={values.resumeLink}
            onChange={(e) => updateField("resumeLink", e.target.value)}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="AI & work setup"
        description="We use AI coding tools to move faster — and this is a hybrid role based in Hyderabad."
      >
        <FormField
          id={`${formId}-aiProficiency`}
          label="Comfortable with AI coding?"
          hint="Are you comfortable using AI coding tools to make development tasks easier?"
          error={errors.aiProficiency}
          asGroup
        >
          <ChoiceGroup
            {...fieldProps("aiProficiency", { hasHint: true })}
            name="aiProficiency"
            options={AI_PROFICIENCY_LEVELS}
            value={values.aiProficiency}
            onChange={(value) => updateField("aiProficiency", value)}
          />
        </FormField>

        <FormField
          id={`${formId}-hyderabadHybrid`}
          label="Hyderabad hybrid office"
          hint="Are you comfortable working from the office in Hyderabad as required? This is a hybrid role."
          error={errors.hyderabadHybrid}
          asGroup
        >
          <ChoiceGroup
            {...fieldProps("hyderabadHybrid", { hasHint: true })}
            name="hyderabadHybrid"
            options={HYDERABAD_WORK_OPTIONS}
            value={values.hyderabadHybrid}
            onChange={(value) => updateField("hyderabadHybrid", value)}
          />
        </FormField>
      </FormSection>

      <FormSection title="Final note">
        <FormField
          id={`${formId}-whyHireYou`}
          label="Why should we hire you for this internship?"
          error={errors.whyHireYou}
        >
          <TextArea
            {...fieldProps("whyHireYou")}
            name="whyHireYou"
            rows={4}
            placeholder="Share why you’re a strong fit for web/app development and this 3–6 month internship…"
            value={values.whyHireYou}
            onChange={(e) => updateField("whyHireYou", e.target.value)}
          />
        </FormField>
      </FormSection>

      {formError ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-danger/25 bg-danger-bg px-4 py-3 text-sm text-danger"
        >
          {formError}
        </div>
      ) : null}

      <div className="mt-8 pt-2">
        <SubmitButton loading={loading} />
        <p className="mt-3 text-center text-xs text-ink-muted">
          By submitting, you confirm the details above are accurate.
        </p>
      </div>
    </form>
  );
}
