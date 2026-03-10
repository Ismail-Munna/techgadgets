export function NewsletterSection() {
  return (
    <section className="bg-indigo-600 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">
          Newsletter
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stay ahead of the next upgrade cycle.
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          Get launch alerts, practical buying guides, and subscriber-only deals
          delivered to your inbox.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full border-0 px-5 py-3 text-gray-900 shadow-sm outline-none ring-2 ring-transparent transition focus:ring-white"
          />
          <button
            type="button"
            className="rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-900"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
