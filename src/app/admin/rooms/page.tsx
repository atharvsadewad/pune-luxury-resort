"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminRooms() {
  const { data, mutate } = useSWR("/api/admin/rooms", fetcher);
  const [form, setForm] = useState({ name: "", type: "deluxe", pricePerNight: 9000, capacity: 2, description: "" });

  async function createRoom() {
    await fetch("/api/admin/rooms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", type: "deluxe", pricePerNight: 9000, capacity: 2, description: "" });
    mutate();
  }

  return (
    <main className="container-lux py-16">
      <h1 className="text-2xl font-semibold text-[--color-navy]">Rooms</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h2 className="font-semibold">Create Room</h2>
          <div className="mt-4 grid gap-3">
            <input className="rounded-lg border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select className="rounded-lg border px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="villa">Villa</option>
            </select>
            <input type="number" className="rounded-lg border px-3 py-2" placeholder="Price per night" value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: Number(e.target.value) })} />
            <input type="number" className="rounded-lg border px-3 py-2" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
            <textarea className="rounded-lg border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="btn btn-primary" onClick={createRoom}>Save</button>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h2 className="font-semibold">All Rooms</h2>
          <div className="mt-4 grid gap-3">
            {(data || []).map((r: { _id: string; name: string; type: "deluxe" | "suite" | "villa"; pricePerNight: number; capacity: number }) => (
              <div key={r._id} className="rounded-lg border p-3">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-[--color-navy]/70">{r.type} · ₹{r.pricePerNight}/night · {r.capacity} guests</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

