"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

export default function CreateRoutePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    price: "",
    description: "",
    duration: "",
    slug: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setCoverImage(file);
    }
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ----------------------------------------
      // Basic validation
      // ----------------------------------------

      if (
        !formData.name ||
        !formData.country ||
        !formData.price ||
        !formData.description ||
        !formData.duration ||
        !formData.slug
      ) {
        throw new Error(
          "Please fill in all required fields."
        );
      }

      // ----------------------------------------
      // Send data to backend
      // ----------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/packages",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            country: formData.country,
            price: Number(formData.price),
            description: formData.description,

            // Firestore currently stores duration as an array
            duration: [formData.duration],

            slug: formData.slug,

            // Image upload will be connected next
            coverImage: "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create route."
        );
      }

      alert("Route created successfully!");

      // ----------------------------------------
      // Go back to routes page
      // ----------------------------------------

      router.push("/admin/routes");

    } catch (error) {
      console.error(
        "Create route error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-8 md:px-8 lg:px-12">

      <div className="mx-auto max-w-5xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/routes")
              }
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              <ArrowLeft size={17} />
              Back to Routes
            </button>

            <h1 className="text-3xl font-bold text-[var(--color-secondary)] md:text-4xl">
              Create New Route
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add a new travel package to your website.
            </p>

          </div>

        </div>


        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* ==========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_15px_50px_rgba(35,41,70,0.08)] md:p-8"
        >

          {/* ========================================
              BASIC INFORMATION
          ======================================== */}

          <div className="mb-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                Route Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the basic information for this travel package.
              </p>

            </div>


            {/* Name + Country */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* Route Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Route Name
                </label>

                <div className="relative">

                  <FileText
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Swiss Alpine Escape"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
                  />

                </div>

              </div>


              {/* Country */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Country
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Switzerland"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
                  />

                </div>

              </div>

            </div>


            {/* Price + Duration */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price
                </label>

                <div className="relative">

                  <DollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2480"
                    min="0"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
                  />

                </div>

              </div>


              {/* Duration */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Duration
                </label>

                <div className="relative">

                  <Clock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="1 week"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
                  />

                </div>

              </div>

            </div>


            {/* Slug */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                URL Slug
              </label>

              <div className="relative">

                <LinkIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="swiss-alpine-escape"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
                />

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Example: swiss-alpine-escape
              </p>

            </div>


            {/* Description */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A quiet beautiful and luxury travel experience..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
              />

            </div>

          </div>


          {/* ==========================================
              COVER IMAGE
          ========================================== */}

          <div className="border-t border-slate-100 pt-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-[var(--color-secondary)]">
                Cover Image
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose the main image for this route.
              </p>

            </div>


            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center transition hover:border-sky-400 hover:bg-sky-50">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100">
                <ImageIcon
                  size={25}
                  className="text-sky-600"
                />
              </div>

              <p className="text-sm font-semibold text-slate-700">
                {coverImage
                  ? coverImage.name
                  : "Choose cover image"}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                JPG, PNG or WEBP
              </p>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </div>


          {/* ==========================================
              BUTTONS
          ========================================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                router.push("/admin/routes")
              }
              disabled={loading}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Save size={18} />

              {loading
                ? "Creating Route..."
                : "Create Route"}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}