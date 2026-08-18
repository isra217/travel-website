"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingButtons from "@/components/floatingbuttons";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      {children}

      <FloatingButtons />

      <Footer />
    </>
  );
}