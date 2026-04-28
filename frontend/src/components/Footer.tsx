import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1f2d25] text-[#fcfbf8] pt-16 md:pt-24 overflow-hidden mt-20 relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 relative z-10">

        {/* Top section: Brand + Newsletter + Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-16 xl:gap-24">

          {/* Brand & Newsletter - full width on mobile, 5 cols on lg */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-5">
            <span className="font-serif text-4xl md:text-5xl italic tracking-tight mb-6 md:mb-8 inline-block text-white">
              ReWear
            </span>
            <p className="max-w-sm leading-relaxed text-sm text-[#a8b3ac] mb-8 md:mb-12">
              A circular wardrobe. Lend the pieces hibernating in your closet,
              borrow what you need for a night, and let great clothing live many
              lives.
            </p>

            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white mb-4 md:mb-6">
              Join the Collective
            </div>
            <div className="relative max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-b border-[#a8b3ac]/40 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#a8b3ac] font-serif italic pr-10"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-span-1 lg:col-start-7 lg:col-span-2">
            <h4 className="font-bold mb-5 md:mb-8 text-[11px] uppercase tracking-[0.2em] text-white">
              Shop
            </h4>
            <ul className="space-y-4 text-sm text-[#a8b3ac]">
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Dresses</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Suits</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Traditional</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Outerwear</a></li>
            </ul>
          </div>

          {/* Lend Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold mb-5 md:mb-8 text-[11px] uppercase tracking-[0.2em] text-white">
              Lend
            </h4>
            <ul className="space-y-4 text-sm text-[#a8b3ac]">
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">How it works</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Earnings</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Care promise</a></li>
            </ul>
          </div>

          {/* Socials - full row on mobile by using col-span-2 */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h4 className="font-bold mb-5 md:mb-8 text-[11px] uppercase tracking-[0.2em] text-white">
              Socials
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-0 lg:space-y-4 text-sm text-[#a8b3ac]">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
              <a href="#" className="hover:text-white transition-colors">Twitter X</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pb-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[#a8b3ac] font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <div className="flex items-center gap-2">
            <span> #Made with Sinchu</span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LakYZ5mUXjXVrYnpLFP8WfxQmeGU93Li8Q&s"
              alt="Shinchan"
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8b3ac] text-center sm:text-left">
            &copy; {new Date().getFullYear()} ReWear Studio. All rights reserved.
          </p> */}
        </div>
      </div>
    </footer>
  );
}
