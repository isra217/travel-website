"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  const phone = "+923001234567"; // Change to your number
  const whatsapp = "923001234567"; // No + sign

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        aria-label="Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:shadow-xl"
      >
        <FaPhoneAlt size={18} />
      </a>

    </div>
  );
}