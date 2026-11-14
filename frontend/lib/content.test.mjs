import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const originalDirectory = process.cwd();
const originalMode = process.env.SITE_ENV;
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'gs15-content-'));
const content = path.join(fixture, 'content');
fs.mkdirSync(content);
for (const dir of ['images/gym', 'videos']) {
  fs.mkdirSync(path.join(fixture, 'public', dir), { recursive: true });
  for (const name of fs.readdirSync(path.join(originalDirectory, 'public', dir))) {
    fs.writeFileSync(path.join(fixture, 'public', dir, name), '');
  }
}
for (const name of ['site.json', 'prices.json', 'prices.sample.json', 'photos.json', 'events.json', 'events.sample.json']) {
  fs.copyFileSync(path.join(originalDirectory, 'content', name), path.join(content, name));
}
const read = name => JSON.parse(fs.readFileSync(path.join(content, name), 'utf8'));
const write = (name, value) => fs.writeFileSync(path.join(content, name), JSON.stringify(value));

try {
  process.chdir(fixture);
  const { getPhotos, getPrices, getSite } = await import('./content.ts');
  const { formatPrice } = await import('./format.ts');
  assert.equal(formatPrice({ price: 27.99, period: 'week' }, 'NZD'), '$27.99 / week');
  assert.equal(formatPrice({ price: null, period: null }, 'NZD'), 'Contact us for pricing');
  process.env.SITE_ENV = 'preview';
  const preview = getPrices();
  assert.equal(preview.sample, true);
  assert.deepEqual(preview.plans.map(plan => plan.price), [27.99, 35.99, 54.99, 18.99]);
  assert.equal(preview.dayPass.price, 30);
  assert.equal(getSite().address.locality, 'Penrose, Auckland 1061');
  assert.deepEqual(getSite().nav.map(link => link.label), ['Home', 'About Us', 'Contact']);
  assert.deepEqual(getSite().outboundLinks.map(link => link.service), ['Instagram']);
  assert.equal(getSite().phone, '09 622 2885');
  assert.equal(getSite().email, null);

  const prices = read('prices.json');
  write('prices.json', { ...prices, plans: [{ ...prices.plans[0], details: [42] }] });
  assert.throws(getPrices, /plans\[0\].details/);
  write('prices.json', { ...prices, dayPass: { price: -1, howToBuy: null } });
  assert.throws(getPrices, /dayPass.price/);
  write('prices.json', prices);

  const site = read('site.json');
  write('site.json', { ...site, home: { ...site.home, benefits: [{ title: 'Coaching', description: '' }] } });
  assert.throws(getSite, /home.benefits\[0\].description/);
  write('site.json', { ...site, about: { story: '' } });
  assert.throws(getSite, /about.story/);
  write('site.json', { ...site, home: { ...site.home, benefits: [{ ...site.home.benefits[0], photo: '/images/gym/missing.jpg' }] } });
  assert.throws(getSite, /home.benefits\[0\].photo/);

  assert.equal(getPhotos().aboutGallery.length, 8);
  assert.equal(getPhotos().aboutOffers.length, 3);
  assert.equal(getPhotos().homeMembers.length, 5);
  const photos = read('photos.json');
  write('photos.json', { ...photos, homeHero: { ...photos.homeHero, video: '/videos/Gym-Drone.mp4' } });
  assert.throws(getPhotos, /homeHero.video/);
  write('photos.json', { ...photos, homeTogether: { ...photos.homeTogether, src: photos.homeHero.video } });
  assert.throws(getPhotos, /homeTogether.src/);
  write('photos.json', { ...photos, homeTogether: { ...photos.homeTogether, src: '/images/../content/site.json' } });
  assert.throws(getPhotos, /homeTogether.src/);
  write('photos.json', { ...photos, aboutGallery: [{ ...photos.aboutGallery[0], alt: '' }] });
  assert.throws(getPhotos, /aboutGallery\[0\].alt/);
  write('photos.json', photos);

  const { getEvents } = await import('./content.ts');
  const ev = await import('./events.ts');
  const previewEvents = getEvents();
  assert.equal(previewEvents.sample, true);
  assert(previewEvents.events.every((e, i, all) => i === 0 || all[i - 1].start <= e.start), 'events sorted by start');
  const cup = previewEvents.events.find(e => e.id === 'auckland-cup-2026');
  assert.equal(cup.end, '2026-11-29');
  assert.equal(previewEvents.events.find(e => e.id === 'club-mock-meet').end, '2026-11-21', 'end defaults to start');

  const realEvents = read('events.json');
  const valid = { id: 'meet', title: 'Meet', type: 'competition', start: '2027-03-06', venue: 'GS', organiser: 'GS' };
  write('events.json', { events: [{ ...valid, start: '2027-02-30' }] });
  assert.throws(getEvents, /events\[0\].start/);
  write('events.json', { events: [{ ...valid, end: '2027-03-05' }] });
  assert.throws(getEvents, /events\[0\].end/);
  write('events.json', { events: [{ ...valid, entriesOpen: '2027-02-01' }] });
  assert.throws(getEvents, /both "entriesOpen" and "entriesClose"/);
  write('events.json', { events: [{ ...valid, entriesOpen: '2027-02-01', entriesClose: '2027-03-07' }] });
  assert.throws(getEvents, /entriesClose <= start/);
  write('events.json', { events: [{ ...valid, type: 'gym', entriesOpen: '2027-02-01', entriesClose: '2027-02-08' }] });
  assert.throws(getEvents, /competitions only/);
  write('events.json', { events: [{ ...valid, entryUrl: 'https://example.com/' }] });
  assert.throws(getEvents, /entryUrl/);
  write('events.json', { events: [valid, valid] });
  assert.throws(getEvents, /duplicates "meet"/);
  write('events.json', { events: [{ ...valid, staus: 'open' }] });
  assert.throws(getEvents, /unknown field "staus"/);
  write('events.json', { sample: true, events: [] });
  assert.throws(getEvents, /must not be true/);
  write('events.json', realEvents);

  // Status comes from the dates (Auckland Cup: entries 17 Oct – 7 Nov, comp 28–29 Nov 2026).
  assert.equal(ev.eventStatus(cup, '2026-10-01').label, 'Entries open 17 Oct');
  assert.equal(ev.eventStatus(cup, '2026-10-17').key, 'open');
  assert.equal(ev.eventStatus(cup, '2026-11-07').detail, 'Closes today');
  assert.equal(ev.eventStatus(cup, '2026-11-08').key, 'closed');
  assert.equal(ev.eventStatus(cup, '2026-11-29').key, 'now');
  assert.equal(ev.eventStatus(cup, '2026-11-30').key, 'done');
  assert.equal(ev.dateRange(cup), 'Sat 28 – Sun 29 November 2026');
  assert.equal(ev.todayInAuckland(new Date('2026-11-14T12:30:00Z')), '2026-11-15', 'Auckland is ahead of UTC');
  assert.equal(ev.shiftMonth('2026-12', 1), '2027-01');
  assert.equal(ev.shiftMonth('2027-01', -1), '2026-12');
  const november = ev.monthGrid('2026-11');
  assert.equal(november[0], '2026-10-26', 'weeks start on Monday');
  assert.equal(november.length % 7, 0);
  assert(november.includes('2026-11-30'));
  const ics = ev.eventIcs({ ...cup, title: 'Cup, 2026; day' }, '2026-11-14');
  assert.match(ics, /DTSTART;VALUE=DATE:20261128\r\nDTEND;VALUE=DATE:20261130\r\n/);
  assert.match(ics, /SUMMARY:Cup\\, 2026\\; day\r\n/);

  process.env.SITE_ENV = 'production';
  assert.deepEqual(getEvents(), { sample: false, events: [] });
  assert.throws(getPrices, /prices not confirmed/);
  write('prices.json', { ...prices, confirmedWithClient: '2026-10-28' });
  const production = getPrices();
  assert.equal(production.sample, false);
  assert(production.plans.every(plan => plan.price === null));
  console.log('content: preview isolation, validation, photos and production gate passed');
} finally {
  process.chdir(originalDirectory);
  if (originalMode === undefined) delete process.env.SITE_ENV;
  else process.env.SITE_ENV = originalMode;
  assert.equal(path.dirname(path.resolve(fixture)), path.resolve(os.tmpdir()));
  fs.rmSync(fixture, { recursive: true, force: true });
}
