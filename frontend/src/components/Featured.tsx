import { motion } from "motion/react";

const items = [
  {
    id: 1,
    name: "Emerald Silk Gown",
    brand: "Reformation",
    rentalPrice: 45,
    retailPrice: 350,
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Classic Navy Tuxedo",
    brand: "Hugo Boss",
    rentalPrice: 80,
    retailPrice: 890,
    image:
      "https://images.unsplash.com/photo-1594938298598-708a31fc2fa1?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Vintage Pearl Handbag",
    brand: "Chanel",
    rentalPrice: 120,
    retailPrice: 4500,
    image:
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Floral Summer Midi",
    brand: "Zimmermann",
    rentalPrice: 65,
    retailPrice: 580,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Featured() {
  return (
    <section
      id="collection"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-5xl mb-4 text-[#1a1a1a] tracking-tighter">
            Trending <span className="italic">this week</span>
          </h2>
          <p className="text-[#4a4a46] font-serif italic text-lg">
            Discover what others are renting for their special moments.
          </p>
        </div>
        <a
          href="#"
          className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity"
        >
          View all clothing
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group cursor-pointer flex flex-col"
          >
            <div className="aspect-[3/4] rounded-[100px] overflow-hidden bg-[#e2e1db] mb-6 relative border border-black/5 shadow-xl shadow-black/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-sm">
                ₹{item.rentalPrice} / day
              </div>
            </div>
            <div className="px-4 text-center">
              <p className="text-xs text-[#1a1a1a] opacity-50 uppercase tracking-[0.3em] font-bold mb-2">
                {item.brand}
              </p>
              <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-[#4a4a46] italic">
                Retail: ₹{item.retailPrice}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 sm:hidden flex justify-center">
        <a
          href="#"
          className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity"
        >
          View all clothing
        </a>
      </div>
    </section>
  );
}
