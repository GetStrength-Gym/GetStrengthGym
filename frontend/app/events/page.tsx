import type { Metadata } from "next";
import EventsCalendar from "@/components/EventsCalendar";
import { getEvents, getPhotos, getSite } from "@/lib/content";
import { todayInAuckland } from "@/lib/events";

export const metadata: Metadata = {
  title: { absolute: "Events & Competitions — GetStrength Gym, Penrose" },
  description: "Powerlifting competitions, entry dates and events at GetStrength Gym in Penrose, Auckland.",
};

// Replaces the blog (brief Q14, decided 2026-11-11). Events come from content/events.json;
// preview builds show content/events.sample.json instead (ADR-006).
export default function Events() {
  const { events, sample } = getEvents();
  const instagram = getSite().outboundLinks.find(link => link.service === "Instagram");

  return (
    <main className="events">
      <EventsCalendar events={events} buildDate={todayInAuckland()} photo={getPhotos().eventsHero}
        emptyLink={instagram ? { label: instagram.label, url: instagram.url } : null}>
        <p className="events-kicker">What&apos;s on</p>
        <h1>Events &amp; competitions</h1>
        <p className="body-large">Competitions our lifters are entering, when entries open and close, and what&apos;s on at the gym.</p>
        {sample && <p className="events-sample-note">Sample events — preview only. Real dates are still to come.</p>}
      </EventsCalendar>
    </main>
  );
}
