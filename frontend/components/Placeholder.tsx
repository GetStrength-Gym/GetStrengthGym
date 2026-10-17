import { isPreviewBuild } from "@/lib/content";

// A marked gap where content is still owed by the client (GS/Photo placeholder in the
// design). Preview builds show it, so the client sees what's missing. Production builds
// render nothing, so a placeholder can never reach the live site.
export default function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  if (!isPreviewBuild()) return null;
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-current p-4 text-center text-sm font-semibold uppercase tracking-wide opacity-80 ${className}`}
    >
      Placeholder · {label}
    </div>
  );
}
