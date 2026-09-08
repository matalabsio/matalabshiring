import type { SelectHTMLAttributes } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly SelectOption[] | readonly string[];
  placeholder?: string;
  hasError?: boolean;
};

function normalizeOptions(
  options: SelectInputProps["options"],
): SelectOption[] {
  return options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );
}

export function SelectInput({
  options,
  placeholder = "Select an option",
  hasError = false,
  className = "",
  ...props
}: SelectInputProps) {
  const normalized = normalizeOptions(options);

  return (
    <select
      {...props}
      className={[
        "w-full cursor-pointer appearance-none rounded-lg border bg-surface px-4 py-3 pr-10 text-[15px] text-ink outline-none",
        "bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat",
        "transition-colors duration-200",
        "focus:border-navy focus:ring-2 focus:ring-navy/15",
        hasError
          ? "border-danger focus:border-danger focus:ring-danger/15"
          : "border-line hover:border-navy/30",
        !props.value ? "text-ink-muted/55" : "",
        className,
      ].join(" ")}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235b6b8c'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {normalized.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
