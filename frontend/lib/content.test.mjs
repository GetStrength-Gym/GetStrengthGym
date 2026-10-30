import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const originalDirectory = process.cwd();
const originalMode = process.env.SITE_ENV;
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'gs15-content-'));
const content = path.join(fixture, 'content');
fs.mkdirSync(content);
for (const name of ['site.json', 'prices.json', 'prices.sample.json']) {
  fs.copyFileSync(path.join(originalDirectory, 'content', name), path.join(content, name));
}
const read = name => JSON.parse(fs.readFileSync(path.join(content, name), 'utf8'));
const write = (name, value) => fs.writeFileSync(path.join(content, name), JSON.stringify(value));

try {
  process.chdir(fixture);
  const { getPrices, getSite } = await import('./content.ts');
  const { formatPrice } = await import('./format.ts');
  assert.equal(formatPrice({ price: 27.99, period: 'week' }, 'NZD'), '$27.99 / week');
  assert.equal(formatPrice({ price: null, period: null }, 'NZD'), 'Contact us for pricing');
  process.env.SITE_ENV = 'preview';
  const preview = getPrices();
  assert.equal(preview.sample, true);
  assert.deepEqual(preview.plans.map(plan => plan.price), [27.99, 35.99, 54.99, 18.99]);
  assert.equal(preview.dayPass.price, null);
  assert.equal(getSite().address.locality, 'Penrose, Auckland 1061');
  assert.deepEqual(getSite().nav.map(link => link.label), ['Home', 'About Us', 'Blog', 'Contact']);
  assert.deepEqual(getSite().outboundLinks.map(link => link.service), ['Instagram']);
  assert.equal(getSite().phone, null);
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

  process.env.SITE_ENV = 'production';
  assert.throws(getPrices, /prices not confirmed/);
  write('prices.json', { ...prices, confirmedWithClient: '2026-10-28' });
  const production = getPrices();
  assert.equal(production.sample, false);
  assert(production.plans.every(plan => plan.price === null));
  console.log('content: preview isolation, validation and production gate passed');
} finally {
  process.chdir(originalDirectory);
  if (originalMode === undefined) delete process.env.SITE_ENV;
  else process.env.SITE_ENV = originalMode;
  assert.equal(path.dirname(path.resolve(fixture)), path.resolve(os.tmpdir()));
  fs.rmSync(fixture, { recursive: true, force: true });
}
