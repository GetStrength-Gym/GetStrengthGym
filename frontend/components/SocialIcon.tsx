import type { ReactNode } from "react";

// Logos for outbound links, keyed by `service` in site.json. A service without one shows its name instead.
const ICONS: Record<string, ReactNode> = {
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" /></>,
};

export default function SocialIcon({ service, size = 24 }: { service: string; size?: number }) {
  const icon = ICONS[service];
  if (!icon) return <>{service}</>;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
  );
}
