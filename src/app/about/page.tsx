export default function AboutPage() {
  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl sm:text-5xl font-semibold text-[--color-navy]">Our Story</h1>
      <p className="mt-4 max-w-3xl text-[--color-navy]/80">
        Nestled amidst Pune’s serene greens, Aurum Vista blends contemporary design with timeless Indian hospitality. Crafted for discerning travelers, our spaces inspire stillness, connection, and celebration.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h3 className="font-semibold text-[--color-navy]">Refined Design</h3>
          <p className="mt-2 text-sm text-[--color-navy]/70">Thoughtful details, premium textures, and curated art.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h3 className="font-semibold text-[--color-navy]">Wellness Focused</h3>
          <p className="mt-2 text-sm text-[--color-navy]/70">Spa rituals, mindful menus, and restorative spaces.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h3 className="font-semibold text-[--color-navy]">Signature Service</h3>
          <p className="mt-2 text-sm text-[--color-navy]/70">Personalized attention with intuitive care.</p>
        </div>
      </div>
    </main>
  );
}

