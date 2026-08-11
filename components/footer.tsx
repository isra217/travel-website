
"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-slate-100 text-slate-800">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_32%)]" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full bg-white/70 blur-3xl" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="section-container relative z-10 py-12 md:py-14">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* =====================================================
              COMPANY
          ===================================================== */}

          <div>
            <div className="relative h-10 w-28 sm:h-12 sm:w-32">
              <Image
                src="/images/logo2.png"
                alt="Travelia"
                fill
                priority
                sizes="(max-width: 640px) 112px, 128px"
                className="object-contain object-left"
              />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Discover breathtaking destinations, unforgettable adventures,
              and luxury travel experiences crafted for every explorer.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-2.5">
              {[
                FaFacebookF,
                FaInstagram,
                FaXTwitter,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/50 text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-500 hover:text-white hover:shadow-lg"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 transition-colors duration-300 hover:text-sky-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition-colors duration-300 hover:text-sky-600"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/routes"
                  className="text-slate-600 transition-colors duration-300 hover:text-sky-600"
                >
                  Tours
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 transition-colors duration-300 hover:text-sky-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              DESTINATIONS
          ===================================================== */}

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Destinations
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="cursor-default text-slate-600 transition-colors duration-300 hover:text-sky-600">
                Switzerland
              </li>

              <li className="cursor-default text-slate-600 transition-colors duration-300 hover:text-sky-600">
                Bali
              </li>

              <li className="cursor-default text-slate-600 transition-colors duration-300 hover:text-sky-600">
                Maldives
              </li>

              <li className="cursor-default text-slate-600 transition-colors duration-300 hover:text-sky-600">
                Greece
              </li>

              <li className="cursor-default text-slate-600 transition-colors duration-300 hover:text-sky-600">
                Dubai
              </li>
            </ul>
          </div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Contact
            </h3>

            <div className="mt-4 space-y-4 text-sm">

              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 shrink-0 text-sky-600"
                  size={17}
                />

                <p className="text-slate-600">
                  Islamabad, Pakistan
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  className="shrink-0 text-sky-600"
                  size={16}
                />

                <p className="text-slate-600">
                  +92 300 1234567
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  className="shrink-0 text-sky-600"
                  size={16}
                />

                <p className="text-slate-600">
                  info@travel.com
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-300/60 pt-5 text-xs md:flex-row">

          <p className="text-slate-500">
            © 2026 Travelia. All Rights Reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-slate-500 transition-colors duration-300 hover:text-sky-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition-colors duration-300 hover:text-sky-600"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

