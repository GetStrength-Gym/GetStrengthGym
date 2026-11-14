"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import type { Photo } from "@/lib/content";
import {
  type EventStatus, type EventType, type GymEvent, dateRange, dayOfMonth, daysBetween, eventIcs, eventStatus, longDate,
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

// The event list and month calendar share one selection: picking an event in either
// highlights it in both and shows its details (beside the calendar on desktop, under the
// list item on phones).
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
  const [filter, setFilter] = useState<"all" | EventType>("all");
  const [month, setMonth] = useState<string | null>(null); // null follows today
  const [chosenId, setChosenId] = useState<string | null>(null); // null: the next event
  const [showPast, setShowPast] = useState(false);

  const shown = events.filter(event => filter === "all" || event.type === filter);
  const upcoming = shown.filter(event => event.end >= today);
  const past = shown.filter(event => event.end < today).reverse();
  const next = events.find(event => event.type === "competition" && event.start >= today);
  // From the filtered events, so the details never show an event the filter has hidden.
  const selected = shown.find(event => event.id === chosenId) ?? upcoming[0] ?? null;
  const viewMonth = month ?? today.slice(0, 7);

  const choose = (event: GymEvent) => {
    setChosenId(event.id);
    setMonth(event.start.slice(0, 7));
  };

  const groups: { month: string; events: GymEvent[] }[] = [];
  for (const event of upcoming) {
    const m = event.start.slice(0, 7);
    if (groups.at(-1)?.month !== m) groups.push({ month: m, events: [] });
    groups.at(-1)!.events.push(event);
  }

  const detail = (event: GymEvent, className: string) =>
    <EventDetail event={event} today={today} stamp={buildDate} className={className} />;

  return (
    <>
      <section className="events-hero">
        <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="events-hero-photo" preload />
        <div className="page-width events-hero-inner">
          <div className="events-hero-copy">{children}</div>
          {next && (
            <button type="button" className="next-comp" onClick={() => choose(next)}>
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
        <div className="events-list">
          <div className="events-filter" role="group" aria-label="Show">
            {FILTERS.map(f => (
              <button key={f.value} type="button" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>{f.label}</button>
            ))}
          </div>

          <div className="events-groups">
            {groups.map(group => (
              <section key={group.month} aria-labelledby={`events-${group.month}`}>
                <h2 id={`events-${group.month}`} className="events-label events-group-heading">{monthLabel(group.month)}</h2>
                <ul className="events-items">
                  {group.events.map(event => {
                    const status = eventStatus(event, today);
                    const isSelected = event.id === selected?.id;
                    return (
                      <li key={event.id}>
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
                <button type="button" className="events-past-toggle" aria-expanded={showPast} aria-controls="events-past-list"
                  onClick={() => setShowPast(!showPast)}>
                  Past events ({past.length}) <span aria-hidden="true">{showPast ? "−" : "+"}</span>
                </button>
                {showPast && (
                  <ul id="events-past-list" className="events-past-list">
                    {past.map(event => (
                      <li key={event.id}>
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
        </div>

        <div className="events-side">
          <div className="calendar">
            <div className="calendar-head">
              <h2 aria-live="polite">{monthLabel(viewMonth)}</h2>
              <div className="calendar-nav">
                <button type="button" onClick={() => setMonth(null)}>Today</button>
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
                // A second click on a busy day moves to its next event.
                const pick = () => choose(dayEvents[(dayEvents.findIndex(event => event.id === selected?.id) + 1) % dayEvents.length]);
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
            <ul className="calendar-legend">
              <li><span className="type-mark type-mark-competition" aria-hidden="true" />Competition</li>
              <li><span className="type-mark type-mark-gym" aria-hidden="true" />At the gym</li>
              <li><span className="legend-today" aria-hidden="true" />Today</li>
            </ul>
          </div>
          {selected && detail(selected, "event-detail-side")}
        </div>
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

function EventDetail({ event, today, stamp, className }: { event: GymEvent; today: string; stamp: string; className: string }) {
  const status = eventStatus(event, today);
  return (
    <article className={"event-detail " + className} aria-label={event.title}>
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
        <a href={"data:text/calendar;charset=utf-8," + encodeURIComponent(eventIcs(event, stamp))} download={event.id + ".ics"}
          className="gs-button gs-button-secondary">Add to calendar</a>
        {event.address && <a href={mapsUrl(event)} className="event-directions">Get directions</a>}
      </div>
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
