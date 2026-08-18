"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Map,
  LogOut,
  Menu,
  X,
  Users,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================================================
  // LOGIN PAGE – no sidebar/header
  // =========================================================
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // =========================================================
  // NAVIGATION
  // =========================================================
  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      name: "Bookings",
      icon: CalendarCheck,
      href: "/admin/bookings",
    },
    {
      name: "Contacts",
      icon: MessageSquare,
      href: "/admin/contacts",
    },
    {
      name: "Routes",
      icon: Map,
      href: "/admin/routes",
    },
  ];

  // =========================================================
  // ACTIVE CHECK
  // =========================================================
  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl">
            <Image
              src="/images/logo2.png"
              alt="Travelia Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-[var(--color-secondary)]">
            Admin
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label="Toggle admin menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col items-center border-b border-slate-100 px-6 py-1">
          <div className="relative h-25 w-25">
            <Image
              src="/images/logo2.png"
              alt="Travelia Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* NAVIGATION – no "Management" label */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`
                    group flex w-full cursor-pointer items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200
                    hover:scale-[1.02]
                    ${active
                      ? "bg-sky-50 text-sky-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    className={
                      active
                        ? "text-sky-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span>{item.name}</span>
                  {active && (
                    <ChevronRight
                      size={16}
                      className="ml-auto text-sky-500"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full cursor-pointer items-center gap-3
              rounded-xl px-3 py-3
              text-sm font-medium
              text-red-500
              transition-all duration-200
              hover:bg-red-50 hover:scale-[1.02]
            "
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          MAIN ADMIN AREA
      ===================================================== */}
      <div className="lg:ml-64">

        {/* =================================================
            DESKTOP TOP HEADER
        ================================================= */}
        <header
          className="
            hidden h-20
            items-center justify-between
            border-b border-slate-200
            bg-white
            px-8
            lg:flex
          "
        >
          {/* Left: Logo + "Admin Panel" */}
          <div className="flex items-center gap-3">

            <div>
              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                Admin Panel
              </h2>

            </div>
          </div>

          {/* Right: Admin info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
                <Users size={18} className="text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Administrator
                </p>
                <p className="text-xs text-slate-400">
                  Travelia Admin
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="min-h-[calc(100vh-5rem)] p-5 md:p-8">
          {children}
        </section>

      </div>
    </main>
  );
}