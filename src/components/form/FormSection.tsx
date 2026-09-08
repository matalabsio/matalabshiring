import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="flex flex-col gap-5 border-t border-line pt-6 first:border-t-0 first:pt-0 sm:gap-6 sm:pt-7">
      <div>
        <h2 className="font-display text-sm font-medium tracking-[0.14em] uppercase text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-5 sm:gap-6">{children}</div>
    </section>
  );
}
