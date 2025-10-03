"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const GoogleMap = dynamic(() => import("google-map-react"), { ssr: false });

export default function ContactPage() {
  const center = useMemo(() => ({ lat: 18.5204, lng: 73.8567 }), []);
  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl sm:text-5xl font-semibold text-[--color-navy]">Contact</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <div className="grid gap-4">
            <input className="w-full rounded-lg border px-4 py-3" placeholder="Full Name" />
            <input className="w-full rounded-lg border px-4 py-3" placeholder="Email" />
            <input className="w-full rounded-lg border px-4 py-3" placeholder="Phone" />
            <textarea className="w-full rounded-lg border px-4 py-3" placeholder="Message" rows={4} />
            <button type="submit" className="btn btn-primary">Send Inquiry</button>
          </div>
        </form>
        <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-black/5">
          <GoogleMap bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }} defaultCenter={center} defaultZoom={12} />
        </div>
      </div>
      <div className="mt-8 text-sm text-[--color-navy]/80">
        <p>Aurum Vista Pune, Near Koregaon Park, Pune, MH</p>
        <p>+91 98XXXXXX00 · reservations@aurumvista.com</p>
      </div>
    </main>
  );
}

