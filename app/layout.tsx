// app/layout.tsx

import type { Metadata } from "next";
import {
  Playfair_Display,
  Manrope,
  Satisfy,
} from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const satisfy = Satisfy({
  subsets: ["latin"],
  variable: "--font-satisfy",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Travel Explorer",
  description: "Discover breathtaking destinations around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${manrope.variable} ${satisfy.variable} antialiased`}
      >
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}