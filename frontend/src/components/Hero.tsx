import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <div className="mb-6 flex items-center space-x-4">
            <span className="h-[1px] w-12 bg-[#1a1a1a] opacity-30"></span>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8d8d86]">
              Circular Fashion Collective
            </span>
          </div>
          <h1 className="text-6xl md:text-[80px] lg:text-[100px] leading-[0.85] font-serif mb-8 tracking-tighter">
            Your closet,
            <br />
            <span className="italic ml-0 sm:ml-12">recirculated.</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[#4a4a46] font-serif mb-10 italic">
            Give your premium garments a second life. Rent, sell, and lend
            high-quality fashion while we handle the logistics.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <button className="bg-[#1a1a1a] text-white px-10 py-5 text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-[#333] transition-colors">
              Browse Collection
            </button>
            <a
              href="#how-it-works"
              className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity"
            >
              How it works
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 relative flex items-center justify-center"
        >
          <div className="w-full aspect-[3/4] bg-[#e2e1db] rounded-[240px] overflow-hidden border border-black/5 relative shadow-2xl shadow-black/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4d3cd] to-transparent z-10 pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000"
              alt="Stylish person wearing sustainable fashion"
              className="w-full h-full object-cover relative z-0"
            />
            <div className="absolute bottom-10 left-10 right-10 text-center z-20">
              <div className="text-[11px] uppercase tracking-[0.4em] mb-2 text-white/80 drop-shadow-md">
                Special Occasions
              </div>
              <div className="text-2xl text-white font-serif italic drop-shadow-md">
                The Signature Velvet Suit
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 top-1/4 bg-white p-6 rounded-2xl shadow-xl border border-black/5 max-w-[180px] hidden sm:block"
          >
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold mb-1 opacity-50 text-[#1a1a1a]">
              Daily Earnings
            </div>
            <div className="text-2xl font-serif text-[#1a1a1a]">₹142.50</div>
            <div className="mt-4 h-1 w-full bg-[#f0eee6] rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-[#4a5d4e]"></div>
            </div>
            <div className="mt-2 text-xs opacity-40 uppercase tracking-widest text-[#1a1a1a]">
              Lent 14 times this month
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
