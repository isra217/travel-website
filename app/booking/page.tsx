
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

interface PackageData {
  id: string;
  name: string;
  country: string;
  price: number;
  description: string;
  duration: string[];
  coverImage: string;
  slug: string;
}

function BookingContent() {
  const searchParams = useSearchParams();

  const packageSlug = searchParams.get("package");

  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loadingPackage, setLoadingPackage] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    travelDate: "",
    duration: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // GET SELECTED PACKAGE
  // ==========================================

  useEffect(() => {
    if (!packageSlug) {
      setLoadingPackage(false);
      return;
    }

    const fetchPackage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/packages/${packageSlug}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Package not found");
        }

        setPackageData(data.package);

        if (data.package.duration?.length > 0) {
          setFormData((previous) => ({
            ...previous,
            duration: data.package.duration[0],
          }));
        }
      } catch (err) {
        console.error("Package error:", err);
        setError("Unable to load the selected package.");
      } finally {
        setLoadingPackage(false);
      }
    };

    fetchPackage();
  }, [packageSlug]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT BOOKING
  // ==========================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setSuccess("");
    setError("");

    if (!packageData) {
      setError("Please select a valid package.");
      setSubmitting(false);
      return;
    }

    try {
      const bookingData = {
        packageId: packageData.id,
        packageName: packageData.name,
        packageSlug: packageData.slug,
        country: packageData.country,
        price: packageData.price,

        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        travelers: Number(formData.travelers),
        travelDate: formData.travelDate,
        duration: formData.duration,
        message: formData.message,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/packages/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Booking failed");
      }

      setSuccess(
        "Your booking request has been submitted successfully! Our travel team will contact you shortly."
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        travelers: "1",
        travelDate: "",
        duration: packageData.duration?.[0] || "",
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

  // ==========================================
  // LOADING
  // ==========================================

  if (loadingPackage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Loading your selected package...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // NO PACKAGE
  // ==========================================

  if (!packageSlug || !packageData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
            Package not found
          </h1>

          <p className="mt-3 text-[var(--color-muted)]">
            Please return to our packages and select a package to book.
          </p>

          <a
            href="/routes"
            className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            View Packages
          </a>
        </div>
      </main>
    );
  }

  // ==========================================
  // BOOKING PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* HERO / BACKGROUND IMAGE SECTION */}

      <section
        className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${packageData.coverImage})`,
        }}
      >
        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/35 to-slate-950/70" />

        <div className="section-container relative z-10 px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl"
          >
            <p
              className="text-2xl text-sky-300 md:text-3xl"
              style={{ fontFamily: "var(--font-satisfy)" }}
            >
              Book Your Journey
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Let&apos;s plan your trip
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
              Your next adventure starts here. Tell us about your travel
              plans and our team will help you create a journey worth
              remembering.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/90">
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
                {packageData.name}
              </span>

              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
                {packageData.country}
              </span>

              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
                From ${packageData.price} / person
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKING CONTENT */}

      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* SELECTED PACKAGE */}

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-fit overflow-hidden rounded-[30px] bg-white shadow-xl"
            >
              {/* IMAGE */}

              <div className="relative h-64 w-full">
                <img
                  src={packageData.coverImage}
                  alt={packageData.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-sky-500/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    ${packageData.price} / person
                  </span>
                </div>
              </div>

              {/* PACKAGE INFO */}

              <div className="p-6 md:p-7">
                <h2 className="text-2xl font-bold text-[var(--color-secondary)]">
                  {packageData.name}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <MapPin size={16} className="text-sky-600" />
                  {packageData.country}
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <Clock size={16} className="text-sky-600" />

                  <span>{packageData.duration?.join(" • ")}</span>
                </div>

                <div className="my-5 border-t border-[var(--color-border)]" />

                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {packageData.description}
                </p>

                <div className="mt-6 rounded-2xl bg-sky-50 p-4">
                  <p className="text-xs text-[var(--color-muted)]">
                    Starting from
                  </p>

                  <p className="mt-1 text-2xl font-bold text-sky-700">
                    ${packageData.price}
                    <span className="ml-1 text-sm font-normal">
                      / person
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* BOOKING FORM */}

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[30px] bg-white p-6 shadow-xl md:p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--color-secondary)]">
                Your Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Tell us a little about yourself and your travel plans.
              </p>

              {/* SUCCESS MESSAGE */}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="font-semibold">
                      Booking request submitted!
                    </p>

                    <p className="mt-1 leading-6 text-green-700/90">
                      {success.replace(
                        "Your booking request has been submitted successfully! ",
                        ""
                      )}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* NAME + EMAIL */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* NAME */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
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
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>
                </div>

                {/* PHONE + TRAVELERS */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* PHONE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
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
                        required
                        placeholder="+92 300 1234567"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  {/* TRAVELERS */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Number of Travelers
                    </label>

                    <div className="relative">
                      <Users
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>
                </div>

                {/* DATE + DURATION */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* DATE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
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

                  {/* DURATION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Preferred Duration
                    </label>

                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    >
                      {packageData.duration?.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Special Requests
                  </label>

                  <div className="relative">
                    <MessageSquare
                      size={17}
                      className="absolute left-4 top-4 text-slate-400"
                    />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about any preferences or special requests..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* SUBMIT */}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Booking Request"}
                  </button>

                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Submitting this form sends a booking request to our
                    travel team. We will contact you to confirm the details.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ==========================================================
// PAGE WITH SUSPENSE
// ==========================================================

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Loading your booking page...
            </p>
          </div>
        </main>
      }
    >
      <BookingContent />
    </Suspense>
  );
}