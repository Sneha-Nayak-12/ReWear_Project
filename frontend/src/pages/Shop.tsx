import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

interface Listing {
  id: number;
  title: string;
  brand: string;
  rentalPrice: number;
  buyPrice: number;
  image: string;
  category: string;
  occasion: string;
  size: string;
}

export default function Shop() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [size, setSize] = useState("All");
  const [mode, setMode] = useState("Rent or Buy");
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    axios.get("/api/listings").then((res) => setListings(res.data));
  }, []);

  const categories = [
    "All",
    "Dress",
    "Suit",
    "Traditional",
    "Outerwear",
    "Accessory",
  ];
  const occasions = ["All", "Wedding", "Party", "Formal", "Casual"];
  const sizes = ["All", "XS", "S", "M", "L", "XL"];
  const modes = ["Rent or Buy", "Rent Only", "Buy Only"];

  const filtered = listings.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (occasion !== "All" && item.occasion !== occasion) return false;
    if (size !== "All" && item.size !== size) return false;
    if (
      searchTerm &&
      !(item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(item.brand || "").toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    // Simplification: the mock items don't have rentOnly/buyOnly explicitly in DB, so we just filter everything unless specific fields exist
    return true;
  });

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              The Closet
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] max-w-lg leading-tight">
              Find <span className="italic">the one</span> you'll wear once,
              twice, or own forever.
            </h1>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a]" />
              <input
                type="text"
                placeholder="Search dresses, suits, brands..."
                className="w-full border thin-border bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-t thin-border pt-8 pb-12">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-xs text-[#7a7a7a]">
            {/* Category */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Category
              </span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`hover:text-[#2c2c2c] transition-colors ${category === c ? "bg-[#2a3d32] text-white px-3 py-1 -my-1 rounded-sm" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
            {/* Occasion */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Occasion
              </span>
              {occasions.map((o) => (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`hover:text-[#2c2c2c] transition-colors ${occasion === o ? "bg-[#2a3d32] text-white px-3 py-1 -my-1 rounded-sm" : ""}`}
                >
                  {o}
                </button>
              ))}
            </div>
            {/* Size */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Size
              </span>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`hover:text-[#2c2c2c] transition-colors ${size === s ? "bg-[#2a3d32] text-white px-3 py-1 -my-1 rounded-sm" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Mode */}
            <div className="flex items-center gap-2 ml-auto">
              {modes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`border thin-border px-4 py-2 hover:bg-black/5 transition-colors uppercase tracking-[0.1em] text-xs font-semibold ${mode === m ? "bg-[#2a3d32] text-white hover:bg-[#1f2d25] border-[#2a3d32]" : ""}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((item) => (
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
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-all"
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
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-[#7a7a7a]">
              No pieces found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
