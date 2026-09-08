import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /** Use for radio/checkbox groups (label is not tied to a single control). */
  asGroup?: boolean;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  required = true,
  error,
  hint,
  asGroup = false,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const labelId = `${id}-label`;

  const labelClassName = "text-[13px] font-medium tracking-wide text-ink";
  const requiredMark = required ? (
    <span className="ml-1 text-accent" aria-hidden="true">
      *
    </span>
  ) : null;

  return (
    <div className="flex flex-col gap-2">
      {asGroup ? (
        <div id={labelId} className={labelClassName}>
          {label}
          {requiredMark}
        </div>
      ) : (
        <label htmlFor={id} id={labelId} className={labelClassName}>
          {label}
          {requiredMark}
        </label>
      )}

      {hint ? (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}

      {children}

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
