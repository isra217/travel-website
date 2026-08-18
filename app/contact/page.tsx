"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Send,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// ─── FAQ data ───────────────────────────────────────────

const faqs = [
  {
    q: "How quickly will you respond?",
    a: "Our team usually responds within 24 hours.",
  },
  {
    q: "Can you create customized travel packages?",
    a: "Yes, our trips can be tailored around your destination, dates and preferences.",
  },
  {
    q: "Do you provide visa assistance?",
    a: "Yes, we provide guidance for selected destinations.",
  },
  {
    q: "Can I book flights and hotels together?",
    a: "Yes, depending on the package and destination.",
  },
];

// ─── Component ──────────────────────────────────────────

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/packages/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("BACKEND RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    alert("Thank you! Your message has been sent successfully.");

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};

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
            backgroundImage: "url('/images/why.jpg')",
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
             Let’s Design Your 
              <span className="text-gradient"> Next Chapter</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/95 md:text-base">
              Get in touch with our dedicated travel curators today, and let us bring your ideal travel vision to life.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          2. GET IN TOUCH SECTION
      ========================================================= */}

      <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-white py-16 md:py-24">

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
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            {/* Satisfy Heading */}
            <p
              className="text-2xl text-sky-700 lg:text-3xl"
              style={{
                fontFamily: "var(--font-satisfy)",
              }}
            >
              Let&apos;s Connect
            </p>

            {/* Main Heading */}
            <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              Get In Touch
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              Have a destination in mind or need help planning your next
              adventure? Tell us what you&apos;re looking for and let&apos;s
              create a journey designed around you.
            </p>

          </motion.div>


          {/* =====================================================
              CONTACT CARD
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[30px] border border-white/70 bg-white/50 shadow-[0_20px_60px_rgba(35,41,70,0.12)] backdrop-blur-xl"
          >

            <div className="grid grid-cols-1 md:grid-cols-2">


              {/* =================================================
                  LEFT — COLORED GLASS CONTACT PANEL
              ================================================= */}

              <div className="relative overflow-hidden border-b border-white/30 bg-gradient-to-br from-[var(--color-secondary)]/85 via-sky-700/75 to-sky-500/70 p-8 text-white backdrop-blur-xl md:border-b-0 md:border-r md:p-12">

                {/* Glass Highlight */}
                <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" />

                <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full border border-white/10 bg-sky-300/10 blur-sm" />


                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between">

                  <div>

                    {/* Heading */}
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      Contact Information
                    </h3>

                    {/* Description */}
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/85">
                      We&apos;re here to help you plan your next adventure.
                      Whether you have a destination in mind or need some
                      inspiration, we&apos;d love to hear from you.
                    </p>


                    {/* Contact Details */}
                    <div className="mt-8 space-y-6">


                      {/* Phone */}
                      <div className="flex items-start gap-4">

                        <div className="rounded-full border border-white/30 bg-white/10 p-3 shadow-sm backdrop-blur-md">
                          <Phone
                            size={19}
                            className="text-white"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            Phone
                          </h4>

                          <p className="mt-1 text-sm text-white/80">
                            +1 (555) 123-4567
                          </p>
                        </div>

                      </div>


                      {/* Email */}
                      <div className="flex items-start gap-4">

                        <div className="rounded-full border border-white/30 bg-white/10 p-3 shadow-sm backdrop-blur-md">
                          <Mail
                            size={19}
                            className="text-white"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            Email
                          </h4>

                          <p className="mt-1 text-sm text-white/80">
                            hello@travel-website.com
                          </p>
                        </div>

                      </div>


                      {/* Location */}
                      <div className="flex items-start gap-4">

                        <div className="rounded-full border border-white/30 bg-white/10 p-3 shadow-sm backdrop-blur-md">
                          <MapPin
                            size={19}
                            className="text-white"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            Location
                          </h4>

                          <p className="mt-1 text-sm text-white/80">
                            New York, USA
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      SOCIAL ICONS
                  ================================================= */}

                  <div className="mt-10">

                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/65">
                      Follow Our Journey
                    </p>

                    <div className="flex gap-3">

                      {/* Facebook */}
                      <a
                        href="#"
                        aria-label="Facebook"
                        className="rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/50 hover:bg-sky-200/30 hover:text-white hover:shadow-lg hover:shadow-sky-900/20"
                      >
                        <FaFacebook size={15} />
                      </a>


                      {/* Twitter */}
                      <a
                        href="#"
                        aria-label="Twitter"
                        className="rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/50 hover:bg-sky-200/30 hover:text-white hover:shadow-lg hover:shadow-sky-900/20"
                      >
                        <FaTwitter size={15} />
                      </a>


                      {/* Instagram */}
                      <a
                        href="#"
                        aria-label="Instagram"
                        className="rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/50 hover:bg-sky-200/30 hover:text-white hover:shadow-lg hover:shadow-sky-900/20"
                      >
                        <FaInstagram size={15} />
                      </a>


                      {/* YouTube */}
                      <a
                        href="#"
                        aria-label="YouTube"
                        className="rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/50 hover:bg-sky-200/30 hover:text-white hover:shadow-lg hover:shadow-sky-900/20"
                      >
                        <FaYoutube size={15} />
                      </a>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  RIGHT — FORM
              ================================================= */}

              <div className="bg-white/75 p-8 backdrop-blur-xl md:p-12">

                {/* Form Heading */}
                <h3 className="text-2xl font-bold text-[var(--color-secondary)] md:text-3xl">
                  Send a Message
                </h3>

                {/* Form Description */}
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Share a few details about your trip and we&apos;ll help you
                  plan the perfect experience.
                </p>


                {/* Form */}
                <form
                  id="form"
                  onSubmit={handleSubmit}
                  className="mt-7"
                >

                  {/* Name + Email */}
                  {/* Name + Phone */}
<div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Name */}
  <div>
    <label className="mb-2 block text-xs font-medium text-slate-500">
      Your Name
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full border-0 border-b border-slate-200 bg-transparent py-3 text-sm text-slate-800 outline-none transition focus:border-[var(--color-primary)]"
      placeholder="John Trangely"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="mb-2 block text-xs font-medium text-slate-500">
      Your Phone
    </label>

    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
      className="w-full border-0 border-b border-slate-200 bg-transparent py-3 text-sm text-slate-800 outline-none transition focus:border-[var(--color-primary)]"
      placeholder="+1 (555) 123-4567"
    />
  </div>

</div>

{/* Email */}
<div className="mt-5">
  <label className="mb-2 block text-xs font-medium text-slate-500">
    Your Email
  </label>

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full border-0 border-b border-slate-200 bg-transparent py-3 text-sm text-slate-800 outline-none transition focus:border-[var(--color-primary)]"
    placeholder="hello@travel-website.com"
  />
</div>

{/* Message */}
<div className="mt-5">
  <label className="mb-2 block text-xs font-medium text-slate-500">
    Message
  </label>

  <textarea
    name="message"
    value={formData.message}
    onChange={handleChange}
    rows={5}
    required
    className="w-full resize-none border-0 border-b border-slate-200 bg-transparent py-3 text-sm text-slate-800 outline-none transition focus:border-[var(--color-primary)]"
    placeholder="Tell us how we can help you..."
  />
</div>
                  {/* Send Button */}
                  <div className="mt-7">

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-dark)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                    >
                      Send Message

                      <Send size={16} />

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          3. FAQ SECTION
      ========================================================= */}

      <section className="bg-white/50 py-20 md:py-28">

        <div className="section-container">

          {/* FAQ Heading */}
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
              FAQ
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              Frequently Asked Questions
            </h2>

          </motion.div>


          {/* FAQ Items */}
          <div className="mx-auto mt-12 max-w-3xl space-y-4">

            {faqs.map((faq, idx) => (

              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: idx * 0.1,
                }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                {/* Question */}
                <button
                  onClick={() =>
                    setOpenFaq(
                      openFaq === idx
                        ? null
                        : idx
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-slate-50"
                >

                  <span>
                    {faq.q}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      openFaq === idx
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>


                {/* Answer */}
                <AnimatePresence>

                  {openFaq === idx && (

                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="px-6 pb-5 text-sm text-[var(--color-muted)]"
                    >
                      {faq.a}
                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          4. FINAL CTA
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

            <h2 className="text-3xl font-bold md:text-4xl lg:text-3xl">
              Your journey begins with a conversation
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
              Wherever you&apos;re dreaming of going, we&apos;re here to help
              you get there.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

              {/* Explore Button */}
              <Link
                href="/routes#services"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-lg"
              >
                Explore Destinations
              </Link>


              {/* Contact Button */}
              <Link
                href="/contact"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/60 bg-white/70 px-6 py-4 text-sm font-semibold text-slate-900 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                Contact Us
              </Link>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}