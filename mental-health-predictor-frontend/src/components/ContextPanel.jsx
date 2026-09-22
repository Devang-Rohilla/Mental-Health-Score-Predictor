export default function ContextPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-pine-800 px-8 py-10 text-mist-50 sm:px-10">
      {/* the one orchestrated motion moment for the page: a slow, breathing orb */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pine-500/40 blur-2xl animate-breathe" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-clay-500/20 blur-3xl" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-pine-100/70">Mindscope</p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-white sm:text-[2.75rem]">
          How are you,
          <br />
          really?
        </h1>
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-pine-100/80">
          A three-minute check-in that looks at your habits — screen time,
          sleep, movement, and stress — and estimates where your wellbeing
          sits today.
        </p>
      </div>

      <div className="relative space-y-4 text-sm text-pine-100/70">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-clay-400" />
          <span>Nothing is stored or sent anywhere but your own server.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-clay-400" />
          <span>Takes about 12 questions, three short steps.</span>
        </div>
        <p className="pt-6 text-xs text-pine-100/50">
          This is a screening estimate, not a diagnosis. If you're struggling,
          please reach out to a real person you trust.
        </p>
      </div>
    </div>
  );
}
