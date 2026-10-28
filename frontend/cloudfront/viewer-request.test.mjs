// Tests the CloudFront viewer-request function (ADR-007).
// Run from frontend/: node cloudfront/viewer-request.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// The file is a bare cloudfront-js-2.0 function with no exports, so load it as-is in a sandbox.
const context = {};
vm.runInNewContext(readFileSync(new URL('./viewer-request.js', import.meta.url), 'utf8'), context);
const { handler } = context;

const run = (uri) => handler({ request: { method: 'GET', uri, querystring: {}, headers: {} } });

const rewrites = {
  '/': '/index.html',
  '/about/': '/about/index.html',
  '/blog/some-post/': '/blog/some-post/index.html',
};
for (const [uri, expected] of Object.entries(rewrites)) {
  assert.equal(run(uri).uri, expected, uri);
}

for (const uri of ['/about', '/blog/some-post']) {
  const res = run(uri);
  assert.equal(res.statusCode, 301, uri);
  assert.equal(res.headers.location.value, uri + '/', uri);
}

const passThrough = [
  '/_next/static/chunks/main-abc123.js',
  '/_next/static/css/app-abc123.css',
  '/images/hero.jpg',
  '/404.html',
];
for (const uri of passThrough) {
  const res = run(uri);
  assert.equal(res.uri, uri, uri);
  assert.equal(res.statusCode, undefined, uri);
}

console.log('viewer-request: all tests passed');
