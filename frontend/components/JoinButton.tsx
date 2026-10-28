import { getSite } from "@/lib/content";

export default function JoinButton({ className = "" }: { className?: string }) {
  return <a href={getSite().joinUrl} className={"gs-button gs-button-primary " + className}>Join GS Gym</a>;
}
