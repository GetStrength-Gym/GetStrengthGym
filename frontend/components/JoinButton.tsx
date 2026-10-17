import { getSite } from "@/lib/content";

// "Join GS Gym": always this label, always the Debitsuccess form in content/site.json, and
// the same tab (docs/design/visual-direction.md §5, GS/Button primary).
export default function JoinButton({ className = "" }: { className?: string }) {
  const { joinUrl } = getSite();
  return (
    <a
      href={joinUrl}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-red px-5 py-2 font-semibold text-white transition-colors duration-150 hover:bg-red-dark ${className}`}
    >
      Join GS Gym
    </a>
  );
}
