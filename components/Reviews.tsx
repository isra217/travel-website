"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { number: "10K+", label: "Happy Travelers", description: "Trusted journeys around the world." },
  { number: "50+", label: "Destinations", description: "Curated escapes across six continents." },
  { number: "98%", label: "Satisfaction", description: "Rated excellent by our travelers." },
  { number: "15+", label: "Years Experience", description: "Deep local knowledge & care." },
];

// Extended review list with web images (randomuser.me)
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "Switzerland Tour",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Everything was perfectly organized. The hotels, transportation and sightseeing exceeded our expectations.",
  },
  {
    id: 2,
    name: "Ahmed Ali",
    country: "Bali Vacation",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Professional guides, amazing destinations and outstanding customer support throughout the entire journey.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    country: "Maldives Escape",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "One of the best travel experiences I've ever had. I can't wait to book my next adventure.",
  },
  {
    id: 4,
    name: "Michael Chen",
    country: "Japan Discovery",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "Incredible attention to detail. Every moment felt curated just for us.",
  },
  {
    id: 5,
    name: "Priya Sharma",
    country: "Greece Getaway",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    review:
      "The local guides made all the difference – we truly experienced the culture.",
  },
  {
    id: 6,
    name: "James O'Brien",
    country: "New Zealand Adventure",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "Seamless logistics and breathtaking scenery. Highly recommend this team.",
  },
];

export default function Reviews() {
  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update itemsPerView based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(reviews.length / itemsPerView);

  // Reset slide index when itemsPerView changes
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(Math.max(0, totalSlides - 1));
    }
  }, [totalSlides, currentSlide]);

  // Auto-play
  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Build slides array
  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(reviews.slice(i * itemsPerView, i * itemsPerView + itemsPerView));
  }

  return (
    <section id="reviews" className="overflow-hidden bg-[var(--color-background)] py-16 lg:py-24">
      <div className="section-container relative z-10">
        {/* Stats above testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-6xl rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-soft backdrop-blur-xl md:p-8"
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-3xl bg-slate-950/5 p-3 text-center transition hover:bg-sky-50 md:p-6"
              >
                <p className="text-2xl font-semibold text-[var(--color-secondary)] md:text-4xl">
                  {item.number}
                </p>
                <p
                  className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 md:mt-2 md:text-sm"
                  style={{ fontFamily: "var(--font-satisfy)" }}
                >
                  {item.label}
                </p>
                <p className="mt-1 line-clamp-2 break-words text-xs leading-tight text-[var(--color-muted)] md:mt-3 md:text-sm md:leading-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p
            className="text-xl text-sky-700 lg:text-3xl"
            style={{ fontFamily: "var(--font-satisfy)" }}
          >
            Testimonials
          </p>

          <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--color-secondary)] lg:text-4xl">
            What travelers say about our service
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)] lg:text-base">
            Every journey is designed to feel personal, seamless, and memorable
            from the first request to the last sunset.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-6xl px-4 md:px-0">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideReviews, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-1"
                >
                  {slideReviews.map((review) => (
                    <div
                      key={review.id}
                      className="relative rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      {/* Stars */}
                      <div className="mb-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400 md:size-[18px]"
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
                        “{review.review}”
                      </p>

                      {/* User info */}
                      <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
                        <div className="relative">
                          <Image
                            src={review.image}
                            alt={review.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover ring-2 ring-sky-100 transition-all group-hover:ring-sky-300 md:w-[60px] md:h-[60px]"
                            unoptimized
                          />
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white md:h-4 md:w-4" />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-sky-700 md:text-base">
                            {review.name}
                          </h3>
                          <p className="text-xs font-medium text-sky-500 md:text-sm">
                            {review.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus:outline-none md:-left-6 md:p-2"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-5 w-5 text-slate-700 md:h-6 md:w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus:outline-none md:-right-6 md:p-2"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-5 w-5 text-slate-700 md:h-6 md:w-6" />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2 md:mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-6 bg-sky-600"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to reviews set ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
