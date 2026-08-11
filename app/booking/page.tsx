"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

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

export default function BookingPage() {
  const searchParams = useSearchParams();

  const packageSlug = searchParams.get("package");

  const [selectedPackage, setSelectedPackage] =
    useState<TravelPackage | null>(null);

  const [loadingPackage, setLoadingPackage] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    travelDate: "",
    duration: "",
    message: "",
  });

  /*
   * Get selected package from backend
   */
  useEffect(() => {
    const fetchPackage = async () => {
      if (!packageSlug) {
        setLoadingPackage(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/packages/${packageSlug}`
        );

        if (!response.ok) {
          throw new Error("Package not found");
        }

        const data = await response.json();

        setSelectedPackage(data.package);
      } catch (err) {
        console.error("Package error:", err);
        setError("Unable to load the selected package.");
      } finally {
        setLoadingPackage(false);
      }
    };

    fetchPackage();
  }, [packageSlug]);

  /*
   * Handle input changes
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Submit booking
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPackage) {
      setError("Please select a valid package.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: selectedPackage.id,
            packageName: selectedPackage.name,
            packageSlug: selectedPackage.slug,
            country: selectedPackage.country,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit booking"
        );
      }

      setSuccess(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        travelers: "1",
        travelDate: "",
        duration: "",
        message: "",
      });
    } catch (err) {
      console.error("Booking error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * No package selected
   */
  if (!loadingPackage && !packageSlug) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
            No package selected
          </h1>

          <p className="mt-4 text-[var(--color-muted)]">
            Please select a travel package before making a booking.
          </p>
        </div>
      </main>
    );
  }

  /*
   * Loading
   */
  if (loadingPackage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <p className="text-[var(--color-muted)]">
          Loading booking details...
        </p>
      </main>
    );
  }

  /*
   * Package not found
   */
  if (!selectedPackage) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
            Package not found
          </h1>

          <p className="mt-4 text-[var(--color-muted)]">
            We couldn't find the travel package you selected.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-28">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p
            className="text-2xl text-sky-700 lg:text-3xl"
            style={{ fontFamily: "var(--font-satisfy)" }}
          >
            Plan Your Journey
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
            Book Your{" "}
            <span className="text-gradient">
              {selectedPackage.name}
            </span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
            Tell us a little about your trip and our team will
            get back to you with the next steps.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Selected Package */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            {/* Package Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedPackage.coverImage}
                alt={selectedPackage.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <h2 className="text-2xl font-bold text-white">
                  {selectedPackage.name}
                </h2>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin size={15} />
                  {selectedPackage.country}
                </div>
              </div>
            </div>

            {/* Package Info */}
            <div className="p-6">

              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {selectedPackage.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-sky-50 p-4">
                  <p className="text-xs text-[var(--color-muted)]">
                    Starting Price
                  </p>

                  <p className="mt-1 text-xl font-bold text-sky-700">
                    ${selectedPackage.price}
                  </p>
                </div>

                <div className="rounded-xl bg-sky-50 p-4">
                  <p className="text-xs text-[var(--color-muted)]">
                    Available Durations
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--color-secondary)]">
                    {selectedPackage.duration?.join(", ")}
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--color-secondary)]">
              Booking Information
            </h2>

            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Fill in your details and we'll contact you to
              confirm your trip.
            </p>

            {/* Success */}
            {success && (
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-700">
                <CheckCircle className="mt-0.5 shrink-0" size={20} />

                <div>
                  <p className="font-semibold">
                    Booking request submitted!
                  </p>

                  <p className="mt-1 text-sm">
                    Thank you. Our team will contact you soon.
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Full Name
                </label>

                <div className="relative">
                  <Users
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              {/* Travelers + Date */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                    Number of Travelers
                  </label>

                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                    Preferred Travel Date
                  </label>

                  <div className="relative">
                    <Calendar
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>

              </div>

              {/* Duration */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Preferred Duration
                </label>

                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">
                    Select duration
                  </option>

                  {selectedPackage.duration?.map((duration) => (
                    <option
                      key={duration}
                      value={duration}
                    >
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-secondary)]">
                  Special Requests
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us anything you'd like us to know..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full rounded-full px-6 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Booking Request"}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}