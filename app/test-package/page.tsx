
"use client";

import { FormEvent, useState } from "react";

export default function TestPackagePage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        name: "",
        country: "",
        price: "",
        description: "",
        duration: "",
        coverImage: "",
        slug: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setSuccess(false);

        try {
            const response = await fetch(
                "http://localhost:5000/api/packages",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        country: form.country,
                        price: Number(form.price),
                        description: form.description,
                        duration: form.duration
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        coverImage: form.coverImage,
                        slug: form.slug,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create package"
                );
            }

            setSuccess(true);
            setMessage("Package created successfully!");

            setForm({
                name: "",
                country: "",
                price: "",
                description: "",
                duration: "",
                coverImage: "",
                slug: "",
            });
        } catch (error) {
            console.error(error);

            setSuccess(false);
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--color-background)] px-5 py-16">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <p
                        className="text-2xl text-sky-700"
                        style={{
                            fontFamily: "var(--font-satisfy)",
                        }}
                    >
                        Travelia
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[var(--color-secondary)]">
                        Create Test Package
                    </h1>

                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                        This temporary form will add a package to Firebase.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
                >

                    {/* Package Name */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Package Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Swiss Alpine Escape"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </div>

                    {/* Country + Price */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="Switzerland"
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="2480"
                                required
                                min="1"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                    </div>

                    {/* Description */}
                    <div className="mb-5 mt-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="A quiet luxury experience with mountain villages, scenic train rides, and cozy stays."
                            required
                            rows={4}
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                    </div>

                    {/* Duration */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Duration
                        </label>

                        <input
                            type="text"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            placeholder="1 Week, 5 Days, 10 Days"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />

                        <p className="mt-1.5 text-xs text-slate-400">
                            Separate multiple options with commas.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Cover Image
                        </label>

                        <input
                            type="text"
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            placeholder="/images/switzerland.jpg"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />

                        <p className="mt-1.5 text-xs text-slate-400">
                            Example: /images/switzerland.jpg
                        </p>
                    </div>

                    {/* Slug */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Slug
                        </label>

                        <input
                            type="text"
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            placeholder="swiss-alpine-escape"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />

                        <p className="mt-1.5 text-xs text-slate-400">
                            Use lowercase letters and hyphens.
                        </p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div
                            className={`mb-5 rounded-xl px-4 py-3 text-sm font-medium ${
                                success
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Creating Package..."
                            : "Create Package"}
                    </button>
                </form>

                {/* Test information */}
                <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-center">
                    <p className="text-xs leading-5 text-slate-600">
                        Temporary development page. Packages created here
                        are saved directly through your backend API into
                        Firebase Firestore.
                    </p>
                </div>

            </div>
        </main>
    );
}

