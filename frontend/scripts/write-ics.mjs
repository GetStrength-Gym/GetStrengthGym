// Writes public/events/<id>.ics for each event in this build, so "Add to calendar" links to a
// real text/calendar file that phones open in their calendar app. npm runs this before
// `dev` and `build` (predev/prebuild); the files are generated, so they are git-ignored.
import fs from "node:fs";
import { getEvents } from "../lib/content.ts";
import { eventIcs, todayInAuckland } from "../lib/events.ts";

const dir = "public/events";
fs.rmSync(dir, { recursive: true, force: true }); // drop files of events that were removed
fs.mkdirSync(dir, { recursive: true });
const stamp = todayInAuckland();
const { events } = getEvents();
for (const event of events) fs.writeFileSync(`${dir}/${event.id}.ics`, eventIcs(event, stamp));
console.log(`write-ics: ${events.length} calendar file(s) in ${dir}/`);
