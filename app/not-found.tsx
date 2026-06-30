import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6">
      <div className="w-full rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Page not found
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          This part of RootED could not be found
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Head back to the dashboard and continue the demo from a working module.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

