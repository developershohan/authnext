import React from "react";
import { getSingleEvent } from "@lib/actions/actions";

export default async function EventSinglePage({ params }) {
  const eventID = (await params).slug;
  const event = await getSingleEvent(eventID);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(event.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Hero section ── */}
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Live Event
        </p>

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          {event.artist}
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/70">
          {/* Date */}
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formattedDate}
          </span>

          {/* Time */}
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {formattedTime}
          </span>
        </div>
      </section>

      {/* ── Venue card ── */}
      {event.venue && (
        <section className="mb-10 rounded-xl border border-default-200 p-6">
          <h2 className="mb-3 text-lg font-semibold">Venue</h2>

          <p className="text-xl font-medium">{event.venue.name}</p>

          <p className="mt-1 text-sm text-foreground/60">
            {event.venue.address}
          </p>

          <p className="text-sm text-foreground/60">
            {event.venue.city}, {event.venue.state}, {event.venue.country}
          </p>
        </section>
      )}

      {/* ── Description ── */}
      {event.description && (
        <section className="rounded-xl border border-default-200 p-6">
          <h2 className="mb-3 text-lg font-semibold">About This Event</h2>
          <p className="leading-relaxed text-foreground/80">
            {event.description}
          </p>
        </section>
      )}
    </main>
  );
}