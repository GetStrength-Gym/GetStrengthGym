---
title: "Sample post: how blog posts work"
date: "2026-10-10"
description: "A sample post showing how blog posts are added to this site. Not real content."
draft: true
# To add an image, remove the "#" from both lines below. imageAlt is required with image.
# image: "/images/blog/photo.jpg"
# imageAlt: "Describe what the photo shows, for people who can't see it"
---

**This is a sample post, not a real GetStrength article.** It exists to show how blog
posts work, and it only appears on the preview site because it is marked `draft: true`.

## How a post is made

Each post is one Markdown file in `frontend/content/blog/`. The file name becomes the web
address, so this file, `example-post.md`, is shown at `/blog/example-post/`.

## What the maintenance team edits

- The block at the top of the file (title, date, description, and optionally an image with
  its description, `imageAlt`, and `draft`).
- The text below it, written in ordinary Markdown.

Headings in the body start at `##`, because the post title is the page's only top-level
heading.

See `docs/maintenance/content-changes.md` for the full steps.
