import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-5xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          aria-label="Mata Communication Design home"
        >
          <BrandLogo
            priority
            variant="nav"
            className="w-[158px] drop-shadow-[0_0_12px_rgba(255,255,255,0.12)] transition-opacity duration-200 group-hover:opacity-90 sm:w-[190px]"
          />
        </Link>

        <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
        Careers · Internship
      </p>
      </div>
    </nav>
  );
}
