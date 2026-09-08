export function SuccessState() {
  return (
    <div
      className="flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16"
      role="status"
      aria-live="polite"
    >
      <div
        className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/40"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6 text-navy"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
        Confirmed
      </p>
      <h2 className="font-display text-2xl font-light tracking-[0.04em] text-ink sm:text-3xl">
        Application received
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
        Thank you for applying to the Mata Labs internship. We&apos;ll review
        your profile and be in touch soon.
      </p>
    </div>
  );
}
