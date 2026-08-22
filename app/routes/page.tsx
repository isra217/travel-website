"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import ServicesSection from "@/components/servicessection";
import WhyChooseUs from "@/components/whychooseus";

// ─── Travel Process Data ────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Tell Us Your Plan",
    desc: "Tell us where you want to go and what you're looking for.",
  },
  {
    number: "02",
    title: "We Design Your Journey",
    desc: "We create a travel plan around your preferences.",
  },
  {
    number: "03",
    title: "Confirm & Book",
    desc: "We arrange your flights, hotels and selected services.",
  },
  {
    number: "04",
    title: "Travel & Enjoy",
    desc: "Everything is ready. You simply enjoy your journey.",
  },
];

// ─── Component ──────────────────────────────────────────

export default function RoutesPage() {
  return (
    <main className="bg-[var(--color-background)] text-slate-900">

      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}

      <section className="relative flex h-[60vh] items-center overflow-hidden pt-12 md:h-[60vh] md:pt-16">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/istanbul.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900/45 backdrop-blur-[2px]" />

        {/* Hero Content */}
        <div className="section-container relative z-10">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center text-white"
          >

            {/* Main Heading */}
            <h1 className="mt-2 text-3xl font-bold leading-tight text-white drop-shadow-md md:text-4xl lg:text-4xl">
              Your Journey,
              <span className="text-gradient">
                {" "}Thoughtfully Crafted
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/95 md:text-base">
              Explore our specialized travel services designed to make your
              next escape completely effortless and meaningful.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          2. ALL TRAVEL PACKAGES
          
          showAll = true means ALL packages from Firebase
          will be displayed on this page.
      ========================================================= */}

      <ServicesSection showAll />


      {/* =========================================================
          3. TRAVEL PROCESS
      ========================================================= */}

      <section className="py-20 md:py-28">

        <div className="section-container">

          {/* Section Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{
                fontFamily: "var(--font-satisfy)",
              }}
            >
              How It Works
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              Your journey in four simple steps
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
              From choosing your destination to enjoying your trip,
              we make every step simple and stress-free.
            </p>

          </motion.div>


          {/* Steps */}

          <div className="relative mt-12 grid gap-10 md:grid-cols-4">

            {/* Connecting Line — Desktop */}

            <div className="absolute left-[12.5%] top-8 hidden h-0.5 w-[75%] bg-sky-200 md:block" />


            {/* Step Cards */}

            {steps.map((step, idx) => (

              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: idx * 0.15,
                  duration: 0.5,
                }}
                className="relative flex flex-col items-center text-center"
              >

                {/* Number */}

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-2xl font-bold text-white shadow-lg">
                  {step.number}
                </div>


                {/* Title */}

                <h4 className="mt-4 text-lg font-semibold text-[var(--color-secondary)]">
                  {step.title}
                </h4>


                {/* Description */}

                <p className="mt-1 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
                  {step.desc}
                </p>


                {/* Mobile Arrow */}

                {idx < steps.length - 1 && (
                  <div className="mt-3 text-sky-300 md:hidden">
                    <ArrowRight
                      size={20}
                      className="rotate-90"
                    />
                  </div>
                )}

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          4. WHY CHOOSE US
      ========================================================= */}

      <WhyChooseUs />


      {/* =========================================================
          5. FINAL CTA
      ========================================================= */}

      <section className="py-16 md:py-24">

        <div className="section-container">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-200 via-sky-100 to-blue-100 px-8 py-16 text-center text-slate-900 shadow-2xl"
          >

            {/* Heading */}

            <h2 className="text-3xl font-bold md:text-4xl lg:text-3xl">
              Let’s plan your next journey
            </h2>


            {/* Description */}

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
              Tell us where you want to go. We’ll take care of the rest.
            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

              {/* Plan My Trip */}

              <Link
                href="/contact#form"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-700 hover:shadow-lg"
              >
                Plan My Trip
              </Link>


              {/* Explore Services */}

              <Link
                href="#services"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Services
              </Link>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}