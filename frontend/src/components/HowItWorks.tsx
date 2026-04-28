import { motion } from "motion/react";
import { Truck, Sparkles, ShoppingBag, Banknote } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "1. List or Rent",
    desc: "Owners list unused clothes. Renters browse for their perfect special occasion outfit.",
  },
  {
    icon: Truck,
    title: "2. We Pick It Up",
    desc: "Once booked, ReWear picks up the item entirely hassle-free from the owner's doorstep.",
  },
  {
    icon: Sparkles,
    title: "3. Professional Cleaning",
    desc: "We ensure the garment is professionally dry-cleaned before and after every single rental.",
  },
  {
    icon: Banknote,
    title: "4. Earn & Enjoy",
    desc: "Renters get a flawless look. Owners earn steady income while we handle the returns.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white border-y border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-left max-w-2xl mx-auto md:mx-0 mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8d8d86] mb-6 block">
            We do the heavy lifting
          </span>
          <h2 className="font-serif text-4xl md:text-[50px] leading-tight mb-6 text-[#1a1a1a] tracking-tighter">
            White-glove <span className="italic">logistics.</span>
          </h2>
          <p className="text-lg text-[#4a4a46] font-serif italic max-w-xl">
            ReWear manages the entire end-to-end process. You don't have to
            worry about shipping, dry cleaning, or logistics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <step.icon className="w-4 h-4 opacity-40 text-[#1a1a1a]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40 text-[#1a1a1a]">
                  {step.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#4a4a46]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
