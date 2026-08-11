"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";

interface TravelPackage {
  id: string;
  name: string;
  country: string;
  price: number;
  description: string;
  duration: string[];
  coverImage: string;
  slug: string;
}

export default function ServicesSection() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/packages"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();

        setPackages(data.packages || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Unable to load packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section
      id="services"
      className="bg-[var(--color-background)] py-20 lg:py-24"
    >
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p
            className="text-2xl text-sky-700 lg:text-3xl"
            style={{ fontFamily: "var(--font-satisfy)" }}
          >
            Our Services
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-tight text-[var(--color-secondary)] lg:text-4xl xl:text-5xl">
            Curated journeys that feel{" "}
            <span className="text-gradient">effortless</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] lg:text-base">
            Discover premium travel planning for luxury escapes, cultural
            adventures, and relaxing retreats built around your lifestyle.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-[var(--color-muted)]">
              Loading packages...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* No packages */}
        {!loading && !error && packages.length === 0 && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-[var(--color-muted)]">
              No travel packages available at the moment.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && packages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 grid gap-6 lg:grid-cols-3"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-lg"
              >

                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={pkg.coverImage}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between px-5 pt-4">

                  {/* Duration */}
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={16}
                      className="text-sky-600"
                    />

                    <span className="text-sm font-medium text-[var(--color-secondary)]">
                      {pkg.duration?.[0] || "Flexible duration"}
                    </span>
                  </div>

                  {/* Contact icons */}
                  <div className="flex items-center gap-1">

                    {/* WhatsApp */}
                    <button
                      className="rounded-full p-1.5 text-green-600 transition hover:bg-green-50"
                      aria-label="Contact via WhatsApp"
                      onClick={() =>
                        window.open(
                          "https://wa.me/1234567890",
                          "_blank"
                        )
                      }
                    >
                      <MessageCircle size={18} />
                    </button>

                    {/* Phone */}
                    <button
                      className="rounded-full p-1.5 text-blue-600 transition hover:bg-blue-50"
                      aria-label="Call us"
                      onClick={() =>
                        window.open("tel:+1234567890")
                      }
                    >
                      <Phone size={18} />
                    </button>

                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pb-5">

                  {/* Title */}
                  <h3 className="mt-1 text-xl font-bold text-[var(--color-secondary)]">
                    {pkg.name}
                  </h3>

                  {/* Country */}
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                    <MapPin
                      size={14}
                      className="text-sky-600"
                    />

                    <span>
                      {pkg.country}
                    </span>
                  </div>

                  {/* Divider */}
                  <hr className="my-3 border-[var(--color-border)]" />

                  {/* Description */}
                  <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {pkg.description}
                  </p>

                  {/* Price + Book */}
                  <div className="mt-4 flex items-center justify-between">

                    <div>
                      <span className="text-xs text-[var(--color-muted)]">
                        From
                      </span>

                      <span className="ml-1 text-lg font-bold text-[var(--color-secondary)]">
                        ${pkg.price}
                      </span>
                    </div>

                    {/* Book Now */}
                    <Link
                      href={`/booking?package=${encodeURIComponent(pkg.slug)}`}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                    >
                      Book Now
                    </Link>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/routes"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            View all packages
          </Link>
        </motion.div>

      </div>
    </section>
  );
}