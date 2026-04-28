import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "./Home";
import SignIn from "./SignIn";
import Process from "./Process";
import Product from "./Product";
import Shop from "./Shop";
import Dashboard from "./Dashboard";
import ListPiece from "./ListPiece";
import Favorites from "./Favorites";
import Bag from "./Bag";
import Orders from "./Orders";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#fcfbf8] text-[#2c2c2c] selection:bg-black/10">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/how-it-works" element={<Process />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list" element={<ListPiece />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
