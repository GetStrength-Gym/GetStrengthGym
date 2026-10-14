import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

// Unstyled on purpose; styling is GS-25.
export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <h2>
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h2>
                <p>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.draft && <strong> Draft (preview only)</strong>}
                </p>
                <p>{post.description}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
