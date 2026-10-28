import { isPreviewBuild } from "@/lib/content";

// Missing client content is visible for review, never published in production.
export default function Placeholder({ label, detail, className = "" }: {
  label: string;
  detail?: string;
  className?: string;
}) {
  if (!isPreviewBuild()) return null;
  return (
    <div className={"placeholder " + className}>
      <p>{label}</p>
      {detail && <p className="placeholder-detail">{detail}</p>}
    </div>
  );
}
