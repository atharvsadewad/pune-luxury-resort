export default function BookingPage() {
  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl sm:text-5xl font-semibold text-[--color-navy]">Book Your Stay</h1>
      <div className="mt-8 grid gap-6 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <input type="date" className="rounded-lg border px-4 py-3" placeholder="Check-in" disabled />
          <input type="date" className="rounded-lg border px-4 py-3" placeholder="Check-out" disabled />
          <input type="number" min={1} max={6} className="rounded-lg border px-4 py-3" placeholder="Guests" disabled />
          <select className="rounded-lg border px-4 py-3" disabled>
            <option>Select Room Type</option>
          </select>
          <input className="rounded-lg border px-4 py-3" placeholder="Full Name" disabled />
          <input className="rounded-lg border px-4 py-3" placeholder="Email" disabled />
          <input className="rounded-lg border px-4 py-3" placeholder="Phone" disabled />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="btn btn-outline" disabled>Check Availability</button>
          <button type="button" className="btn btn-primary" disabled>Proceed to Pay</button>
        </div>
        <p className="text-sm text-[--color-navy]/80">Online booking temporarily unavailable.</p>
      </div>
    </main>
  );
}

