import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

// next/font downloads Inter at build time and serves it from our own files, so visitors
// never call Google (docs/design/visual-direction.md §3).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Pages set their own title; the template adds the gym's name (unique title per page).
export const metadata: Metadata = {
  title: {
    template: "%s — GetStrength Gym",
    default: "GetStrength Gym",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NZ" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        {/* The skip link's target. Each page renders its own <main> inside. */}
        <div id="content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
