import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, CreditCard, Truck, CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Bag() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"summary" | "shipping" | "payment" | "success">("summary");
  
  // Mock form states
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: ""
  });

  const [cardDetails, setCardDetails] = useState({
    number: "4242 4242 4242 4242",
    expiry: "12/28",
    cvv: "123"
  });

  const handleCheckout = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    setStep("shipping");
  };

  const handlePayment = () => {
    setStep("success");
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (step === "success") {
    return (
      <div className="bg-[#fcfbf8] min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-serif text-[#2c2c2c] mb-4">Confirmed!</h1>
          <p className="text-[#7a7a7a] mb-12 leading-relaxed">
            Your booking is secured. You'll receive a confirmation email shortly. 
            Our courier will reach out to schedule your white-glove delivery.
          </p>
          <div className="border thin-border p-8 bg-white/50 mb-12 text-left">
             <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Order Details</div>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Booking ID:</span> <span className="font-mono">#RW-{Math.floor(Math.random()*90000) + 10000}</span></div>
                <div className="flex justify-between"><span>Status:</span> <span className="text-green-700 font-semibold uppercase text-xs">Payment Successful</span></div>
             </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-block bg-[#2a3d32] text-white px-10 py-5 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Content */}
          <div className="flex-grow">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
                Your Selection
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c]">
                The <span className="italic">Bag.</span>
              </h1>
            </div>

            {/* Stepper */}
            <div className="flex gap-8 mb-12 border-b thin-border pb-6 overflow-x-auto">
                <button 
                  onClick={() => setStep("summary")}
                  className={`text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 ${step === "summary" ? "text-[#2a3d32]" : "text-[#7a7a7a]"}`}
                >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step === "summary" ? "border-[#2a3d32] bg-[#2a3d32] text-white" : "border-[#7a7a7a]"}`}>1</span>
                    Summary
                </button>
                <button 
                  disabled={step === "summary" && !user}
                  onClick={() => user && setStep("shipping")}
                  className={`text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 ${step === "shipping" ? "text-[#2a3d32]" : "text-[#7a7a7a]"}`}
                >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step === "shipping" ? "border-[#2a3d32] bg-[#2a3d32] text-white" : "border-[#7a7a7a]"}`}>2</span>
                    Shipping
                </button>
                <button 
                  disabled={step !== "payment"}
                  className={`text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 ${step === "payment" ? "text-[#2a3d32]" : "text-[#7a7a7a]"}`}
                >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step === "payment" ? "border-[#2a3d32] bg-[#2a3d32] text-white" : "border-[#7a7a7a]"}`}>3</span>
                    Payment
                </button>
            </div>

            {step === "summary" && (
              <div className="space-y-8">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b thin-border group">
                      <div className="w-24 h-32 bg-[#e6e4dc] flex-none">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                           <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">{item.brand}</div>
                           <h3 className="text-xl font-serif text-[#2c2c2c]">{item.title}</h3>
                           <p className="text-xs text-[#7a7a7a] mt-2 font-serif italic">
                              {item.startDate} &rarr; {item.endDate} ({item.days} days)
                           </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs uppercase tracking-[0.2em] font-bold text-red-800 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                         <div className="text-xl font-serif">₹{item.totalPrice}</div>
                         <div className="text-xs uppercase tracking-[0.1em] text-[#7a7a7a]">₹{item.rentalPrice}/day</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center border thin-border">
                    <ShoppingBag className="w-12 h-12 text-[#e6e4dc] mx-auto mb-6" />
                    <p className="text-[#7a7a7a] text-sm mb-8 font-serif italic">Your bag is currently empty.</p>
                    <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-bold text-[#2a3d32] border-b border-[#2a3d32] pb-1">Browse the closet</Link>
                  </div>
                )}
              </div>
            )}

            {step === "shipping" && (
                <div className="max-w-lg">
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">Delivery Address</label>
                            <textarea 
                              value={shippingDetails.address}
                              onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                              className="w-full bg-[#fcfbf8] border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors h-24"
                              placeholder="Flat/House No, Street Name"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">City</label>
                                <input 
                                  value={shippingDetails.city}
                                  onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                                  className="w-full bg-[#fcfbf8] border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">Postal Code</label>
                                <input 
                                  value={shippingDetails.postalCode}
                                  onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                                  className="w-full bg-[#fcfbf8] border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">Phone Number</label>
                            <input 
                              value={shippingDetails.phone}
                              onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                              className="w-full bg-[#fcfbf8] border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                              placeholder="+91"
                            />
                        </div>
                        <button 
                          onClick={() => setStep("payment")}
                          disabled={!shippingDetails.address || !shippingDetails.city}
                          className="w-full bg-[#2a3d32] text-white py-5 text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#1f2d25] transition-colors rounded-[2px] disabled:opacity-50"
                        >
                            Continue to Payment <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {step === "payment" && (
                <div className="max-w-lg">
                    <div className="bg-[#2a3d32] p-8 text-white mb-10 rounded-[4px] shadow-xl">
                        <div className="flex justify-between items-start mb-12">
                           <CreditCard className="w-8 h-8 opacity-50" />
                           <div className="text-xs tracking-[0.2em]">REWEAR PREMIUM</div>
                        </div>
                        <div className="text-xl tracking-[0.1em] mb-8 font-mono">
                           {cardDetails.number}
                        </div>
                        <div className="flex gap-12">
                           <div>
                               <div className="text-[8px] uppercase tracking-[0.1em] opacity-60 mb-1">Expiry</div>
                               <div className="text-xs uppercase font-semibold">{cardDetails.expiry}</div>
                           </div>
                           <div>
                               <div className="text-[8px] uppercase tracking-[0.1em] opacity-60 mb-1">CVV</div>
                               <div className="text-xs uppercase font-semibold">***</div>
                           </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border thin-border p-6 mb-8">
                             <div className="flex items-center gap-4 text-[#7a7a7a]">
                                <Truck className="w-5 h-5" />
                                <div>
                                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#2c2c2c]">White-Glove Delivery</div>
                                    <div className="text-xs italic">Shipping to {shippingDetails.city}</div>
                                </div>
                             </div>
                        </div>
                        <button 
                          onClick={handlePayment}
                          className="w-full bg-[#2a3d32] text-white py-5 text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#1f2d25] transition-colors rounded-[2px]"
                        >
                            Pay & Reserve Now <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-[9px] text-center text-[#7a7a7a] uppercase tracking-[0.1em]">
                           Your card will be charged ₹{cartTotal + 25} (including service fee)
                        </p>
                    </div>
                </div>
            )}
          </div>

          {/* Right: Order Summary */}
          {cart.length > 0 && step !== "success" && (
            <div className="lg:w-96 flex-none">
              <div className="bg-white border thin-border p-8 sticky top-32">
                <h2 className="text-xl font-serif text-[#2c2c2c] mb-8 pb-4 border-b thin-border">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a7a7a]">Subtotal</span>
                    <span className="text-[#2c2c2c]">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a7a7a]">Care & Insurance</span>
                    <span className="text-[#2c2c2c]">₹25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a7a7a]">Delivery</span>
                    <span className="text-[#2a3d32] font-semibold uppercase text-xs">Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 border-t thin-border mb-10">
                   <div className="text-sm uppercase tracking-[0.2em] font-bold text-[#7a7a7a]">Total</div>
                   <div className="text-3xl font-serif text-[#2c2c2c]">₹{cartTotal + 25}</div>
                </div>

                {step === "summary" && (
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#2a3d32] text-white py-5 text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#1f2d25] transition-colors rounded-[2px]"
                  >
                    Proceed to Reserve <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {!user && step === "summary" && (
                  <p className="text-xs text-center text-[#7a7a7a] mt-4 uppercase tracking-[0.1em]">
                    You need to <Link to="/sign-in" className="text-[#2a3d32] underline">Sign In</Link> to reserve pieces.
                  </p>
                )}

                <div className="mt-12 space-y-4 pt-12 border-t thin-border">
                  <div className="flex gap-4 items-center text-[#7a7a7a]">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.1em] font-semibold">Secure Payment</span>
                  </div>
                  <div className="flex gap-4 items-center text-[#7a7a7a]">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.1em] font-semibold">Cancellation protection</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
