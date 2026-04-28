import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Upload, X, Camera, Plus, Trash2 } from "lucide-react";
import axios from "axios";

export default function ListPiece() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dress");
  const [occasion, setOccasion] = useState("Wedding");
  const [size, setSize] = useState("M");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [isRent, setIsRent] = useState(true);
  const [isBuy, setIsBuy] = useState(false);
  const [buyPrice, setBuyPrice] = useState("");
  const [error, setError] = useState("");
  
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      // Mocking image upload - in reality, you'd upload to Cloudinary/S3
      const readers = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((base64Images) => {
        setImages((prev) => [...prev, ...base64Images].slice(0, 4));
        setIsUploading(false);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !brand || images.length === 0) {
      setError("Please fill in all required fields and upload at least one photo.");
      return;
    }

    try {
      await axios.post(
        "/api/listings",
        {
          title,
          description,
          category,
          occasion,
          size,
          brand,
          color,
          rentalPrice: Number(rentalPrice) || 0,
          buyPrice: Number(buyPrice) || 0,
          image: images[0], // Primary image
          images: images, // All images
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const categories = ["Dress", "Suit", "Traditional", "Outerwear", "Accessory"];
  const occasions = ["Wedding", "Party", "Formal", "Casual"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  if (!user) return null;

  return (
    <div className="bg-[#fcfbf8] min-h-full">
      <div className="max-w-[1100px] mx-auto px-6 py-20 lg:py-24">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
            New Listing
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4">
            Lend a piece. <span className="italic text-[#2a3d32]">Make it travel.</span>
          </h1>
          <p className="text-sm text-[#7a7a7a] max-w-xl">
            Share your wardrobe with our community. We handle pickup, dry-cleaning, 
            and white-glove delivery while you earn 80% of every rental booking.
          </p>
        </div>

        {error && (
          <div className="text-red-500 mb-10 p-5 border border-red-200 bg-red-50 text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Photos Upload Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">
               Imagery / Up to 4 Photos
            </div>
            
            {/* Primary Upload Slot */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-[3/4] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 text-center cursor-pointer overflow-hidden relative ${
                images.length > 0 ? 'border-[#2a3d32] bg-white' : 'border-[#e6e4dc] hover:border-[#7a7a7a] bg-black/5 hover:bg-white'
              }`}
            >
              <input 
                type="file" 
                multiple 
                hidden 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
              />
              
              {images.length > 0 ? (
                <>
                  <img src={images[0]} alt="Primary" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-md p-4 text-white text-[10px] uppercase font-bold tracking-[0.1em]">
                    Primary Cover Photo
                  </div>
                </>
              ) : (
                <>
                  <Camera className="w-8 h-8 mb-4 text-[#cebc9a]" />
                  <div className="text-xs uppercase tracking-[0.1em] font-bold text-[#2c2c2c]">Drop images here</div>
                  <div className="text-[10px] uppercase tracking-[0.1em] text-[#7a7a7a] mt-2">JPEG or PNG &middot; Max 5MB</div>
                </>
              )}
            </div>

            {/* Thumbnail Slots */}
            <div className="grid grid-cols-3 gap-4">
               {images.slice(1).map((img, idx) => (
                 <div key={idx} className="aspect-[3/4] bg-white border thin-border relative group">
                    <img src={img} alt={`Preview ${idx+2}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx + 1)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                 </div>
               ))}
               {images.length > 0 && images.length < 4 && (
                 <button 
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className="aspect-[3/4] border border-dashed border-[#e6e4dc] flex items-center justify-center text-[#7a7a7a] hover:bg-black/5 transition-colors"
                 >
                    <Plus className="w-5 h-5" />
                 </button>
               )}
            </div>

            {images.length > 0 && (
              <button 
                type="button"
                onClick={() => setImages([])}
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-800 hover:underline"
              >
                Clear all images
              </button>
            )}
          </div>

          {/* Form Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Essential Details</label>
                <div className="space-y-6">
                   <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Piece Title (e.g. Vintage Silk Kimono)"
                    className="w-full bg-transparent border-b thin-border py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors font-serif italic text-lg"
                  />
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="The story of this piece, fit, fabric details..."
                    className="w-full bg-transparent border thin-border p-5 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors resize-none h-32"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Category</label>
                   <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-bold transition-all border ${
                          category === c ? "bg-[#2a3d32] text-white border-[#2a3d32]" : "bg-white text-[#7a7a7a] border-[#e6e4dc] hover:border-[#7a7a7a]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                   </div>
                </div>
                <div>
                   <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Size</label>
                   <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-11 h-11 text-[10px] font-bold transition-all border flex items-center justify-center ${
                          size === s ? "bg-[#2a3d32] text-white border-[#2a3d32]" : "bg-white text-[#7a7a7a] border-[#e6e4dc] hover:border-[#7a7a7a]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                 <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Brand</label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-white border thin-border px-5 py-4 text-sm focus:outline-none focus:border-[#2a3d32]"
                    />
                 </div>
                 <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">Primary Color</label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full bg-white border thin-border px-5 py-4 text-sm focus:outline-none focus:border-[#2a3d32]"
                    />
                 </div>
              </div>
            </div>

            <div className="bg-white border thin-border p-10 space-y-10">
               <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7a7a7a]">Pricing & Model</div>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                     <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={`w-6 h-6 border flex items-center justify-center transition-all ${isRent ? 'bg-[#2a3d32] border-[#2a3d32]' : 'border-[#e6e4dc]'}`}>
                           <input type="checkbox" hidden checked={isRent} onChange={(e) => setIsRent(e.target.checked)} />
                           {isRent && <Plus className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-[0.05em]">Lend for Daily Rental</span>
                     </label>
                  </div>
                  <div className="flex items-baseline gap-3">
                     <span className="text-[#7a7a7a] font-serif italic text-lg">₹</span>
                     <input
                        type="number"
                        value={rentalPrice}
                        onChange={(e) => setRentalPrice(e.target.value)}
                        disabled={!isRent}
                        className="w-24 bg-transparent border-b thin-border py-2 text-xl font-serif text-right focus:outline-none focus:border-[#2a3d32] disabled:opacity-20"
                     />
                     <span className="text-xs text-[#7a7a7a] uppercase font-bold tracking-[0.1em]">/ day</span>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                     <label className="flex items-center gap-4 cursor-pointer group">
                        <div className={`w-6 h-6 border flex items-center justify-center transition-all ${isBuy ? 'bg-[#2a3d32] border-[#2a3d32]' : 'border-[#e6e4dc]'}`}>
                           <input type="checkbox" hidden checked={isBuy} onChange={(e) => setIsBuy(e.target.checked)} />
                           {isBuy && <Plus className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-[0.05em]">List for Permanent Sale</span>
                     </label>
                  </div>
                  <div className="flex items-baseline gap-3">
                     <span className="text-[#7a7a7a] font-serif italic text-lg">₹</span>
                     <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        disabled={!isBuy}
                        className="w-32 bg-transparent border-b thin-border py-2 text-xl font-serif text-right focus:outline-none focus:border-[#2a3d32] disabled:opacity-20"
                     />
                  </div>
               </div>
            </div>

            <div className="pt-8">
               <button
                type="submit"
                className="w-full bg-[#2a3d32] text-white py-6 text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#1f2d25] transition-all shadow-xl hover:-translate-y-1 rounded-[2px]"
              >
                Publish to Gallery
              </button>
              <p className="text-[10px] text-[#7a7a7a] text-center mt-6 uppercase tracking-[0.1em]">
                 By publishing, you agree to our curator standards and quality pledge.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
