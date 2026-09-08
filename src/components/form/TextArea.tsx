import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export function TextArea({
  hasError = false,
  className = "",
  rows = 4,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={[
        "w-full resize-y rounded-lg border bg-surface px-4 py-3 text-[15px] text-ink outline-none",
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
