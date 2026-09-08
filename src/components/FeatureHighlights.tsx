const FEATURES = [
  {
    title: "Web & App",
    description: "Build real website and mobile product work.",
  },
  {
    title: "AI-assisted coding",
    description:
      "We value people comfortable using AI coding tools to ship tasks faster.",
  },
  {
    title: "3–6 months · PPO",
    description: "Internship first — strong performers get a PPO chance.",
  },
] as const;

export function FeatureHighlights() {
  return (
    <ul className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-3 sm:gap-4">
      {FEATURES.map((feature) => (
        <li
          key={feature.title}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
        >
          <p className="font-display text-sm font-medium tracking-wide text-white">
            {feature.title}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-white/55">
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
