import type { Metadata } from "next";
import { getAllPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

// Every post is generated at build time. Any other slug is not emitted at all, so on
// CloudFront it falls through to /404.html via the 403 mapping (ADR-007).
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return { title: post.title, description: post.description };
}

// Unstyled on purpose; styling is GS-25.
export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft && <strong> Draft (preview only)</strong>}
        </p>
        {post.image && (
          // Plain <img>: there is no image optimizer in a static export (ADR-005), so
          // photos are resized by hand before they are added.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt="" />
        )}
        {/* HTML comes from our own Markdown, sanitised by remark-html in lib/content.ts. */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
