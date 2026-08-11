"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Compass } from "lucide-react";

const stats = [
  { number: "10,000+", title: "Happy Travelers" },
  { number: "50+", title: "Destinations" },
  { number: "98%", title: "Satisfaction Rate" },
  { number: "15+", title: "Years Experience" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center bg-[var(--color-background)] px-4 py-12 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Two‑column layout with equal heights */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ===== LEFT – Image ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center lg:justify-start"
          >
            <div className="overflow-hidden rounded-[30px] shadow-soft">
              <Image
                src="/images/italy1.jpg"
                alt="Swiss Alps"
                width={420}
                height={520}
                className="h-[300px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[340px] lg:h-[420px] lg:w-[420px]"
              />
            </div>
            {/* Overlapping smaller image */}
            <div className="absolute bottom-4 right-4 rotate-[8deg] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_25px_60px_rgba(15,23,42,0.25)]">
              <Image
                src="/images/norway.jpg"
                alt="Bali"
                width={180}
                height={230}
                className="h-[160px] w-[125px] object-cover transition duration-700 hover:scale-105 sm:h-[190px] sm:w-[150px] lg:h-[230px] lg:w-[180px]"
              />
            </div>
          </motion.div>

          {/* ===== RIGHT – Content aligned to bottom of image ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-start pt-8 sm:pt-10 lg:pt-16"
          >
            {/* "About Us" in cursive – appears at the bottom of the image */}
            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{ fontFamily: "var(--font-satisfy)" }}
            >
              About Us
            </p>

            <h3 className="mt-2 text-3xl font-bold leading-tight text-[var(--color-secondary)] lg:text-4xl xl:text-5xl">
              Crafting exceptional
              <br />
              journeys across
              <span className="text-gradient"> the globe</span>
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] lg:text-base">
              Every traveler deserves more than a vacation. We design meaningful
              experiences that connect you with breathtaking places, local
              culture, and unforgettable moments.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--color-muted)] lg:text-base">
              From luxury escapes to scenic adventures, our team plans every
              detail with care so your trip feels calm, elevated, and effortless.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100">
                  <ShieldCheck size={18} className="text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Trusted Guides</h4>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                    Local expertise
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100">
                  <Compass size={18} className="text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Personalized Tours</h4>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                    Tailor-made 
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="btn-primary mt-6 inline-flex w-fit rounded-full px-6 py-3 text-sm font-semibold"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      
      </div>
    </section>
    
  );
}