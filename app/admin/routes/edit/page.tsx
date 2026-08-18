"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Image as ImageIcon,
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

function EditRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    price: "",
    description: "",
    duration: "",
    coverImage: "",
    slug: "",
  });

  // ======================================================
  // FETCH PACKAGE
  // ======================================================

  useEffect(() => {
    if (!id) {
      setError("No route ID was provided.");
      setLoading(false);
      return;
    }

    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/packages/id/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load route."
          );
        }

        const pkg: TravelPackage = data.package;

        setFormData({
          name: pkg.name || "",
          country: pkg.country || "",
          price:
            pkg.price !== undefined
              ? String(pkg.price)
              : "",
          description: pkg.description || "",
          duration:
            Array.isArray(pkg.duration)
              ? pkg.duration.join(", ")
              : "",
          coverImage: pkg.coverImage || "",
          slug: pkg.slug || "",
        });
      } catch (error) {
        console.error("Fetch route error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load route."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  // ======================================================
  // UPDATE ROUTE
  // ======================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) {
      setError("Route ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const durationArray = formData.duration
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch(
        `http://localhost:5000/api/packages/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            country: formData.country,
            price: Number(formData.price),
            description: formData.description,
            duration: durationArray,
            coverImage: formData.coverImage,
            slug: formData.slug,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update route."
        );
      }

      setSuccess("Route updated successfully!");

      setTimeout(() => {
        router.push("/admin/routes");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Update route error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update route."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-sky-600"
          />

          <p className="text-sm text-slate-500">
            Loading route...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR WITHOUT ID
  // ======================================================

  if (!id) {
    return (
      <main>
        <Link
          href="/admin/routes"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600"
        >
          <ArrowLeft size={16} />
          Back to Routes
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-semibold text-red-700">
            Route ID is missing.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Please return to the routes list and select a route
            to edit.
          </p>
        </div>
      </main>
    );
  }

  // ======================================================
  // EDIT PAGE
  // ======================================================

  return (
    <main>
      {/* HEADER */}

      <div className="mb-8">
        <Link
          href="/admin/routes"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
        >
          <ArrowLeft size={16} />
          Back to Routes
        </Link>

        <p
          className="text-2xl text-sky-700"
          style={{
            fontFamily: "var(--font-satisfy)",
          }}
        >
          Travel Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[var(--color-secondary)]">
          Edit Route
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update the details of your travel package.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Route Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Swiss Alpine Escape"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* COUNTRY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="e.g. Switzerland"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* PRICE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="2480"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* DURATION */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g. 1 Week"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              If you have multiple durations, separate them
              with commas.
            </p>
          </div>

          {/* SLUG */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="swiss-alpine-escape"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              This is used in the package URL.
            </p>
          </div>

          {/* COVER IMAGE */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cover Image URL
            </label>

            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="/images/switzerland.jpg"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* IMAGE PREVIEW */}

          <div className="md:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt={formData.name || "Route preview"}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center">
                  <ImageIcon
                    size={35}
                    className="text-slate-300"
                  />

                  <p className="mt-2 text-sm text-slate-400">
                    No image available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={7}
              placeholder="Describe this travel package..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/admin/routes"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

// ======================================================
// PAGE
// ======================================================

export default function EditRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={32}
              className="animate-spin text-sky-600"
            />

            <p className="text-sm text-slate-500">
              Loading route...
            </p>
          </div>
        </div>
      }
    >
      <EditRouteContent />
    </Suspense>
  );
}