import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** Use the transparent cropped mark (best for nav / dark backgrounds). */
  variant?: "nav" | "full";
};

const SOURCES = {
  nav: {
    src: "/brand/mata-logo-nav.png",
    width: 600,
    height: 229,
    sizes: "(max-width: 640px) 160px, 190px",
  },
  full: {
    src: "/brand/mata-logo.png",
    width: 1200,
    height: 459,
    sizes: "(max-width: 640px) 240px, 360px",
  },
} as const;

export function BrandLogo({
  className = "",
  priority = false,
  variant = "nav",
}: BrandLogoProps) {
  const asset = SOURCES[variant];

  return (
    <Image
      src={asset.src}
      alt="Mata Communication Design"
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={asset.sizes}
      className={`h-auto w-full object-contain object-left ${className}`.trim()}
    />
  );
}
