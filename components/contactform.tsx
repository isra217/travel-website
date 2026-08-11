 "use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Globe } from "lucide-react";

export default function ContactForm() {
    return (
        <section
            id="contact"
            className="relative bg-[var(--color-background)] py-20 lg:py-24"
        >
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <span className="inline-block rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-sky-600">
                        Contact Us
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                        Let&apos;s plan your next escape
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                        Tell us where you want to go and we will create a
                        thoughtful itinerary that feels calm, elevated, and
                        easy.
                    </p>
                </motion.div>

                <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* LEFT – Glassy Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="rounded-[30px] bg-white/40 p-8 shadow-xl shadow-sky-200/40 backdrop-blur-md backdrop-saturate-150 ring-1 ring-white/70"
                    >
                        <h3 className="text-2xl font-bold text-slate-900">
                            Send us a message
                        </h3>
                        <p className="mt-2 text-base leading-7 text-slate-600">
                            Fill in the details and we’ll get back to you
                            within 24 hours.
                        </p>

                        <form className="mt-6 space-y-5">
                            {/* Row 1: Full Name + Email */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="full-name"
                                        className="mb-1 block text-sm font-medium text-slate-700"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="full-name"
                                        placeholder="John Doe"
                                        className="w-full rounded-full border-0 bg-white/60 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1 block text-sm font-medium text-slate-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-full border-0 bg-white/60 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone + Subject */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-1 block text-sm font-medium text-slate-700"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+92 300 1234567"
                                        className="w-full rounded-full border-0 bg-white/60 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-1 block text-sm font-medium text-slate-700"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Dream destination"
                                        className="w-full rounded-full border-0 bg-white/60 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Message – full width */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Tell us about your dream trip..."
                                    className="w-full rounded-3xl border-0 bg-white/60 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                />
                            </div>

                            {/* Submit button – compact and not full-width */}
                            <button
                                type="submit"
                                className="inline-flex w-auto items-center justify-center gap-2 rounded-full bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                            >
                                Send Message
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>

                    {/* RIGHT – Unified Glassy Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="rounded-[30px] bg-sky-50/40 p-8 shadow-xl shadow-sky-200/40 backdrop-blur-md backdrop-saturate-150 ring-1 ring-white/70">
                            <h3 className="mb-6 text-xl font-bold text-slate-900">
                                Reach out anytime
                            </h3>
                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-center gap-4 rounded-2xl bg-white/40 p-4 transition hover:bg-white/60">
                                    <div className="rounded-full bg-sky-100 p-3">
                                        <Phone
                                            size={18}
                                            className="text-sky-600"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Call Us
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            +92 300 1234567
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4 rounded-2xl bg-white/40 p-4 transition hover:bg-white/60">
                                    <div className="rounded-full bg-sky-100 p-3">
                                        <Mail
                                            size={18}
                                            className="text-sky-600"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Email
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            info@travel.com
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-4 rounded-2xl bg-white/40 p-4 transition hover:bg-white/60">
                                    <div className="rounded-full bg-sky-100 p-3">
                                        <MapPin
                                            size={18}
                                            className="text-sky-600"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Location
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            Islamabad, Pakistan
                                        </p>
                                    </div>
                                </div>

                                {/* Optional extra – Social or response time */}
                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                    <Globe size={16} className="text-sky-400" />
                                    <span>We reply within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}