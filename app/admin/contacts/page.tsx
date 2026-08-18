"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  User,
  Clock,
  Eye,
  X,
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt?: {
    _seconds?: number;
    _nanoseconds?: number;
  };
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/packages/contact"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch contact messages"
          );
        }

        setContacts(data.contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load contact messages."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const formatDate = (createdAt: ContactMessage["createdAt"]) => {
    if (!createdAt?._seconds) return "—";
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (createdAt: ContactMessage["createdAt"]) => {
    if (!createdAt?._seconds) return "—";
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
  };

  const openModal = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <div>

      {/* ==========================================
          PAGE HEADER
      ========================================== */}
      <div className="mb-8">
        <p
          className="text-2xl text-sky-700"
          style={{ fontFamily: "var(--font-satisfy)" }}
        >
          Customer Messages
        </p>
        <div className="mt-1 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <MessageSquare size={22} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
              Contact Messages
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View messages and inquiries submitted through your website.
            </p>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading contact messages...
          </p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <MessageSquare size={28} className="mx-auto text-red-400" />
          <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && contacts.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <MessageSquare size={26} className="text-blue-500" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-slate-800">
            No contact messages yet
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Contact messages submitted by visitors will appear here.
          </p>
        </div>
      )}

      {/* TABLE */}
      {!loading && !error && contacts.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-sky-600"
                      >
                        {contact.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:text-sky-600"
                      >
                        {contact.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {truncateText(contact.message, 50)}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatTime(contact.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openModal(contact)}
                        className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-600 transition hover:bg-sky-100"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL – full message
      ========================================== */}
      {modalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <User size={22} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {selectedContact.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mail size={14} className="text-sky-500" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-sky-600">
                      {selectedContact.email}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} className="text-sky-500" />
                    <a href={`tel:${selectedContact.phone}`} className="hover:text-sky-600">
                      {selectedContact.phone}
                    </a>
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={14} />
                  <span>
                    {formatDate(selectedContact.createdAt)} at {formatTime(selectedContact.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Message
              </p>
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {selectedContact.message}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={closeModal}
                className="rounded-lg bg-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}