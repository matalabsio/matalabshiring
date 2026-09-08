import { ApplicationForm } from "@/components/form/ApplicationForm";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <div className="page-atmosphere relative min-h-full overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <SiteNav />

      <main className="relative mx-auto flex w-full max-w-2xl flex-col px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
            Fresh Graduate Internship
          </p>
          <h1 className="font-display text-3xl font-light tracking-[0.04em] text-white sm:text-4xl">
            Developer Internship
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
            We&apos;re hiring fresh graduates for a{" "}
            <span className="text-white/85">3–6 month</span> internship in
            website and app development — with a chance of{" "}
            <span className="text-white/85">PPO</span> based on performance.
          </p>
        </header>

        <section
          aria-label="Developer internship application form"
          className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
        >
          <div className="border-b border-line bg-surface-muted/70 px-6 py-4 sm:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted">
              Web · App · Hyderabad Hybrid · PPO Path
            </p>
            <p className="mt-1 text-sm text-ink/80">
              Fresh graduate internship · 3–6 months. All fields required.
            </p>
          </div>
          <ApplicationForm />
        </section>

        <footer className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 sm:mt-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Internship
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
            Mata Labs
          </p>
        </footer>
      </main>
    </div>
  );
}
