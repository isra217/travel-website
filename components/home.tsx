"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/switzerland2.png",
    location: "Switzerland",
    subtitle: "Adventure Awaits",
    title: "Discover The\nWorld",
    description:
      "Experience breathtaking destinations, unforgettable adventures, and luxury travel packages designed for every explorer.",
  },
  {
    id: 2,
    image: "/images/france2.jpg",
    location: "France",
    subtitle: "Luxury Escape",
    title: "Feel The\nParadise",
    description:
      "Relax on crystal-clear beaches and enjoy premium travel experiences crafted with comfort and elegance.",
  },
  {
    id: 3,
    image: "/images/taj mahal.jpg",
    location: "India",
    subtitle: "Explore Nature",
    title: "Travel With\nPassion",
    description:
      "Create unforgettable memories while exploring the world's most beautiful destinations.",
  },
  {
    id: 4,
    image: "/images/3.jpg",
    location: "Netherland",
    subtitle: "Travel Smart",
    title: "Discover\nLuxury",
    description:
      "Modern cities, stunning desert adventures, and unforgettable journeys await your arrival on this incredible, scenic getaway.",
  },
  {
    id: 5,
    image: "/images/germany.jpg", // fixed typo
    location: "Germany",
    subtitle: "Travel Smart",
    title: "Discover\nLuxury",
    description:
      "Modern cities, stunning desert adventures, and unforgettable journeys await your arrival on this incredible, scenic getaway.",
  },
  {
    id: 6,
    image: "/images/maldives.jpg",
    location: "Maldives",
    subtitle: "Travel Smart",
    title: "Discover\nLuxury",
    description:
      "Modern cities, stunning desert adventures, and unforgettable journeys await your arrival on this incredible, scenic getaway.",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Update number of visible cards based on screen width
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(2); // mobile: 2 cards
      } else if (window.innerWidth < 768) {
        setCardsToShow(2); // tablet: 2 cards (can adjust)
      } else {
        setCardsToShow(3); // desktop: 3 cards
      }
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Auto-slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keep active card in view
  useEffect(() => {
    const maxIndex = Math.max(0, slides.length - cardsToShow);
    if (active < cardIndex) {
      setCardIndex(Math.max(0, active));
    } else if (active >= cardIndex + cardsToShow) {
      setCardIndex(Math.min(active - cardsToShow + 1, maxIndex));
    }
  }, [active, cardIndex, cardsToShow]);

  const nextCards = () => {
    if (active < slides.length - 1) setActive((prev) => prev + 1);
  };

  const prevCards = () => {
    if (active > 0) setActive((prev) => prev - 1);
  };

  const visibleCards = slides.slice(cardIndex, cardIndex + cardsToShow);
  const isPrevDisabled = active === 0;
  const isNextDisabled = active === slides.length - 1;

 return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        pt-5
        pb-5

        md:min-h-screen
        md:pt-8
        md:pb-6
        md:w-screen
        md:max-w-none
        md:mx-0
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[active].id}
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            absolute
            inset-0
            z-0
          "
        >
          <Image
            src={slides[active].image}
            alt={slides[active].location}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

   


      {/* Left Overlay */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#041C32]/95 via-[#041C32]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start pt-20 pl-4 md:pt-28 md:pl-12 lg:pl-16">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <motion.p
            key={slides[active].subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-xl text-sky-700 md:mb-4 md:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-satisfy)" }}
          >
            {slides[active].subtitle}
          </motion.p>

          {/* Heading */}
          <motion.h1
            key={slides[active].title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:text-5xl xl:text-6xl whitespace-pre-line"
          >
            {slides[active].title}
          </motion.h1>

          {/* Description */}
          <motion.p
            key={slides[active].description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-3 max-w-xl text-sm leading-6 text-slate-200 md:mt-4 md:text-base md:leading-7"
          >
            {slides[active].description}
          </motion.p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">

            <Link
              href="/routes"
              className="rounded-full bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-sky-600 md:px-6 md:py-3 md:text-sm"
            >
              Explore Tours
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/40 bg-transparent px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white hover:text-slate-900 md:px-6 md:py-3 md:text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Destination Cards Carousel */}
        <div className="mt-6 w-full md:mt-8">
          <div className="flex flex-nowrap items-center gap-2 md:gap-3">
            {visibleCards.map((slide, idx) => {
              const originalIndex = cardIndex + idx;
              const isActive = active === originalIndex;
              return (
                <div
                  key={slide.id}
                  className={`relative flex-shrink-0 w-32 h-24 md:w-44 md:h-36 transition-all duration-500 ${isActive
                      ? "border-2 border-sky-400 shadow-lg shadow-sky-400/30 rounded-xl"
                      : "opacity-80"
                    }`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={slide.image}
                      alt={slide.location}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 md:bottom-2 md:left-3">
                      <p className="text-xs font-semibold text-white tracking-wide md:text-sm">
                        {slide.location}
                      </p>
                    </div>
                  </div>

                  {/* Left Arrow (on first visible card) */}
                  {idx === 0 && (
                    <button
                      onClick={prevCards}
                      disabled={isPrevDisabled}
                      className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition ${isPrevDisabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-sky-500"
                        }`}
                      style={{ transform: "translate(-50%, -50%)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 md:h-4 md:w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Right Arrow (on last visible card) */}
                  {idx === visibleCards.length - 1 && (
                    <button
                      onClick={nextCards}
                      disabled={isNextDisabled}
                      className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition ${isNextDisabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-sky-500"
                        }`}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 md:h-4 md:w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Dots – below cards */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`transition-all duration-300 ${active === index
                  ? "h-2 w-6 rounded-full bg-sky-400"
                  : "h-2 w-2 rounded-full bg-white/60 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Dots – right side */}
      <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex md:right-8 md:gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`transition-all duration-300 ${active === index
                ? "h-8 w-1.5 md:h-10 md:w-2 rounded-full bg-sky-400"
                : "h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/60 hover:bg-white"
              }`}
          />
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}

