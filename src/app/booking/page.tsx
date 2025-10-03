"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const BookingSchema = z.object({
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.number({ coerce: true }).min(1).max(6),
  roomType: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
});

type BookingForm = z.infer<typeof BookingSchema>;

export default function BookingPage() {
  const [availability, setAvailability] = useState<null | { available: boolean; price: number }>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<BookingForm>({ resolver: zodResolver(BookingSchema) });

  async function checkAvailability() {
    setLoading(true);
    const params = new URLSearchParams({
      checkIn: watch("checkIn") || "",
      checkOut: watch("checkOut") || "",
      guests: String(watch("guests") || 1),
      roomType: watch("roomType") || "",
    });
    const res = await fetch(`/api/availability?${params.toString()}`);
    const data = await res.json();
    setAvailability(data);
    setLoading(false);
  }

  async function onSubmit(values: BookingForm) {
    setLoading(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const order = await res.json();
    setLoading(false);

    const rzp = new (window as Window & { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: order.id,
      name: "Aurum Vista Pune",
      description: "Room Booking",
      handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
        await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, bookingId: order.bookingId }),
        });
        window.location.href = "/booking/confirmed?bookingId=" + order.bookingId;
      },
      theme: { color: "#c9a227" },
    });
    rzp.open();
  }

  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl sm:text-5xl font-semibold text-[--color-navy]">Book Your Stay</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <input type="date" className="rounded-lg border px-4 py-3" {...register("checkIn")} />
          <input type="date" className="rounded-lg border px-4 py-3" {...register("checkOut")} />
          <input type="number" min={1} max={6} className="rounded-lg border px-4 py-3" placeholder="Guests" {...register("guests", { valueAsNumber: true })} />
          <select className="rounded-lg border px-4 py-3" {...register("roomType")}>
            <option value="">Select Room Type</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="villa">Villa</option>
          </select>
          <input className="rounded-lg border px-4 py-3" placeholder="Full Name" {...register("name")} />
          <input className="rounded-lg border px-4 py-3" placeholder="Email" {...register("email")} />
          <input className="rounded-lg border px-4 py-3" placeholder="Phone" {...register("phone")} />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={checkAvailability} className="btn btn-outline" disabled={loading}>Check Availability</button>
          <button type="submit" className="btn btn-primary" disabled={loading || !availability?.available}>Proceed to Pay</button>
        </div>
        {availability && (
          <p className="text-sm text-[--color-navy]/80">{availability.available ? `Available · ₹${availability.price}/night` : "Not available for selected dates"}</p>
        )}
      </form>
    </main>
  );
}

