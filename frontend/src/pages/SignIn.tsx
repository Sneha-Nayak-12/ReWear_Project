import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full">
      {/* Left side Image */}
      <div className="md:w-1/2 relative bg-[#1a1a1a] min-h-[400px] md:min-h-full">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2670&auto=format&fit=crop"
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-x-0 bottom-0 p-12 md:p-20 bg-gradient-to-t from-black/80 to-transparent">
          <p className="font-serif italic text-3xl md:text-4xl text-white leading-tight max-w-md">
            "The dress had been in my closet for years. Now it's been to seven
            weddings."
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-[#fcfbf8]">
        <div className="w-full max-w-md">
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7a7a7a] mb-4">
            Welcome back
          </div>
          <h1 className="text-5xl font-serif mb-12 text-[#2c2c2c]">Sign in</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#7a7a7a] mb-3">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fcfbf8] border thin-border px-4 py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#7a7a7a] mb-3">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#fcfbf8] border thin-border px-4 py-4 text-sm focus:outline-none focus:border-[#2a3d32] transition-colors"
                placeholder="Any password will work in preview"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2a3d32] text-white py-4 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#1f2d25] transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#7a7a7a]">
            New here?{" "}
            <Link to="/register" className="text-[#2c2c2c] hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
