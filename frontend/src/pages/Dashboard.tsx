import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, Package } from "lucide-react";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    if (token) {
      axios
        .get("/api/user/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setStats(res.data));
    }
  }, [user, token, navigate]);

  if (!user || !stats) return null;

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Control Room
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c]">
              Hello, {user.name}
            </h1>
          </div>
          <div className="flex gap-4">
            <Link
              to="/list"
              className="bg-[#2a3d32] text-white px-6 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px]"
            >
              New Listing
            </Link>
            <Link
              to="/orders"
              className="border thin-border px-6 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-black/5 transition-colors rounded-[2px] text-[#2c2c2c] flex items-center gap-2"
            >
              Order History
            </Link>
            <button
              onClick={logout}
              className="border thin-border px-6 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-black/5 transition-colors rounded-[2px] text-[#2c2c2c]"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border thin-border mb-16">
          <div className="p-8 border-b md:border-r thin-border">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Total Earnings
            </div>
            <div className="text-4xl font-serif text-[#2a3d32] mb-1">
              ₹{stats.earnings.toFixed(2)}
            </div>
          </div>
          <div className="p-8 border-b md:border-r thin-border">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Your Listings
            </div>
            <div className="text-4xl font-serif text-[#2c2c2c] mb-2">
              {stats.listings.length}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7a7a7a]">
              {stats.listings.length} Active Piece(s)
            </div>
          </div>
          <div className="p-8 border-b thin-border relative group">
            <Link to="/orders" className="absolute inset-0 z-10"></Link>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4 flex justify-between items-center pr-2">
               Booking History
               <Package className="w-3.5 h-3.5 text-[#cebc9a] group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-4xl font-serif text-[#2c2c2c] group-hover:text-[#2a3d32] transition-colors">
              {stats.pendingOrders + stats.completed}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7a7a7a] mt-2 group-hover:underline">
               Track Archives
            </div>
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r thin-border">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Pending
            </div>
            <div className="text-4xl font-serif text-[#2c2c2c]">
              {stats.pendingOrders}
            </div>
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r thin-border">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Completed
            </div>
            <div className="text-4xl font-serif text-[#2c2c2c]">
              {stats.completed}
            </div>
          </div>
          <div className="p-8 relative group">
            <Link to="/favorites" className="absolute inset-0 z-10"></Link>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4 flex justify-between items-center pr-2">
              Favorites
              <Heart className="w-3.5 h-3.5 text-[#cebc9a] fill-[#cebc9a] group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-4xl font-serif text-[#2c2c2c] group-hover:text-[#2a3d32] transition-colors">
              {favorites.length}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7a7a7a] mt-2 group-hover:underline">
              View All
            </div>
          </div>
        </div>

        {/* Closet */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-6">
            Your Closet
          </div>

          {stats.listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.listings.map((item: any) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="group block border thin-border relative"
                >
                  <div className="aspect-[3/4] bg-[#e6e4dc] overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={item.title}
                    />
                  </div>
                  <div className="p-4 bg-white/50 backdrop-blur-sm absolute bottom-0 inset-x-0 border-t thin-border">
                    <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">
                      {item.brand}
                    </div>
                    <div className="text-sm font-serif text-[#2c2c2c]">
                      {item.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border thin-border min-h-[300px] flex flex-col items-center justify-center p-12 text-center bg-white/40">
              <h3 className="text-2xl font-serif text-[#2c2c2c] mb-6">
                No pieces listed yet.
              </h3>
              <Link
                to="/list"
                className="bg-[#2a3d32] text-white px-6 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px]"
              >
                List your first piece
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
