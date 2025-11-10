'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-rose-400">{error.message || 'Unexpected error.'}</p>
      <p className="mt-2 text-sm text-white/70">
        If you’re testing locally, remember dev keys expire every 24h.
      </p>
      <a href="/" className="mt-6 inline-block rounded-xl border border-white/15 bg-white/10 px-4 py-2">Back home</a>
    </div>
  );
}
