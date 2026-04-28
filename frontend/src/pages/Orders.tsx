import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Calendar,
  ArrowUpRight,
  Search,
  Filter
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Confirmed" | "Shipped" | "Delivered" | "Returned";
  items: {
    id: number;
    title: string;
    brand: string;
    image: string;
    type: "Rental" | "Purchase";
    price: number;
  }[];
}

export default function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for order history
    const mockOrders: Order[] = [
      {
        id: "RW-48291",
        date: "2026-04-10",
        total: 1250,
        status: "Delivered",
        items: [
          {
            id: 1,
            title: "Vintage Velvet Blazer",
            brand: "Gucci",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2672&auto=format&fit=crop",
            type: "Rental",
            price: 1200
          }
        ]
      },
      {
        id: "RW-39102",
        date: "2026-03-22",
        total: 4500,
        status: "Returned",
        items: [
          {
            id: 2,
            title: "Silk Evening Gown",
            brand: "Oscar de la Renta",
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2574&auto=format&fit=crop",
            type: "Rental",
            price: 4400
          }
        ]
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfbf8] pt-32 text-center text-[#7a7a7a] font-serif italic">
        Curating your history...
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
              Member Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c]">
              Order <span className="italic">Archives.</span>
            </h1>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a]" />
                <input 
                  type="text" 
                  placeholder="Find an order..." 
                  className="bg-transparent border thin-border pl-12 pr-4 py-3 text-xs focus:outline-none focus:border-[#2a3d32] placeholder:text-[#7a7a7a]/50" 
                />
             </div>
             <button className="border thin-border px-5 py-3 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#7a7a7a] hover:bg-black/5 transition-colors">
                <Filter className="w-3 h-3" /> Filter
             </button>
          </div>
        </div>

        <div className="space-y-12">
          {orders.map((order) => (
            <div key={order.id} className="group">
              <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b thin-border">
                <div className="flex items-center gap-8">
                   <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1">Order Ref</div>
                      <div className="text-sm font-mono font-bold text-[#2c2c2c]">{order.id}</div>
                   </div>
                   <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1">Placed On</div>
                      <div className="text-sm text-[#2c2c2c]">{order.date}</div>
                   </div>
                   <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1">Status</div>
                      <div className={`text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-1 rounded-sm flex items-center gap-1.5 ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                        order.status === 'Returned' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                      }`}>
                        {order.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                        {order.status === 'Returned' && <Clock className="w-3 h-3" />}
                        {order.status}
                      </div>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1">Total Amount</div>
                   <div className="text-xl font-serif text-[#2c2c2c]">₹{order.total}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 {order.items.map((item) => (
                   <div key={item.id} className="flex gap-6 p-6 border thin-border bg-white hover:shadow-xl transition-all duration-500">
                      <div className="w-24 h-32 bg-[#e6e4dc] flex-none overflow-hidden">
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                         <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#cebc9a] mb-1">{item.brand}</div>
                            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">{item.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] font-semibold text-[#7a7a7a]">
                               <Package className="w-3 h-3" /> {item.type}
                            </div>
                         </div>
                         <Link 
                           to={`/product/${item.id}`}
                           className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2a3d32] flex items-center gap-1 hover:gap-2 transition-all"
                         >
                            View Details <ArrowUpRight className="w-3 h-3" />
                         </Link>
                      </div>
                   </div>
                 ))}
                 
                 <div className="border thin-border p-8 bg-[#fcfbf8] flex flex-col justify-center">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7a7a7a] mb-6">Payment Method</div>
                    <div className="flex items-center gap-4 text-[#2c2c2c]">
                       <CreditCard className="w-5 h-5 text-[#cebc9a]" />
                       <div>
                          <div className="text-sm font-medium italic font-serif">ReWear Premium · 4242</div>
                          <div className="text-[9px] uppercase tracking-[0.1em] text-green-700 font-bold mt-1 inline-flex items-center gap-1">
                             <CheckCircle className="w-2.5 h-2.5" /> Transaction Verified
                          </div>
                       </div>
                       <button className="ml-auto p-2 hover:bg-black/5 transition-colors">
                          <ChevronRight className="w-4 h-4 text-[#7a7a7a]" />
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="py-32 text-center border thin-border">
            <Package className="w-12 h-12 text-[#e6e4dc] mx-auto mb-6" />
            <p className="text-[#7a7a7a] text-sm mb-8 font-serif italic">No orders found in your archives.</p>
            <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-bold text-[#2a3d32] border-b border-[#2a3d32] pb-1">Start your first booking</Link>
          </div>
        )}
      </div>
    </div>
  );
}
