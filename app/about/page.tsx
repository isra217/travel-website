"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Globe,
  Heart,
  ShieldCheck,
  Clock,
  Headphones,
  ArrowRight,
} from "lucide-react";
import About from "@/components/about";

// ─── Data ──────────────────────────────────────────────

const storySections = [
  {
    id: "01",
    label: "Our Story",
    title: "Travel, thoughtfully reimagined.",
    description:
      "We believe travel is more than simply visiting a destination. It is about discovering new perspectives, experiencing different cultures, and creating memories that stay with you long after the journey ends.",
    secondDescription:
      "Our approach is simple: understand what you want from your journey, take care of the details, and create an experience that feels personal from beginning to end.",
    image: "/images/switzerland.jpg",
    imageAlt: "Beautiful mountain landscape in Switzerland",
  },
  {
    id: "02",
    label: "Our Approach",
    title: "Journeys designed around you.",
    description:
      "Every traveler is different. Some journeys are about relaxation, others are about adventure, culture, discovery, or simply spending meaningful time with the people who matter.",
    secondDescription:
      "That is why we focus on creating travel experiences around your preferences, rather than offering a one-size-fits-all journey.",
    image: "/images/bali.jpg",
    imageAlt: "Tropical travel destination",
  },
  {
    id: "03",
    label: "Our Promise",
    title: "From planning to memories.",
    description:
      "A great journey is about more than getting from one place to another. It is about knowing that every important detail has been considered before you leave.",
    secondDescription:
      "From destinations and accommodation to transportation and travel support, we aim to make your journey feel seamless, comfortable, and enjoyable.",
    image: "/images/santorini.jpg",
    imageAlt: "Beautiful coastal travel destination",
  },
];

const reasons = [
  {
    icon: Compass,
    title: "Personalized Planning",
    desc: "Every journey is shaped around your needs, preferences and travel style.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Guidance",
    desc: "Thoughtful recommendations and support to help you travel with confidence.",
  },
  {
    icon: Clock,
    title: "Attention to Detail",
    desc: "We take care of the small details that make a big difference.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    desc: "We're here to support you before, during and after your journey.",
  },
];

const philosophy = [
  {
    number: "01",
    title: "Discover",
    desc: "Explore places beyond the ordinary and experience something new.",
  },
  {
    number: "02",
    title: "Experience",
    desc: "Connect with cultures, people, landscapes and moments along the way.",
  },
  {
    number: "03",
    title: "Remember",
    desc: "Turn every journey into memories that stay with you.",
  },
];

const destinations = [
  {
    region: "Europe",
    countries: "Switzerland · France · Italy",
    image: "/images/italy.jpg",
  },
  {
    region: "Asia",
    countries: "Maldives · Bali · Malaysia",
    image: "/images/bali.jpg",
  },
  {
    region: "Middle East",
    countries: "UAE · Saudi Arabia · Qatar",
    image: "/images/santorini.jpg",
  },
  {
    region: "South Asia",
    countries: "India · Nepal · Sri Lanka",
    image: "/images/taj mahal.jpg",
  },
  {
    region: "Turkey",
    countries: "Istanbul · Cappadocia · Antalya",
    image: "/images/turkey.jpg",
  },
];

// ─── Component ──────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-background)] text-slate-900">

      {/* =====================================================
          1. ABOUT HERO
      ====================================================== */}

      <section className="relative overflow-hidden h-[60vh] md:h-[60vh] flex items-center pt-12 md:pt-16">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about-us.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900/45 backdrop-blur-[2px]" />

        <div className="section-container relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center text-white"
          >

            

            <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl lg:text-4xl text-white drop-shadow-md">
              Travel, thoughtfully 
              <span className="text-gradient"> reimagined</span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base leading-6 text-white/95">
             We believe the best journeys are meaningful and effortless.Discover who we are and what inspires the way we
              create travel experiences.
            </p>

          </motion.div>

        </div>
      </section>


      {/* Replace 'Who We Are' with shared About component */}
      <About />


      {/* =====================================================
          3. WHY CHOOSE US
      ====================================================== */}

      <section className="bg-white/50 pt-20 pb-12 md:pt-28 md:pb-12">

        <div className="section-container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >

            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{
                fontFamily: "var(--font-satisfy)",
              }}
            >
              Why Travel With Us?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              Designed around you, delivered with care
            </h2>

          </motion.div>


          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
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
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  className="flex flex-col items-center text-center"
                >

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition duration-300 hover:bg-sky-200">

                    <Icon size={26} />

                  </div>

                  <h4 className="text-lg font-semibold text-[var(--color-secondary)]">
                    {reason.title}
                  </h4>

                  <p className="mt-1 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
                    {reason.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          4. OUR PHILOSOPHY
      ====================================================== */}

      <section className="py-20 md:py-28">

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
              Our Philosophy
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              The way we believe travel should feel
            </h2>

          </motion.div>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {philosophy.map((item, index) => (
              <motion.div
                key={item.number}
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
                  delay: index * 0.1,
                  duration: 0.4,
                }}
                className="rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 text-5xl font-light text-sky-200">
                  {item.number}
                </div>

                <h3 className="text-2xl font-semibold text-[var(--color-secondary)]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.desc}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

{/* =====================================================
    5. JOURNEY MATTERS – reduced height, darker overlay,
       parallax, smaller text, gradient quote
====================================================== */}

{/* =====================================================
    5. JOURNEY MATTERS – reduced height, darker overlay,
       parallax, smaller text, white quote
====================================================== */}

<section
  className="relative min-h-[280px] overflow-hidden md:min-h-[360px] bg-fixed bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/poetry.jpg')",
  }}
>
  {/* Darker overlay for clarity */}
  <div className="absolute inset-0 bg-slate-900/45" />

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative z-10 flex min-h-[280px] items-center justify-center px-6 text-center md:min-h-[360px]"
  >
    <div className="max-w-3xl">
      <p
        className="text-lg text-cyan-200 md:text-xl"
        style={{ fontFamily: "var(--font-satisfy)" }}
      >
        The Journey Matters
      </p>
      <blockquote className="mt-3 text-2xl font-light italic leading-relaxed text-white md:text-3xl lg:text-4xl">
        “The world is meant to be experienced, not simply seen.”
      </blockquote>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/80 md:text-sm">
        — Anonymous
      </p>
    </div>
  </motion.div>
</section>


      {/* =====================================================
    6. DESTINATIONS – enhanced with 5 cards, better visibility
====================================================== */}

<section className="bg-white/50 py-20 md:py-28">
  <div className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p
        className="text-2xl text-sky-700 lg:text-3xl"
        style={{ fontFamily: "var(--font-satisfy)" }}
      >
        Where We Take You
      </p>
      <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
        Explore the world with us
      </h2>
    </motion.div>

    <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.region}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="group relative overflow-hidden rounded-2xl shadow-lg"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={destination.image}
              alt={destination.region}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            {/* Stronger overlay for text clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold text-white drop-shadow-md md:text-xl">
                {destination.region}
              </h3>
              <p className="mt-0.5 text-xs text-sky-100 drop-shadow md:text-sm">
                {destination.countries}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    <section className="bg-[var(--color-background)] py-20 text-slate-900">
      <div className="section-container relative z-10">
        {/* Softer gradient, lighter shadow, subtle border */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-100 via-blue-50 to-white px-8 py-12 shadow-lg shadow-sky-200/30 ring-1 ring-sky-200/20 md:px-12 md:py-16">
          <div className="flex flex-col items-center text-center">
            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{ fontFamily: "var(--font-satisfy)" }}
            >
              Your journey, our passion
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-secondary)] sm:text-4xl">
              Ready to turn your travel dreams into reality?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 leading-8">
              With over 15 years of experience and a team that genuinely cares,
              we craft every itinerary with heart and precision. Let us handle the
              details so you can focus on making memories.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              {/* Primary button – Book Now */}
              <a
                href="/contact"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-sky-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                Start Planning
              </a>

              {/* Secondary button – Contact Us (outline style) */}
              <a
                href="/contact"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-sky-300 bg-transparent px-8 py-3.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    </main>
  );
}



