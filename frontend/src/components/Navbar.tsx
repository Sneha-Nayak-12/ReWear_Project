import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Heart, Search, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#fcfbf8]/95 backdrop-blur-md border-b thin-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-[72px] flex items-center justify-between relative">

          {/* Left: Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="font-serif text-[26px] md:text-[32px] leading-none italic tracking-tight text-[#2a3d32] hover:opacity-80 transition-opacity"
            >
              ReWear
            </Link>
          </div>

          {/* Center: Search Bar - Desktop only */}
          <div className="hidden lg:flex absolute left-[42%] xl:left-[40%] -translate-x-1/2 w-full max-w-[320px] xl:max-w-[380px] items-center">
            <div className="relative w-full group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] stroke-[1.5] group-focus-within:text-[#2c2c2c] transition-colors" />
              <input
                type="text"
                placeholder="Search pieces, brands..."
                className="w-full bg-[#f4f2eb] border border-transparent pl-11 pr-4 py-2.5 text-[11px] tracking-[0.02em] focus:outline-none focus:bg-white focus:border-[#d7d5cb] transition-all rounded-full placeholder:text-[#a0a0a0] font-medium text-[#2c2c2c] shadow-inner focus:shadow-md"
              />
            </div>
          </div>

          {/* Right: Nav & Icons */}
          <div className="flex items-center gap-4 xl:gap-8 text-[10px] xl:text-[11px] uppercase tracking-[0.1em] font-semibold text-[#2c2c2c]">

            {/* Desktop Text Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link to="/shop" className="hover:text-[#7a7a7a] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#2c2c2c] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Shop
              </Link>
              <Link to="/how-it-works" className="hover:text-[#7a7a7a] transition-colors whitespace-nowrap relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#2c2c2c] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                How it works
              </Link>
              {user && (
                <Link to="/orders" className="hover:text-[#7a7a7a] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#2c2c2c] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                  Orders
                </Link>
              )}
              <Link to="/list" className="hover:text-[#7a7a7a] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#2c2c2c] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Lend
              </Link>
            </div>

            <div className="h-4 w-px bg-[#e6e4dc] hidden lg:block" />

            {/* Icons - always visible */}
            <div className="flex items-center gap-4 xl:gap-5">
              <Link to="/favorites" className="hover:text-[#7a7a7a] transition-colors relative group">
                <Heart className="w-[18px] h-[18px] stroke-[1.25] group-hover:scale-110 transition-transform" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#cebc9a] text-white text-[8px] flex items-center justify-center rounded-full font-sans font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link to="/bag" className="hover:text-[#7a7a7a] transition-colors relative group">
                <ShoppingBag className="w-[18px] h-[18px] stroke-[1.25] group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#2a3d32] text-white text-[8px] flex items-center justify-center rounded-full font-sans font-medium">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* User icon - desktop only */}
              {!user ? (
                <Link to="/sign-in" className="hover:text-[#7a7a7a] transition-colors hidden lg:flex items-center gap-1.5 whitespace-nowrap group">
                  <User className="w-[18px] h-[18px] stroke-[1.25] group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline-block">Sign In</span>
                </Link>
              ) : (
                <Link to="/dashboard" className="hover:text-[#7a7a7a] transition-colors hidden lg:flex items-center gap-1.5 whitespace-nowrap group">
                  <User className="w-[18px] h-[18px] stroke-[1.25] group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline-block truncate max-w-[80px]">{user.name}</span>
                </Link>
              )}

              {/* Hamburger - mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-1.5 hover:bg-black/5 rounded-lg transition-colors text-[#2c2c2c]"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

        {/* Drawer */}
        <div className={`absolute top-[72px] left-0 right-0 bg-[#fcfbf8] border-b thin-border shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? "translate-y-0" : "-translate-y-4"}`}>

          {/* Mobile Search */}
          <div className="px-5 pt-5 pb-4 border-b thin-border">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] stroke-[1.5]" />
              <input
                type="text"
                placeholder="Search pieces, brands..."
                className="w-full bg-[#f4f2eb] border border-transparent pl-11 pr-4 py-3 text-[12px] focus:outline-none focus:bg-white focus:border-[#d7d5cb] transition-all rounded-full placeholder:text-[#a0a0a0] font-medium text-[#2c2c2c]"
              />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="px-5 py-2 flex flex-col">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/how-it-works", label: "How it works" },
              { to: "/list", label: "Lend a piece" },
              ...(user ? [{ to: "/orders", label: "Orders" }] : []),
              ...(user
                ? [{ to: "/dashboard", label: "My Dashboard" }]
                : [{ to: "/sign-in", label: "Sign In" }]),
              { to: "/favorites", label: "Saved pieces" },
              { to: "/bag", label: "My Bag" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between py-4 border-b thin-border text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2c2c2c] hover:text-[#2a3d32] transition-colors last:border-b-0"
              >
                {label}
                <span className="text-[#cebc9a] font-serif italic text-lg leading-none">→</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Footer tag */}
          <div className="px-5 py-4 bg-[#f4f2eb] text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] flex justify-between">
            <span>ReWear · Est. 2026</span>
            <span>Circular Fashion</span>
          </div>
        </div>
      </div>
    </>
  );
}
