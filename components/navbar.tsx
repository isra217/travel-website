

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/routes" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-md backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 ${
          scrolled ? "py-2" : "py-2"
        }`}
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href="/"
          className="relative flex h-[45px] w-[155px] items-center transition-transform duration-300 hover:scale-[1.02] sm:w-[165px]"
        >
          <Image
            src="/images/logo2.png"
            alt="Travelia"
            fill
            priority
            sizes="165px"
            className={`object-contain object-left transition-all duration-300 ${
              scrolled
                ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                : "drop-shadow-[0_2px_7px_rgba(0,0,0,0.7)]"
            }`}
          />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <div className="flex items-center gap-8">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative py-1 text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "text-slate-800 hover:text-sky-600"
                    : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] hover:text-white"
                }`}
              >
                {item.name}

                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full transition-all duration-300 ease-out group-hover:w-full ${
                    scrolled
                      ? "bg-sky-500"
                      : "bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.9)]"
                  }`}
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* =====================================================
            BOOK NOW
        ===================================================== */}

        <div className="hidden lg:block">
          <Link
            href="/routes"
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className={`rounded-full p-1.5 transition-all duration-300 lg:hidden ${
            scrolled
              ? "text-slate-900 hover:bg-sky-100"
              : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          }`}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
            className="border-t border-slate-200/60 bg-white/95 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="group relative w-fit py-2 text-base font-semibold text-slate-800 transition-colors duration-300 hover:text-sky-600"
                >
                  {item.name}

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-700 hover:shadow-md"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

