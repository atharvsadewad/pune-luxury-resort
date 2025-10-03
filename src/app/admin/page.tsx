import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl font-semibold text-[--color-navy]">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/rooms" className="rounded-2xl bg-white p-6 ring-1 ring-black/5 hover:shadow">Manage Rooms</Link>
      </div>
    </main>
  );
}

