"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { Photo } from "@/lib/content";
import {
  type EventStatus, type EventType, type GymEvent, dateRange, dayOfMonth, daysBetween, eventStatus, longDate,
  mapsUrl, monthGrid, monthLabel, shiftMonth, shortDate, shortMonth, todayInAuckland, weekday,
} from "@/lib/events";

const FILTERS: { value: "all" | EventType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "competition", label: "Competitions" },
  { value: "gym", label: "At the gym" },
];
const TYPE_LABEL: Record<EventType, string> = { competition: "Competition", gym: "At the gym" };
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const noSubscribe = () => () => {};
// The chosen event lives in the address (/events/#auckland-cup-2026), so a shared link opens
// straight to it and Back/Forward work.
const onHash = (notify: () => void) => {
  addEventListener("hashchange", notify);
  return () => removeEventListener("hashchange", notify);
};
// A truncated or mangled link (a bad %-escape) selects nothing rather than crashing the page.
const readHash = () => {
  try { return decodeURIComponent(location.hash.slice(1)); } catch { return ""; }
};

// The event list and month calendar share one selection: picking an event in either
// highlights it in both and shows its details (beside the calendar on desktop, under the
// list item on phones). Phones show the list first; the month sits behind a "Show month
// calendar" control. The markup runs filter → calendar → list → details, the phone reading
// order; desktop places the four with grid areas (globals.css).
export default function EventsCalendar({ events, buildDate, photo, emptyLink, children }: {
  events: GymEvent[];
  buildDate: string; // YYYY-MM-DD the site was built, in Auckland
  photo: Photo;
  emptyLink: { label: string; url: string } | null;
  children: ReactNode; // the hero's heading and intro
}) {
  // The static HTML uses the build date; the browser then swaps in today's Auckland date,
  // so statuses stay right between deploys.
  const today = useSyncExternalStore(noSubscribe, () => todayInAuckland(), () => buildDate);
  const chosenId = useSyncExternalStore(onHash, readHash, () => ""); // "": the next event
  const [filter, setFilter] = useState<"all" | EventType>("all");
  const [month, setMonth] = useState<string | null>(null); // null follows the chosen event, else today
  const [showPast, setShowPast] = useState<boolean | null>(null); // null: open only for a linked past event
  const [showCalendar, setShowCalendar] = useState(false); // phones only; desktop always shows it
  const [dayDate, setDayDate] = useState<string | null>(null); // the calendar date last picked

  const shown = events.filter(event => filter === "all" || event.type === filter);
  const upcoming = shown.filter(event => event.end >= today);
  const past = shown.filter(event => event.end < today).reverse();
  const next = events.find(event => event.type === "competition" && event.start >= today);
  // From the filtered events, so the details never show an event the filter has hidden.
  const selected = shown.find(event => event.id === chosenId) ?? upcoming[0] ?? null;
  const linked = events.find(event => event.id === chosenId);
  const viewMonth = month ?? linked?.start.slice(0, 7) ?? today.slice(0, 7);
  const pastShown = showPast ?? (linked ? linked.end < today : false);
  // The picked day's list belongs to its month; it hides when the calendar moves to another month.
  const onDayDate = dayDate?.startsWith(viewMonth) ? shown.filter(event => event.start <= dayDate && dayDate <= event.end) : [];

  // A linked past event is only rendered after hydration, too late for the browser's own jump
  // to #id, so scroll to it once. Upcoming events are in the static HTML and need no help.
  const linkHandled = useRef(false);
  useEffect(() => {
    if (linkHandled.current || !linked) return;
    linkHandled.current = true;
    if (linked.end < today) document.getElementById(linked.id)?.scrollIntoView({ block: "start" });
  }, [linked, today]);

  const choose = (event: GymEvent) => {
    linkHandled.current = true; // the visitor is choosing now; never jump for them
    if (filter !== "all" && event.type !== filter) setFilter("all"); // the hero card can pick an event the filter hides
    if (event.end < today) setShowPast(true); // on phones a past event's details sit inside the past list
    setMonth(event.start.slice(0, 7));
    history.replaceState(null, "", "#" + event.id); // no new history entry per click
    dispatchEvent(new HashChangeEvent("hashchange"));
  };

  // For choices made away from the details (the hero card, the calendar's day list): render the
  // choice now, then jump to and focus the visible details panel. An instant jump, because a
  // smooth scroll started from a click was cancelled unpredictably in testing.
  const chooseAndShow = (event: GymEvent) => {
    flushSync(() => choose(event));
    const panel = [...document.querySelectorAll<HTMLElement>(".event-detail")].find(el => el.offsetParent !== null);
    panel?.focus({ preventScroll: true });
    panel?.scrollIntoView({ block: "start" });
  };

  const groups: { month: string; events: GymEvent[] }[] = [];
  for (const event of upcoming) {
    const m = event.start.slice(0, 7);
    if (groups.at(-1)?.month !== m) groups.push({ month: m, events: [] });
    groups.at(-1)!.events.push(event);
  }

  const detail = (event: GymEvent, className: string) =>
    <EventDetail key={event.id} event={event} today={today} className={className} />;

  return (
    <>
      <section className="page-hero">
        <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="page-hero-photo" preload />
        <div className="page-width page-hero-inner">
          <div className="page-hero-copy">{children}</div>
          {next && (
            <button type="button" className="next-comp" onClick={() => chooseAndShow(next)}>
              <span className="next-comp-head">
                <span className="events-label">Next competition</span>
                <StatusBadge status={eventStatus(next, today)} />
              </span>
              <span className="next-comp-count">
                {next.start === today ? <span className="next-comp-days">Today</span> : (
                  <><span className="next-comp-days">{daysBetween(today, next.start)}</span> {daysBetween(today, next.start) === 1 ? "day" : "days"} to go</>
                )}
              </span>
              <span className="next-comp-title">{next.title}</span>
              <span className="next-comp-meta">{dateRange(next)} · {next.venue}</span>
            </button>
          )}
        </div>
      </section>

      <section className="page-width events-body" aria-label="Event list and calendar">
        <div className="events-filter" role="group" aria-label="Show">
          {FILTERS.map(f => (
            <button key={f.value} type="button" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>{f.label}</button>
          ))}
        </div>

        <div className="events-month">
          <button type="button" className="calendar-toggle" aria-expanded={showCalendar} aria-controls="events-calendar"
            onClick={() => setShowCalendar(!showCalendar)}>
            {showCalendar ? "Hide" : "Show"} month calendar <span aria-hidden="true">{showCalendar ? "−" : "+"}</span>
          </button>
          <div id="events-calendar" className={"calendar" + (showCalendar ? " is-open" : "")}>
            <div className="calendar-head">
              <h2 aria-live="polite">{monthLabel(viewMonth)}</h2>
              <div className="calendar-nav">
                <button type="button" onClick={() => setMonth(today.slice(0, 7))}>Today</button>
                <button type="button" aria-label="Previous month" onClick={() => setMonth(shiftMonth(viewMonth, -1))}><Chevron d="M15 18l-6-6 6-6" /></button>
                <button type="button" aria-label="Next month" onClick={() => setMonth(shiftMonth(viewMonth, 1))}><Chevron d="M9 18l6-6-6-6" /></button>
              </div>
            </div>
            <div className="calendar-grid">
              {WEEKDAYS.map(day => <span key={day} className="calendar-weekday" aria-hidden="true">{day}</span>)}
              {monthGrid(viewMonth).map(date => {
                const dayEvents = shown.filter(event => event.start <= date && date <= event.end);
                const className = "calendar-day"
                  + (date.slice(0, 7) !== viewMonth ? " is-outside" : "")
                  + (date === today ? " is-today" : "")
                  + (dayEvents.some(event => event.id === selected?.id) ? " is-selected" : "");
                const number = <span className="calendar-num">{dayOfMonth(date)}</span>;
                // Empty days are hidden from screen readers; they hear only days with events, by full date.
                if (dayEvents.length === 0) return <div key={date} className={className} aria-hidden="true">{number}</div>;
                // Picking a day lists its events under the grid, with full titles and a button each.
                const pick = () => {
                  setDayDate(date);
                  if (!dayEvents.some(event => event.id === selected?.id)) choose(dayEvents[0]);
                };
                return (
                  <button key={date} type="button" className={className} onClick={pick}
                    aria-label={`${longDate(date)}: ${dayEvents.map(event => dayLabel(event, date) + event.title).join(", ")}`}>
                    {number}
                    <span className="calendar-chips">
                      {dayEvents.map(event => (
                        <span key={event.id} className={`calendar-chip calendar-chip-${event.type}${event.id === selected?.id ? " is-selected" : ""}`}>
                          {dayLabel(event, date)}{event.title}
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
            {dayDate && onDayDate.length > 0 && (
              <div className="calendar-day-events">
                <h3>Events on {longDate(dayDate)}</h3>
                <ul>
                  {onDayDate.map(event => (
                    <li key={event.id}>
                      <button type="button" aria-current={event.id === selected?.id || undefined} onClick={() => chooseAndShow(event)}>
                        <span className={`type-mark type-mark-${event.type}`} aria-hidden="true" />
                        {dayLabel(event, dayDate)}{event.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="calendar-legend">
              <li><span className="type-mark type-mark-competition" aria-hidden="true" />Competition</li>
              <li><span className="type-mark type-mark-gym" aria-hidden="true" />At the gym</li>
              <li><span className="legend-today" aria-hidden="true" />Today</li>
            </ul>
          </div>
        </div>

        <div className="events-groups">
          <p className="events-count" role="status">{upcoming.length} upcoming {upcoming.length === 1 ? "event" : "events"}</p>
          {groups.map(group => (
            <section key={group.month} aria-labelledby={`events-${group.month}`}>
              <h2 id={`events-${group.month}`} className="events-label events-group-heading">{monthLabel(group.month)}</h2>
              <ul className="events-items">
                {group.events.map(event => {
                  const status = eventStatus(event, today);
                  const isSelected = event.id === selected?.id;
                  return (
                    // The id lets the browser scroll a shared link (/events/#id) to its event.
                    <li key={event.id} id={event.id}>
                      <button type="button" className="event-item" aria-current={isSelected || undefined} onClick={() => choose(event)}>
                        <span className={`event-date event-date-${event.type}`}>
                          <span>{weekday(event.start)}</span>
                          <span className={"event-date-day" + (event.end !== event.start ? " is-range" : "")}>{dayOfMonth(event.start)}{event.end !== event.start && `–${dayOfMonth(event.end)}`}</span>
                          <span>{shortMonth(event.start)}{event.end.slice(0, 7) !== event.start.slice(0, 7) && `–${shortMonth(event.end)}`}</span>
                        </span>
                        <span className="event-summary">
                          <TypeLabel type={event.type} />
                          <span className="event-title">{event.title}</span>
                          <span className="event-meta">{event.venue}</span>
                          <span className="event-status">
                            <StatusBadge status={status} />
                            {status.detail && <span className="event-meta">{status.detail}</span>}
                          </span>
                        </span>
                      </button>
                      {isSelected && detail(event, "event-detail-inline")}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          {groups.length === 0 && (
            <p className="events-empty">
              {filter === "all" ? "Nothing on the calendar yet." : "Nothing of this kind coming up."}
              {emptyLink && <> Follow us on <a href={emptyLink.url}>{emptyLink.label}</a> for new dates.</>}
            </p>
          )}

          {past.length > 0 && (
            <div className="events-past">
              <button type="button" className="events-past-toggle" aria-expanded={pastShown} aria-controls="events-past-list"
                onClick={() => setShowPast(!pastShown)}>
                Past events ({past.length}) <span aria-hidden="true">{pastShown ? "−" : "+"}</span>
              </button>
              {pastShown && (
                <ul id="events-past-list" className="events-past-list">
                  {past.map(event => (
                    <li key={event.id} id={event.id}>
                      <button type="button" aria-current={event.id === selected?.id || undefined} onClick={() => choose(event)}>
                        <span className="event-title">{event.title}</span>
                        <span className="event-meta">{shortDate(event.start)} {event.start.slice(0, 4)}</span>
                      </button>
                      {event.id === selected?.id && detail(event, "event-detail-inline")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {selected && detail(selected, "event-detail-side")}
      </section>
    </>
  );
}

// Later days of a multi-day event read "Day 2 · Title", "Day 3 · Title"; the first day shows the title alone.
function dayLabel(event: GymEvent, date: string): string {
  return date === event.start ? "" : `Day ${daysBetween(event.start, date) + 1} · `;
}

function TypeLabel({ type }: { type: EventType }) {
  return <span className="event-type"><span className={`type-mark type-mark-${type}`} aria-hidden="true" />{TYPE_LABEL[type]}</span>;
}

function StatusBadge({ status }: { status: EventStatus }) {
  return <span className={`status-badge status-${status.key}`}>{status.label}</span>;
}

function Chevron({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

function EventDetail({ event, today, className }: { event: GymEvent; today: string; className: string }) {
  const status = eventStatus(event, today);
  const [link, setLink] = useState<{ copied: boolean; url: string } | null>(null);
  const copyLink = () => {
    const url = location.origin + location.pathname + "#" + event.id;
    // Without clipboard access (http, old browsers) the link is shown to copy by hand.
    (navigator.clipboard?.writeText(url) ?? Promise.reject()).then(
      () => setLink({ copied: true, url }),
      () => setLink({ copied: false, url }),
    );
  };
  return (
    <article className={"event-detail " + className} aria-label={event.title} tabIndex={-1}>
      <div className="event-detail-tags">
        <TypeLabel type={event.type} />
        <StatusBadge status={status} />
      </div>
      <h3 className="event-detail-title">{event.title}</h3>
      <dl className="event-facts">
        <div><dt className="events-label">When</dt><dd>{dateRange(event)}</dd>{event.time && <dd>{event.time}</dd>}</div>
        <div><dt className="events-label">Where</dt><dd>{event.venue}</dd>{event.address && <dd>{event.address}</dd>}</div>
        <div><dt className="events-label">Run by</dt><dd>{event.organiser}</dd></div>
      </dl>
      {event.note && <p className="event-note">{event.note}</p>}
      {event.entriesOpen && event.entriesClose && (
        <EntryWindow open={event.entriesOpen} close={event.entriesClose} start={event.start} today={today} />
      )}
      <div className="event-actions">
        {status.key === "open" && event.entryUrl && (
          <a href={event.entryUrl} className="gs-button gs-button-primary">Enter on the organiser&apos;s site</a>
        )}
        {/* A plain link to the text/calendar file written by scripts/write-ics.mjs: phones open it
            in their calendar app; no `download` attribute, which would file it away instead. */}
        <a href={`/events/${event.id}.ics`} className="gs-button gs-button-secondary">Add to calendar</a>
        <button type="button" className="gs-button gs-button-secondary" onClick={copyLink}>Copy event link</button>
        {event.address && <a href={mapsUrl(event)} className="event-directions">Get directions</a>}
      </div>
      <p className="event-link-status" role="status">{link && (link.copied ? "Link copied." : link.url)}</p>
    </article>
  );
}

// Opens → closes → competition day, with today marked while it falls inside that span.
function EntryWindow({ open, close, start, today }: { open: string; close: string; start: string; today: string }) {
  const span = Math.max(1, daysBetween(open, start));
  const at = (date: string) => `${Math.min(100, Math.max(0, (daysBetween(open, date) / span) * 100))}%`;
  return (
    <div className="entry-window">
      <p className="entry-window-title">Entry window</p>
      <div className="entry-track" aria-hidden="true">
        <span className="entry-fill" style={{ width: at(today < close ? today : close) }} />
        <span className="entry-close-mark" style={{ left: at(close) }} />
        {today >= open && today <= start && <span className="entry-today" style={{ left: at(today) }}>Today</span>}
      </div>
      <dl className="entry-dates">
        <div><dt>Opens</dt><dd>{longDate(open)}</dd></div>
        <div><dt>Closes</dt><dd>{longDate(close)}</dd></div>
        <div><dt>Competition</dt><dd>{longDate(start)}</dd></div>
      </dl>
    </div>
  );
}
