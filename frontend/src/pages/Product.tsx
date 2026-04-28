import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
  Calendar as CalendarIcon,
  Heart,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { DayPicker } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";

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
  user: string;
  images?: string[];
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToBag, setAddedToBag] = useState(false);

  // Messaging state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageStatus, setMessageStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Calendar State
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Gallery State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    axios
      .get(`/api/listings/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get(`/api/listings/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSendMessage = async () => {
    if (!token) return navigate("/sign-in");

    if (!messageText.trim()) return;

    setMessageStatus("sending");
    try {
      await axios.post(
        "/api/messages",
        {
          listingId: id,
          text: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessageStatus("success");
      setTimeout(() => {
        setIsMessageModalOpen(false);
        setMessageText("");
        setMessageStatus("idle");
      }, 2000);
    } catch (err) {
      setMessageStatus("error");
    }
  };

  const openMessageModal = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    setIsMessageModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) return navigate("/sign-in");

    if (!newReviewComment.trim()) return;

    setReviewStatus("submitting");
    try {
      const res = await axios.post(
        `/api/listings/${id}/reviews`,
        {
          rating: newReviewRating,
          comment: newReviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReviews((prev) => [...prev, res.data]);
      setReviewStatus("success");
      setNewReviewComment("");
      setNewReviewRating(5);

      setTimeout(() => {
        setReviewStatus("idle");
      }, 3000);
    } catch (err) {
      setReviewStatus("error");
    }
  };

  const calculateTotal = () => {
    if (!dateRange.from || !dateRange.to || !product)
      return product?.rentalPrice || 0;
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    return product.rentalPrice * days;
  };

  const getDaysCount = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    return differenceInDays(dateRange.to, dateRange.from) + 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 text-center text-[#7a7a7a]">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center text-[#7a7a7a]">
        Piece not found.
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf8] pb-24 min-h-full">
      {/* Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#fcfbf8] w-full max-w-lg p-8 relative rounded-[2px] shadow-2xl">
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-6 right-6 text-[#7a7a7a] hover:text-[#2c2c2c]"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-2">
              Message Owner
            </h2>
            <p className="text-sm text-[#7a7a7a] mb-6">
              Ask a question about {product.title}.
            </p>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Hi, is this piece still available for the weekend of the 28th?"
              className="w-full bg-white border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors resize-none h-32 mb-6"
              disabled={
                messageStatus === "sending" || messageStatus === "success"
              }
            ></textarea>

            <div className="flex items-center justify-between">
              <div>
                {messageStatus === "error" && (
                  <span className="text-red-500 text-xs">
                    Failed to send message.
                  </span>
                )}
                {messageStatus === "success" && (
                  <span className="text-[#2a3d32] text-xs font-semibold">
                    Message sent successfully!
                  </span>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={
                  messageStatus === "sending" ||
                  messageStatus === "success" ||
                  !messageText.trim()
                }
                className="bg-[#2a3d32] text-white px-6 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors rounded-[2px] disabled:opacity-50"
              >
                {messageStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6">
        <Link
          to="/shop"
          className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] hover:text-[#2c2c2c] mb-8 inline-flex items-center gap-2"
        >
          &mdash; Back to closet
        </Link>

        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {/* Left: Image */}
          <div className="md:w-1/2 space-y-4">
            <div className="aspect-[3/4] bg-[#e6e4dc] border thin-border relative group overflow-hidden">
              <img
                src={
                  product.images
                    ? product.images[currentImageIndex]
                    : product.image
                }
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur text-[#2c2c2c] transition-all z-10"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite(product.id)
                      ? "fill-[#2a3d32] text-[#2a3d32]"
                      : "text-[#7a7a7a] hover:text-[#2a3d32]"
                  }`}
                />
              </button>

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product.images!.length - 1 : prev - 1,
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur text-[#2c2c2c] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex((prev) =>
                        prev === product.images!.length - 1 ? 0 : prev + 1,
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur text-[#2c2c2c] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${currentImageIndex === idx ? "bg-[#2c2c2c]" : "bg-white/60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="hidden sm:grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-[3/4] border thin-border overflow-hidden opacity-80 hover:opacity-100 transition-opacity ${currentImageIndex === idx ? "ring-2 ring-offset-1 ring-[#2a3d32] opacity-100" : ""}`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 py-4">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-3">
              {product.brand}
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif text-[#2c2c2c] mb-6">
              {product.title}
            </h1>
            <p className="text-sm text-[#7a7a7a] font-serif italic mb-10">
              Beautiful {(product.category || "").toLowerCase()} ready for your
              next {(product.occasion || "").toLowerCase()} event.
            </p>

            <div className="border-t border-b thin-border py-8 mb-10">
              <div className="grid grid-cols-2 gap-y-4 text-xs uppercase tracking-[0.15em] text-[#7a7a7a]">
                <div className="font-semibold">Size</div>
                <div className="text-[#2c2c2c]">{product.size}</div>

                <div className="font-semibold">Color</div>
                <div className="text-[#2c2c2c]">Various</div>

                <div className="font-semibold">Occasion</div>
                <div className="text-[#2c2c2c]">{product.occasion}</div>

                <div className="font-semibold">Category</div>
                <div className="text-[#2c2c2c]">{product.category}</div>

                <div className="font-semibold flex items-center gap-2">
                  Lender
                </div>
                <div className="text-[#2c2c2c] flex items-center justify-between">
                  <span>ReWear Curator</span>
                  <button
                    onClick={openMessageModal}
                    className="text-[#2a3d32] border-b border-[#2a3d32] hover:opacity-75 transition-opacity text-xs uppercase tracking-[0.1em] font-bold flex items-center gap-1.5 pb-0.5"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Ask Question
                  </button>
                </div>

                <div className="font-semibold">Retail</div>
                <div className="text-[#2c2c2c]">₹{product.buyPrice}</div>

                <div className="font-semibold">Rate</div>
                <div className="text-[#2c2c2c]">
                  ₹{product.rentalPrice} / day
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="border thin-border p-8 mb-8">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-6 flex justify-between items-center">
                <span>Pick your dates</span>
                <span className="text-xs font-serif italic text-[#2c2c2c]">
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                    : "Select Dates"}
                </span>
              </div>

              <div className="mb-6 flex justify-center border-b thin-border pb-6 overflow-x-auto">
                <DayPicker
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) =>
                    setDateRange({ from: range?.from, to: range?.to })
                  }
                  styles={{
                    day: { margin: "0.1rem", borderRadius: "4px" },
                    nav_button: {
                      backgroundColor: "#fcfbf8",
                      border: "1px solid #e6e4dc",
                    },
                    day_button: { border: "none" },
                  }}
                  className="p-3 bg-white border thin-border rounded-lg shadow-sm"
                />
              </div>

              {dateRange.from && dateRange.to ? (
                <div className="text-center text-base text-[#2c2c2c] mt-6 pb-2">
                  {getDaysCount()} days &middot;{" "}
                  {format(dateRange.from, "MMM d, yyyy")} &rarr;{" "}
                  {format(dateRange.to, "MMM d, yyyy")}
                </div>
              ) : null}
            </div>

            {/* Delivery address */}
            <div className="mb-8 border-b thin-border pb-10">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
                Delivery Address
              </div>
              <textarea
                className="w-full bg-[#fcfbf8] border thin-border p-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors resize-none h-20"
                placeholder="Street, city, postcode"
              ></textarea>
            </div>

            {/* Total / Reserve */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-1">
                  Total
                </div>
                <div className="text-3xl font-serif text-[#2c2c2c] mb-1">
                  ₹{calculateTotal()}.00
                </div>
              </div>
              <button
                onClick={() => {
                  if (!product) return;
                  addToCart({
                    id: Date.now(),
                    listingId: product.id,
                    title: product.title,
                    brand: product.brand,
                    image: product.image,
                    rentalPrice: product.rentalPrice,
                    buyPrice: product.buyPrice,
                    startDate: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
                    endDate: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
                    days: getDaysCount(),
                    totalPrice: calculateTotal(),
                    mode: "rent",
                  });
                  setAddedToBag(true);
                  setTimeout(() => setAddedToBag(false), 3000);
                }}
                className={`flex-1 px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold transition-all rounded-[2px] ${
                  addedToBag
                    ? "bg-green-700 text-white"
                    : "bg-[#2a3d32] text-white hover:bg-[#1f2d25]"
                } disabled:opacity-50`}
                disabled={!dateRange.from || !dateRange.to}
              >
                {addedToBag ? "Added to Bag" : "Reserve Now"}
              </button>
            </div>
            {addedToBag && (
              <p className="text-xs text-green-700 font-semibold uppercase tracking-[0.1em] mt-2 animate-pulse">
                Successfully added to your bag.
              </p>
            )}

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border thin-border p-4 flex items-center justify-center gap-2 text-[#7a7a7a]">
                <Truck className="w-3.5 h-3.5" />
                <span className="text-xs uppercase tracking-[0.1em] font-semibold">
                  White-glove delivery
                </span>
              </div>
              <div className="border thin-border p-4 flex items-center justify-center gap-2 text-[#7a7a7a]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs uppercase tracking-[0.1em] font-semibold">
                  Dry-cleaned
                </span>
              </div>
              <div className="border thin-border p-4 flex items-center justify-center gap-2 text-[#7a7a7a]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-xs uppercase tracking-[0.1em] font-semibold">
                  Insured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-16 border-t thin-border">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-serif text-[#2c2c2c] mb-4">
                Reviews
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl font-serif text-[#2c2c2c]">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "5.0"}
                </div>
                <div className="text-sm uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
                  {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </div>
              </div>

              {user ? (
                <div className="bg-white/50 p-6 border thin-border">
                  <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#2c2c2c] mb-4">
                    Leave a review
                  </h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className={`text-lg transition-colors ${newReviewRating >= star ? "text-[#cebc9a]" : "text-gray-300"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-2 block">
                        Comment
                      </label>
                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-white border thin-border p-3 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors resize-none h-24"
                        placeholder="What did you think of the fit and quality?"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={reviewStatus === "submitting"}
                      className="w-full bg-[#2a3d32] text-white py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors disabled:opacity-50"
                    >
                      {reviewStatus === "submitting"
                        ? "Submitting..."
                        : "Submit Review"}
                    </button>
                    {reviewStatus === "success" && (
                      <p className="text-[#2a3d32] text-xs mt-3">
                        Review submitted!
                      </p>
                    )}
                    {reviewStatus === "error" && (
                      <p className="text-red-500 text-xs mt-3">
                        Error submitting review.
                      </p>
                    )}
                  </form>
                </div>
              ) : (
                <div className="text-sm text-[#7a7a7a] border thin-border p-6 bg-white/50">
                  Please{" "}
                  <Link to="/sign-in" className="text-[#2a3d32] underline">
                    sign in
                  </Link>{" "}
                  to leave a review.
                </div>
              )}
            </div>

            <div className="md:w-2/3">
              {reviews.length === 0 ? (
                <div className="text-[#7a7a7a] text-sm text-center py-12 italic border thin-border bg-white/40">
                  No reviews yet. Be the first to review this piece!
                </div>
              ) : (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b thin-border pb-8 last:border-b-0"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-base font-semibold text-[#2c2c2c] uppercase tracking-[0.1em]">
                            {review.userName}
                          </div>
                          <div className="text-sm text-[#7a7a7a] mt-1">
                            {format(new Date(review.date), "MMMM d, yyyy")}
                          </div>
                        </div>
                        <div className="flex text-[#cebc9a] text-sm">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={
                                review.rating >= star
                                  ? "opacity-100"
                                  : "opacity-30"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#4a4a46] leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
