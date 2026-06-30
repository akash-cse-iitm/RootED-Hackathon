export default function GlobalLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6">
      <div className="w-full rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          RootED
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Loading the next step...
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          We&apos;re preparing your learner dashboard, support tools, or practice
          flow now.
        </p>
      </div>
    </main>
  );
}

