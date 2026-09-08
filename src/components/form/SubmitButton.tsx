import type { ButtonHTMLAttributes } from "react";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function SubmitButton({
  loading = false,
  children = "Submit Application",
  className = "",
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      aria-busy={loading}
      className={[
        "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3.5",
        "bg-navy font-display text-sm font-medium tracking-[0.12em] uppercase text-white",
        "transition-colors duration-200",
        "hover:bg-navy-mid",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-65",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
          />
          Submitting…
        </>
      ) : (
        children
      )}
    </button>
  );
}
