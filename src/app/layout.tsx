import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurum Vista Pune | Luxury Resort",
  description:
    "Experience refined luxury in Pune. Elegant rooms, spa, pool, fine dining, and curated activities.",
  metadataBase: new URL("https://example.com"),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <header className="sticky top-0 z-50 backdrop-blur bg-[--color-white]/70 border-b border-black/5">
          <div className="container-lux flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold text-[--color-navy]">Aurum Vista</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/explore" className="hover:underline">Explore</Link>
              <Link href="/gallery" className="hover:underline">Gallery</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/booking" className="btn btn-primary">Book Now</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-24 border-t border-black/5 py-12">
          <div className="container-lux flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[--color-navy]/80">
            <p>© {new Date().getFullYear()} Aurum Vista Pune. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
