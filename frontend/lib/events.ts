// Event dates, statuses and calendar files for the events page.
// Pure functions with no node:fs, so both the build-time loader and the browser use them.
// Dates are plain "YYYY-MM-DD" strings in Auckland time; ISO strings sort and compare as text.

export type EventType = "competition" | "gym";

export type GymEvent = {
  id: string;
  title: string;
  type: EventType;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD, same as start for a one-day event
  time: string | null;
  venue: string;
  address: string | null;
  organiser: string;
  entriesOpen: string | null; // competitions only, both or neither
  entriesClose: string | null;
  entryUrl: string | null;
  note: string | null;
};

export type EventStatus = {
  key: "open" | "soon" | "closed" | "done" | "now" | "upcoming";
  label: string;
  detail: string;
};

const DAY_MS = 86_400_000;
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = MONTHS.map(month => month.slice(0, 3));
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function utc(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function parts(date: string) {
  const d = new Date(utc(date));
  return { day: d.getUTCDate(), month: d.getUTCMonth(), year: d.getUTCFullYear(), dow: d.getUTCDay() };
}

export function daysBetween(from: string, to: string): number {
  return Math.round((utc(to) - utc(from)) / DAY_MS);
}

export function addDays(date: string, days: number): string {
  return new Date(utc(date) + days * DAY_MS).toISOString().slice(0, 10);
}

// Built once: the page reads today's date on every render.
const AUCKLAND = new Intl.DateTimeFormat("en-NZ", { timeZone: "Pacific/Auckland", year: "numeric", month: "2-digit", day: "2-digit" });

/** Today's date in Auckland, whatever time zone the browser or build machine is in. */
export function todayInAuckland(now = new Date()): string {
  // Assembled from parts, because a locale's date order and separators can change between ICU versions.
  const part = Object.fromEntries(AUCKLAND.formatToParts(now).map(({ type, value }) => [type, value]));
  return `${part.year}-${part.month}-${part.day}`;
}

// Formatting is done by hand, not Intl, so the build and the browser print identical text
// and React hydration never sees a difference.
export const weekday = (date: string) => DOW[parts(date).dow];
export const dayOfMonth = (date: string) => parts(date).day;
export const shortMonth = (date: string) => MON[parts(date).month];
export const shortDate = (date: string) => `${parts(date).day} ${MON[parts(date).month]}`;
export const longDate = (date: string) => {
  const p = parts(date);
  return `${DOW[p.dow]} ${p.day} ${MONTHS[p.month]} ${p.year}`;
};
export const monthLabel = (month: string) => `${MONTHS[Number(month.slice(5, 7)) - 1]} ${month.slice(0, 4)}`;

/** "Sat 28 – Sun 29 November 2026", or a single long date for a one-day event. */
export function dateRange(event: Pick<GymEvent, "start" | "end">): string {
  if (event.start === event.end) return longDate(event.start);
  const a = parts(event.start);
  return `${DOW[a.dow]} ${a.day} – ${longDate(event.end)}`;
}

/** What an event card says, worked out from the dates so nobody edits a status by hand. */
export function eventStatus(event: GymEvent, today: string): EventStatus {
  if (event.end < today) return { key: "done", label: "Completed", detail: "" };
  if (event.start <= today) return { key: "now", label: "On now", detail: "" };
  const inDays = daysBetween(today, event.start);
  if (event.entriesOpen && event.entriesClose) {
    if (today < event.entriesOpen) {
      return { key: "soon", label: `Entries open ${shortDate(event.entriesOpen)}`, detail: plural(daysBetween(today, event.entriesOpen), "Opens in") };
    }
    if (today <= event.entriesClose) {
      const left = daysBetween(today, event.entriesClose);
      return { key: "open", label: "Entries open", detail: left === 0 ? "Closes today" : `Closes ${shortDate(event.entriesClose)} · ${plural(left, "")} left` };
    }
    return { key: "closed", label: "Entries closed", detail: plural(inDays, "Competition in") };
  }
  return { key: "upcoming", label: inDays === 1 ? "Tomorrow" : plural(inDays, "In"), detail: event.time ?? "" };
}

function plural(days: number, prefix: string): string {
  return `${prefix} ${days} ${days === 1 ? "day" : "days"}`.trim();
}

/** The Monday-first weeks covering a month ("YYYY-MM"), as dates. */
export function monthGrid(month: string): string[] {
  const first = `${month}-01`;
  const lead = (parts(first).dow + 6) % 7;
  const nextMonth = shiftMonth(month, 1);
  const length = daysBetween(first, `${nextMonth}-01`);
  const cells = Math.ceil((lead + length) / 7) * 7;
  return Array.from({ length: cells }, (_, i) => addDays(first, i - lead));
}

export function shiftMonth(month: string, by: number): string {
  const total = Number(month.slice(0, 4)) * 12 + Number(month.slice(5, 7)) - 1 + by;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`;
}

export function mapsUrl(event: Pick<GymEvent, "venue" | "address">): string {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent([event.venue, event.address].filter(Boolean).join(", "));
}

/** An all-day iCalendar entry; scripts/write-ics.mjs writes one per event for "Add to calendar". */
export function eventIcs(event: GymEvent, stamp: string): string {
  const text = (value: string) => value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  const date = (value: string) => value.replace(/-/g, "");
  const description = [event.time, event.note, event.entryUrl && `Entries: ${event.entryUrl}`].filter(Boolean).join("\n");
  // shortcut: lines are not folded at 75 octets; calendar apps accept long lines. Fold if one rejects them.
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GetStrength Gym//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@getstrength-gym`,
    `DTSTAMP:${date(stamp)}T000000Z`,
    `DTSTART;VALUE=DATE:${date(event.start)}`,
    `DTEND;VALUE=DATE:${date(addDays(event.end, 1))}`, // exclusive end date
    `SUMMARY:${text(event.title)}`,
    `LOCATION:${text([event.venue, event.address].filter(Boolean).join(", "))}`,
    ...(description ? [`DESCRIPTION:${text(description)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
