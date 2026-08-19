"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  MessageSquare,
  Map,
  Users,
  ChevronRight,
  Plus,
} from "lucide-react";

interface Booking {
  id: string;
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}

interface Contact {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

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

export default function AdminDashboardPage() {
  const router = useRouter();

  // =====================================================
  // DASHBOARD DATA
  // =====================================================

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [bookingsResponse, contactsResponse, packagesResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/bookings`, {
              method: "GET",
              cache: "no-store",
            }),

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/contact`, {
              method: "GET",
              cache: "no-store",
            }),

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`, {
              method: "GET",
              cache: "no-store",
            }),
          ]);

        const bookingsData = await bookingsResponse.json();
        const contactsData = await contactsResponse.json();
        const packagesData = await packagesResponse.json();

        if (!bookingsResponse.ok) {
          throw new Error(
            bookingsData.message || "Failed to fetch bookings"
          );
        }

        if (!contactsResponse.ok) {
          throw new Error(
            contactsData.message || "Failed to fetch contact messages"
          );
        }

        if (!packagesResponse.ok) {
          throw new Error(
            packagesData.message || "Failed to fetch routes"
          );
        }

        setBookings(bookingsData.bookings || []);
        setContacts(contactsData.contacts || []);
        setPackages(packagesData.packages || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =====================================================
  // CUSTOMER COUNT
  // =====================================================

  const uniqueCustomers = new Set<string>();

  bookings.forEach((booking) => {
    const email = booking.customer?.email;
    if (email) {
      uniqueCustomers.add(email.toLowerCase().trim());
    }
  });

  contacts.forEach((contact) => {
    if (contact.email) {
      uniqueCustomers.add(contact.email.toLowerCase().trim());
    }
  });

  const customerCount = uniqueCustomers.size;

  // =====================================================
  // LOADING VALUE
  // =====================================================

  const displayValue = (value: number) => {
    if (loading) {
      return "...";
    }
    return value.toLocaleString();
  };

  return (
    <div className="w-full">

      {/* =====================================================
          PAGE HEADING
      ===================================================== */}

      <div className="mb-8">
        <p
          className="text-2xl text-sky-700"
          style={{
            fontFamily: "var(--font-satisfy)",
          }}
        >
          Welcome Back
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
          Travelia Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your travel packages, bookings and customer messages
          from one place.
        </p>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          STAT CARDS – now 4 in one row on large screens
      ===================================================== */}

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* =================================================
            BOOKINGS
        ================================================= */}

        <div
          onClick={() => router.push("/admin/bookings")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
              <CalendarCheck size={21} className="text-sky-600" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Total
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold text-[var(--color-secondary)]">
            {displayValue(bookings.length)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Bookings
          </p>
        </div>

        {/* =================================================
            CONTACTS
        ================================================= */}

        <div
          onClick={() => router.push("/admin/contacts")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <MessageSquare size={21} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Total
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold text-[var(--color-secondary)]">
            {displayValue(contacts.length)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Contact Messages
          </p>
        </div>

        {/* =================================================
            ROUTES
        ================================================= */}

        <div
          onClick={() => router.push("/admin/routes")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Map size={21} className="text-indigo-600" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Active
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold text-[var(--color-secondary)]">
            {displayValue(packages.length)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Travel Routes
          </p>
        </div>

        {/* =================================================
            CUSTOMERS
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
              <Users size={21} className="text-cyan-600" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Users
            </span>
          </div>
          <p className="mt-5 text-3xl font-bold text-[var(--color-secondary)]">
            {displayValue(customerCount)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Customers
          </p>
        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="mt-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-secondary)]">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quickly access the main areas of your admin panel.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {/* Bookings Quick Action */}
          <button
            onClick={() => router.push("/admin/bookings")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                <CalendarCheck size={21} className="text-sky-600" />
              </div>
              <ChevronRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-500"
              />
            </div>
            <h3 className="mt-5 font-semibold text-slate-800">
              View Bookings
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              View customer travel booking submissions.
            </p>
            <div className="mt-4 text-2xl font-bold text-sky-600">
              {loading ? "..." : bookings.length}
              <span className="ml-1 text-xs font-medium text-slate-400">
                total
              </span>
            </div>
          </button>

          {/* Contacts Quick Action */}
          <button
            onClick={() => router.push("/admin/contacts")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <MessageSquare size={21} className="text-blue-600" />
              </div>
              <ChevronRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
              />
            </div>
            <h3 className="mt-5 font-semibold text-slate-800">
              View Contacts
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Read messages and travel inquiries from visitors.
            </p>
            <div className="mt-4 text-2xl font-bold text-blue-600">
              {loading ? "..." : contacts.length}
              <span className="ml-1 text-xs font-medium text-slate-400">
                messages
              </span>
            </div>
          </button>

          {/* Routes Quick Action */}
          <button
            onClick={() => router.push("/admin/routes")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Map size={21} className="text-indigo-600" />
              </div>
              <ChevronRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
              />
            </div>
            <h3 className="mt-5 font-semibold text-slate-800">
              Manage Routes
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Add and manage the travel packages displayed on your website.
            </p>
            <div className="mt-4 text-2xl font-bold text-indigo-600">
              {loading ? "..." : packages.length}
              <span className="ml-1 text-xs font-medium text-slate-400">
                routes
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* =====================================================
          ADMIN OVERVIEW
      ===================================================== */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-xl text-sky-700"
              style={{
                fontFamily: "var(--font-satisfy)",
              }}
            >
              Manage your journey
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-secondary)]">
              Admin Overview
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Keep your travel website updated by managing packages,
              reviewing customer bookings and checking incoming inquiries.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/routes/create")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            <Plus size={17} />
            Add Route
          </button>
        </div>

        {/* Management Summary */}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {/* Routes */}
          <div
            onClick={() => router.push("/admin/routes")}
            className="cursor-pointer rounded-xl bg-slate-50 p-4 transition hover:bg-sky-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100">
                  <Map size={17} className="text-sky-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Routes
                  </p>
                  <p className="text-xs text-slate-400">
                    Manage packages
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-sky-600">
                {loading ? "..." : packages.length}
              </span>
            </div>
          </div>

          {/* Bookings */}
          <div
            onClick={() => router.push("/admin/bookings")}
            className="cursor-pointer rounded-xl bg-slate-50 p-4 transition hover:bg-blue-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <CalendarCheck size={17} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Bookings
                  </p>
                  <p className="text-xs text-slate-400">
                    Review requests
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {loading ? "..." : bookings.length}
              </span>
            </div>
          </div>

          {/* Contacts */}
          <div
            onClick={() => router.push("/admin/contacts")}
            className="cursor-pointer rounded-xl bg-slate-50 p-4 transition hover:bg-cyan-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100">
                  <MessageSquare size={17} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Contacts
                  </p>
                  <p className="text-xs text-slate-400">
                    Customer inquiries
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-cyan-600">
                {loading ? "..." : contacts.length}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}