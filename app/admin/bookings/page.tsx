"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  Users,
  Loader2,
  Inbox,
} from "lucide-react";

interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  packageSlug?: string;
  country?: string;
  price: number;

  customer: {
    fullName: string;
    email: string;
    phone: string;
  };

  travelers: number;
  travelDate: string;
  duration: string;
  message?: string;
  createdAt?: any;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:5000/api/packages/bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",

              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch bookings"
          );
        }

        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Fetch bookings error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <p
          className="text-2xl text-sky-700"
          style={{
            fontFamily: "var(--font-satisfy)",
          }}
        >
          Customer Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[var(--color-secondary)]">
          Bookings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View travel booking requests submitted by your customers.
        </p>

      </div>


      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}


      {/* ==========================================
          LOADING
      ========================================== */}

      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

          <div className="flex flex-col items-center gap-3">

            <Loader2
              size={28}
              className="animate-spin text-sky-600"
            />

            <p className="text-sm text-slate-500">
              Loading bookings...
            </p>

          </div>

        </div>
      )}


      {/* ==========================================
          EMPTY
      ========================================== */}

      {!loading && !error && bookings.length === 0 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
            <Inbox
              size={26}
              className="text-sky-600"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-800">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Customer booking requests will appear here.
          </p>

        </div>
      )}


      {/* ==========================================
          BOOKINGS
      ========================================== */}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-5">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
            >

              {/* Top */}

              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                      <CalendarCheck
                        size={20}
                        className="text-sky-600"
                      />
                    </div>

                    <div>

                      <h2 className="font-bold text-[var(--color-secondary)]">
                        {booking.packageName}
                      </h2>

                      <p className="text-xs text-slate-400">
                        Booking ID: {booking.id}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-xs text-slate-400">
                    Package Price
                  </p>

                  <p className="text-lg font-bold text-[var(--color-secondary)]">
                    ${Number(booking.price).toLocaleString()}
                  </p>

                </div>

              </div>


              {/* Customer + Trip */}

              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                {/* Customer */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer
                  </p>

                  <p className="mt-2 font-semibold text-slate-800">
                    {booking.customer?.fullName}
                  </p>

                </div>


                {/* Email */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                    <Mail
                      size={15}
                      className="text-sky-600"
                    />

                    <span className="break-all">
                      {booking.customer?.email}
                    </span>

                  </div>

                </div>


                {/* Phone */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                    <Phone
                      size={15}
                      className="text-sky-600"
                    />

                    {booking.customer?.phone}

                  </div>

                </div>


                {/* Travelers */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Travelers
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                    <Users
                      size={15}
                      className="text-sky-600"
                    />

                    {booking.travelers}

                  </div>

                </div>

              </div>


              {/* Travel Details */}

              <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">

                <div>

                  <p className="text-xs text-slate-400">
                    Country
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">

                    <MapPin
                      size={15}
                      className="text-sky-600"
                    />

                    {booking.country || "Not specified"}

                  </div>

                </div>


                <div>

                  <p className="text-xs text-slate-400">
                    Travel Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {booking.travelDate}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {booking.duration}
                  </p>

                </div>

              </div>


              {/* Message */}

              {booking.message && (
                <div className="mt-5">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer Message
                  </p>

                  <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {booking.message}
                  </p>

                </div>
              )}

            </div>

          ))}

        </div>
      )}

    </main>
  );
}