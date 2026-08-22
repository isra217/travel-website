"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Loader2,
  Map,
  X,
  AlertTriangle,
} from "lucide-react";

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

export default function AdminRoutesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==========================================
  // DELETE CONFIRMATION MODAL
  // ==========================================

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
    name: string;
  }>({
    open: false,
    id: null,
    name: "",
  });

  // ==========================================
  // FETCH ROUTES
  // ==========================================

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured."
        );
      }

      const response = await fetch(
        `${apiUrl}/api/packages`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch routes"
        );
      }

      setPackages(data.packages || []);
    } catch (error) {
      console.error("Fetch routes error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load routes."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ROUTES
  // ==========================================

  useEffect(() => {
    fetchPackages();
  }, []);

  // ==========================================
  // OPEN DELETE MODAL
  // ==========================================

  const openDeleteModal = (
    id: string,
    name: string
  ) => {
    setDeleteModal({
      open: true,
      id,
      name,
    });
  };

  // ==========================================
  // CLOSE DELETE MODAL
  // ==========================================

  const closeDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModal({
      open: false,
      id: null,
      name: "",
    });
  };

  // ==========================================
  // DELETE ROUTE
  // ==========================================

  const handleDelete = async () => {
    if (!deleteModal.id) {
      return;
    }

    const id = deleteModal.id;

    try {
      setDeletingId(id);
      setError("");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured."
        );
      }

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${apiUrl}/api/packages/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete route"
        );
      }

      // Remove deleted package from screen
      setPackages((currentPackages) =>
        currentPackages.filter(
          (pkg) => pkg.id !== id
        )
      );

      // Close modal
      setDeleteModal({
        open: false,
        id: null,
        name: "",
      });
    } catch (error) {
      console.error("Delete route error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete route."
      );

      // Keep modal open if deletion failed
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main>
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p
            className="text-2xl text-sky-700"
            style={{
              fontFamily: "var(--font-satisfy)",
            }}
          >
            Travel Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[var(--color-secondary)]">
            Routes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the travel packages displayed on your website.
          </p>
        </div>

        {/* Add Route */}

        <Link
          href="/admin/routes/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          <Plus size={18} />
          Add New Route
        </Link>
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
              Loading routes...
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {!loading &&
        !error &&
        packages.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
              <Map
                size={26}
                className="text-sky-600"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-800">
              No routes yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Create your first travel package and it
              will appear here.
            </p>

            <Link
              href="/admin/routes/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              <Plus size={17} />
              Create Route
            </Link>
          </div>
        )}

      {/* ==========================================
          ROUTES TABLE
      ========================================== */}

      {!loading &&
        !error &&
        packages.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Table Header */}

            <div className="hidden grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
              <div className="col-span-4">
                Route
              </div>

              <div className="col-span-2">
                Country
              </div>

              <div className="col-span-2">
                Price
              </div>

              <div className="col-span-2">
                Duration
              </div>

              <div className="col-span-2 text-right">
                Actions
              </div>
            </div>

            {/* Routes */}

            <div className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="grid grid-cols-1 gap-5 px-5 py-5 transition hover:bg-slate-50/60 md:grid-cols-12 md:items-center md:px-6"
                >
                  {/* ROUTE */}

                  <div className="flex items-center gap-4 md:col-span-4">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {pkg.coverImage ? (
                        <img
                          src={pkg.coverImage}
                          alt={pkg.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Map
                            size={22}
                            className="text-slate-300"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-800">
                        {pkg.name}
                      </h2>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {pkg.slug}
                      </p>
                    </div>
                  </div>

                  {/* COUNTRY */}

                  <div className="flex items-center gap-2 text-sm text-slate-600 md:col-span-2">
                    <MapPin
                      size={15}
                      className="shrink-0 text-sky-600"
                    />

                    <span>{pkg.country}</span>
                  </div>

                  {/* PRICE */}

                  <div className="text-sm font-semibold text-slate-700 md:col-span-2">
                    ${Number(pkg.price).toLocaleString()}
                  </div>

                  {/* DURATION */}

                  <div className="text-sm text-slate-600 md:col-span-2">
                    {pkg.duration?.length
                      ? pkg.duration[0]
                      : "Flexible"}
                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2 md:col-span-2 md:justify-end">
                    {/* Edit */}

                    <Link
                      href={`/admin/routes/edit?id=${pkg.id}`}
                      title="Edit route"
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <Pencil size={16} />
                    </Link>

                    {/* Delete */}

                    <button
                      type="button"
                      title="Delete route"
                      disabled={
                        deletingId === pkg.id
                      }
                      onClick={() =>
                        openDeleteModal(
                          pkg.id,
                          pkg.name
                        )
                      }
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === pkg.id ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ==========================================
          DELETE CONFIRMATION MODAL
      ========================================== */}

      {deleteModal.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-800">
                Delete Route
              </h2>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="px-6 py-7">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <AlertTriangle
                    size={30}
                    className="text-red-500"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800">
                  Are you sure?
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  You are about to delete
                  <span className="font-semibold text-slate-800">
                    {" "}
                    &quot;{deleteModal.name}&quot;
                  </span>
                  .
                  <br />
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={!!deletingId}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete Route
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}