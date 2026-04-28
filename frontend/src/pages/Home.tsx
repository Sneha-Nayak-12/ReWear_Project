import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Truck,
  RefreshCw,
  Infinity as InfinityIcon,
  Heart,
} from "lucide-react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

interface Listing {
  id: number;
  title: string;
  brand: string;
  rentalPrice: number;
  buyPrice: number;
  image: string;
}

export default function Home() {
  const [curated, setCurated] = useState<Listing[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    axios
      .get("/api/listings")
      .then((res) => setCurated(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="border-b thin-border">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 md:h-[calc(100vh-72px)] border-b thin-border overflow-hidden">
          {/* Left Image Area */}
          <div className="relative overflow-hidden bg-[#e6e4dc] h-[55vw] min-h-[260px] md:h-full">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
              alt="Editorial fashion"
              className="w-full h-full object-cover grayscale-[30%] contrast-125 md:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12 xl:bottom-16 xl:left-16 text-white">
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold mb-1 md:mb-3">
                Issue 01 / Spring
              </div>
              <div className="text-base md:text-xl xl:text-2xl font-serif italic">
                A wardrobe that travels.
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col justify-center px-6 py-10 md:p-12 lg:p-16 xl:px-24 xl:py-16 bg-[#fcfbf8]">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#7a7a7a] mb-4 md:mb-6 font-semibold">
              ReWear · Est. 2026
            </div>
            <h1 className="text-[36px] sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[68px] leading-[1.05] font-serif tracking-tight mb-5 md:mb-8">
              The clothes you
              <br />
              don't wear,
              <br />
              deserve a{" "}
              <span className="italic text-[#2a3d32]">
                second
                <br />
                life.
              </span>
            </h1>
            <p className="max-w-md text-sm xl:text-base leading-relaxed text-[#7a7a7a] mb-8 md:mb-10">
              Borrow showstoppers for a single night. Buy beloved pieces
              second-hand. Or lend the gowns hibernating in your closet — and
              earn while ReWear handles pickup, cleaning and delivery
              end-to-end.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="bg-[#2a3d32] text-white px-6 sm:px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#1f2d25] transition-colors rounded-[2px]"
              >
                Browse the closet{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/list"
                className="border thin-border px-6 sm:px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center hover:bg-black/5 transition-colors rounded-[2px] text-[#2c2c2c]"
              >
                Lend a piece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b thin-border py-4 bg-[#fcfbf8] overflow-hidden flex whitespace-nowrap">
        <div className="animate-[marquee_60s_linear_infinite] flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-sm uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Special-occasion ready wear
              </span>
              <span className="text-[#cebc9a]">♦</span>
              <span className="text-sm uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Pickup & delivery, white-glove
              </span>
              <span className="text-[#cebc9a]">♦</span>
              <span className="text-sm uppercase tracking-[0.2em] text-[#7a7a7a] mx-8">
                Owners earn 80% of every booking
              </span>
              <span className="text-[#cebc9a]">♦</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Choreography Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16 text-[#2c2c2c]">
          <div className="lg:w-3/5">
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 text-[#7a7a7a]">
              The Choreography
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-[1.1] font-serif tracking-tight">
              We pick up, dry-clean and
              <br />
              deliver. <span className="italic">All you do is wear it.</span>
            </h2>
          </div>
          <div className="lg:w-2/5">
            <p className="text-[#7a7a7a] text-sm leading-relaxed mt-2 lg:mt-8">
              From the moment a piece is listed to the moment it returns home,
              ReWear orchestrates every hand-off. Owners earn passive income,
              customers get magazine-worthy fits, and good clothing stays out of
              landfill.
            </p>
          </div>
        </div>

        {/* Alternating Steps Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
          {/* Step 01 Text */}
          <div className="border thin-border p-8 lg:p-12 flex flex-col justify-center min-h-[280px] lg:min-h-[320px]">
            <Sparkles className="w-5 h-5 mb-8 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
              Step 01
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif mb-3">List your piece</h3>
            <p className="text-xs lg:text-sm text-[#7a7a7a] max-w-sm">
              Snap three photos. Set a daily rate or sale price. We do the rest.
            </p>
          </div>
          {/* Step 01 Image */}
          <div className="min-h-[280px] lg:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2670&auto=format&fit=crop"
              alt="Rack of clothes"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Step 02 Image */}
          <div className="min-h-[280px] lg:min-h-[320px] order-last md:order-none">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2670&auto=format&fit=crop"
              alt="High fashion dress"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Step 02 Text */}
          <div className="border thin-border p-8 lg:p-12 flex flex-col justify-center min-h-[280px] lg:min-h-[320px]">
            <Truck className="w-5 h-5 mb-8 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
              Step 02
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif mb-3">We collect & care</h3>
            <p className="text-xs lg:text-sm text-[#7a7a7a] max-w-sm">
              Our courier collects the garment, our atelier presses and
              dry-cleans it, then delivers fresh to the customer's door.
            </p>
          </div>
        </div>

        {/* Step 03 Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border thin-border">
          <div className="md:col-span-1 p-6 lg:p-8 border-b md:border-b-0 md:border-r thin-border">
            <RefreshCw className="w-5 h-5 mb-6 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2">
              Step 03
            </div>
            <h3 className="text-lg lg:text-xl font-serif">It comes home, like new</h3>
          </div>
          <div className="p-6 lg:p-8 border-b md:border-b-0 md:border-r thin-border flex flex-col justify-center">
            <div className="text-3xl lg:text-4xl font-serif font-light mb-1">80%</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              To the owner
            </div>
          </div>
          <div className="p-6 lg:p-8 border-b md:border-b-0 md:border-r thin-border flex flex-col justify-center">
            <div className="text-3xl lg:text-4xl font-serif font-light mb-1">
              48<span className="text-xl lg:text-2xl">h</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              Door to door
            </div>
          </div>
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <InfinityIcon className="w-6 h-6 mb-2 stroke-1 text-[#2c2c2c]" />
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
              Lives per garment
            </div>
          </div>
        </div>
      </section>

      {/* Curated Section */}
      <section className="border-t thin-border py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-[#7a7a7a]">
                Curated this week
              </div>
              <h2 className="text-4xl md:text-[50px] font-serif tracking-tight text-[#2c2c2c]">
                In rotation now
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 hover:opacity-50 transition-opacity pb-2"
            >
              See the full closet <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {curated.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="group block"
              >
                <div className="aspect-[3/4] bg-[#e6e4dc] mb-4 overflow-hidden relative">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={item.title}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-all text-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(item.id)
                          ? "fill-[#2a3d32] text-[#2a3d32]"
                          : "text-[#7a7a7a] hover:text-[#2a3d32]"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">
                      {item.brand}
                    </div>
                    <div className="text-sm font-serif text-[#2c2c2c]">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="font-semibold text-[#2c2c2c]">
                        ₹{item.rentalPrice}
                      </span>
                      <span className="text-xs text-[#7a7a7a]"> /day</span>
                    </div>
                    <div className="text-xs text-[#7a7a7a] mt-0.5">
                      Buy ₹{item.buyPrice}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
