
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const whyUsItems = [
  {
    number: "01",
    title: "Thoughtful planning",
    description:
      "Every journey starts with a clear, calm itinerary built around your pace.",
  },
  {
    number: "02",
    title: "Dedicated support",
    description:
      "We stay involved before, during, and after your trip so nothing feels rushed.",
  },
  {
    number: "03",
    title: "Premium comfort",
    description:
      "We choose stays and experiences that feel elevated, restful, and effortless.",
  },
  {
    number: "04",
    title: "Seamless booking",
    description:
      "From first idea to final detail, the process stays simple and stress-free.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(248,251,255,1))] py-20 lg:py-24"
    >
      <div className="section-container">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 lg:p-12"
          >
            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{ fontFamily: "var(--font-satisfy)" }}
            >
              Why Choose Us
            </p>

            <h2 className="mt-2 text-3xl font-bold leading-tight text-[var(--color-secondary)] lg:text-4xl">
              Designed for your peace of mind
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] lg:text-base">
              We build travel experiences with calm planning, premium comfort,
              and support that stays with you every step of the way.
            </p>

            {/* Why Us Items */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {whyUsItems.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl font-semibold text-sky-600">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-secondary)]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[360px] overflow-hidden rounded-[28px] bg-slate-50 sm:h-[420px] lg:h-[620px]"
          >
            <Image
              src="/images/why1.jpg"
              alt="Relaxing destination"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />

            {/* Soft overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

