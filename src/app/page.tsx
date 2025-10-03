import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative">
      <section className="relative min-h-[88vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container-lux flex min-h-[88vh] items-center">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-semibold tracking-tight"
            >
              Aurum Vista Pune
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-4 text-lg sm:text-xl text-white/90"
            >
              Where timeless elegance meets modern indulgence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex gap-4"
            >
              <Link href="/booking" className="btn btn-primary">Book Your Stay</Link>
              <Link href="/explore" className="btn btn-outline">Explore</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-lux py-20 grid gap-10 sm:grid-cols-3">
        {["Rooms", "Spa", "Dining"].map((title) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6"
          >
            <Image src="/placeholder.jpg" alt={title} width={600} height={400} className="h-40 w-full rounded-xl object-cover" />
            <h3 className="mt-4 text-lg font-semibold text-[--color-navy]">{title}</h3>
            <p className="mt-2 text-sm text-[--color-navy]/70">Indulgent experiences crafted for discerning tastes.</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
