const features = [
  { title: "Clean Builds", body: "Simple, readable meta builds—no clutter, no noise." },
  { title: "Nightly Updates", body: "Aggregated from real matches, refreshed automatically." },
  { title: "Riot-compliant", body: "Fan-made, secure key handling, no shaming or MMR guesswork." },
];

export default function FeatureCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {features.map(f => (
        <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-lg font-semibold">{f.title}</div>
          <div className="mt-1 text-white/75 text-sm">{f.body}</div>
        </div>
      ))}
    </div>
  );
}
