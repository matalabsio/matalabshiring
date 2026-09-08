import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function TextInput({
  hasError = false,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-lg border bg-surface px-4 py-3 text-[15px] text-ink outline-none",
        "placeholder:text-ink-muted/55",
        "transition-colors duration-200",
        "focus:border-navy focus:ring-2 focus:ring-navy/15",
        hasError
          ? "border-danger focus:border-danger focus:ring-danger/15"
          : "border-line hover:border-navy/30",
        className,
      ].join(" ")}
    />
  );
}
