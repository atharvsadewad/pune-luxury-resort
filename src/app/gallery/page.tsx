"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryPage() {
  const images = Array.from({ length: 9 }, (_, i) => `/gallery-${i + 1}.jpg`);
  return (
    <main>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/gallery1.jpg" alt="Gallery" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-4xl sm:text-6xl font-semibold text-white">Gallery</h1>
      </section>
      <section className="container-lux py-14">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-black/5"
            >
              <Image src={src} alt="Resort" width={1200} height={900} className="h-full w-full object-cover hover:scale-105 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
