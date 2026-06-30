"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6">
      <div className="w-full rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-coral">
          Something went wrong
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          RootED hit a problem, but your demo can recover
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Try the action again. If this keeps happening, refresh the page or
          restart the current module flow.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

