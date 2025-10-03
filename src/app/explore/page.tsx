"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ExplorePage() {
  const sections = [
    { title: "Rooms & Suites", img: "/service1.jpg", desc: "Opulent spaces with city or garden views." },
    { title: "Spa & Wellness", img: "/service2.jpg", desc: "Holistic therapies and hydro experiences." },
    { title: "Infinity Pool", img: "/service3.jpg", desc: "Sun-kissed deck and twilight ambience." },
    { title: "Fine Dining", img: "/service4.jpg", desc: "Global flavors curated by master chefs." },
    { title: "Curated Activities", img: "/service5.jpg", desc: "Culture walks, mixology, and beyond." },
  ];

  return (
    <main className="container-lux py-16">
      <h1 className="text-3xl sm:text-5xl font-semibold text-[--color-navy]">Explore</h1>
      <p className="mt-3 text-[--color-navy]/70">Discover refined comforts and signature experiences.</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="group rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm"
          >
            <div className="relative h-56">
              <Image src={s.img} alt={s.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[--color-navy] group-hover:underline">{s.title}</h3>
              <p className="mt-2 text-sm text-[--color-navy]/70">{s.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

