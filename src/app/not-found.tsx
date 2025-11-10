export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-white/70">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="mt-6 inline-block rounded-xl border border-white/15 bg-white/10 px-4 py-2">Go home</a>
    </div>
  );
}
