"use client";

export default function CtaSection() {
  return (
    <section className="bg-[var(--color-background)] py-20 text-slate-900">
      <div className="section-container relative z-10">
        {/* Card with a soft, solid light‑blue gradient */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-200 via-sky-100 to-blue-100 px-8 py-12 shadow-xl shadow-sky-300/40 md:px-12 md:py-16">
          <div className="flex flex-col items-center text-center">
            <p
              className="text-2xl text-sky-800 lg:text-3xl"
              style={{ fontFamily: "var(--font-satisfy)" }}
            >
              Let&apos;s travel together
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-secondary)] sm:text-4xl">
              Ready to book your next unforgettable escape?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-700 leading-8">
              Whether you want a luxury retreat, a cultural getaway, or a custom
              adventure, our travel experts are standing by to tailor the perfect
              plan.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-green-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400/60"
              >
                WhatsApp
              </a>
              <a
                href="/routes"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}