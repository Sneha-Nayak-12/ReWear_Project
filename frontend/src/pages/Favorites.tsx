import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
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

export default function Favorites() {
  const [listings, setListings] = useState<Listing[]>([]);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/listings").then((res) => {
      setListings(res.data);
      setLoading(false);
    });
  }, []);

  const favoriteListings = listings.filter((item) => favorites.includes(item.id));

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
            Curated by you
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] max-w-lg leading-tight">
            Your <span className="italic">Favorites.</span>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#7a7a7a]">Loading your curation...</div>
        ) : favoriteListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {favoriteListings.map((item) => (
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
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">
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
        ) : (
          <div className="text-center py-20 border thin-border">
            <div className="max-w-xs mx-auto">
              <Heart className="w-8 h-8 text-[#e6e4dc] mx-auto mb-6" />
              <p className="text-[#7a7a7a] text-sm mb-8">
                Your favorites list is empty. Start exploring the closet to curate your dream wardrobe.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#2a3d32] text-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px]"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
