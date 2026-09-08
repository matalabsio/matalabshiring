type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceGroupProps = {
  id: string;
  name: string;
  options: readonly ChoiceOption[] | readonly string[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function normalizeOptions(
  options: ChoiceGroupProps["options"],
): ChoiceOption[] {
  return options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );
}

export function ChoiceGroup({
  id,
  name,
  options,
  value,
  onChange,
  hasError = false,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: ChoiceGroupProps) {
  const normalized = normalizeOptions(options);

  return (
    <div
      id={id}
      role="radiogroup"
      aria-labelledby={`${id}-label`}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      className="flex flex-col gap-2.5"
    >
      {normalized.map((option, index) => {
        const optionId = `${id}-option-${index}`;
        const selected = value === option.value;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={[
              "flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3",
              "transition-colors duration-200",
              "focus-within:ring-2 focus-within:ring-navy/20",
              selected
                ? "border-navy bg-navy/[0.04]"
                : hasError
                  ? "border-danger/40 hover:border-danger/60"
                  : "border-line hover:border-navy/30 hover:bg-surface-muted/60",
            ].join(" ")}
          >
            <input
              id={optionId}
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy"
            />
            <span className="text-sm leading-snug text-ink sm:text-[15px]">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
