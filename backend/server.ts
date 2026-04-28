import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "rewear_secret_key_for_jwt_auth_mock";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

  app.use(cors());
  app.use(express.json());

  // Mock DB
  let messages: any[] = [];
  let reviews: any[] = [
    {
      id: 1,
      listingId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "Absolutely stunning lehenga. Got so many compliments!",
      date: "2026-03-15T10:00:00Z",
    },
    {
      id: 2,
      listingId: 2,
      userName: "Michael",
      rating: 4,
      comment: "Great fit, but a little snug on the shoulders.",
      date: "2026-02-20T14:30:00Z",
    },
  ];
  // let listings = [
  //   {
  //     id: 1,
  //     title: "Ivory Embroidered Lehenga",
  //     brand: "Saanjh Couture",
  //     rentalPrice: 110,
  //     buyPrice: 850,
  //     image:
  //       "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=2670",
  //     images: [
  //       "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=2670",
  //       "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=2670",
  //       "https://images.unsplash.com/photo-1515347619362-ea41b25008f1?auto=format&fit=crop&q=80&w=2670",
  //     ],
  //     category: "Traditional",
  //     occasion: "Wedding",
  //     size: "M",
  //     user: "boutique@rewear.com",
  //   },
  //   {
  //     id: 2,
  //     title: "Charcoal Three-Piece Suit",
  //     brand: "Sartoria Roma",
  //     rentalPrice: 55,
  //     buyPrice: 420,
  //     image:
  //       "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2670",
  //     images: [
  //       "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2670",
  //       "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2670",
  //     ],
  //     category: "Suit",
  //     occasion: "Formal",
  //     size: "L",
  //     user: "sartoria@rewear.com",
  //   },
  //   {
  //     id: 3,
  //     title: "Burgundy Velvet Tuxedo",
  //     brand: "Notch & Co",
  //     rentalPrice: 60,
  //     buyPrice: 1100,
  //     image:
  //       "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=2670",
  //     images: [
  //       "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=2670",
  //       "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=2670",
  //     ],
  //     category: "Suit",
  //     occasion: "Party",
  //     size: "M",
  //     user: "notchandco@rewear.com",
  //   },
  //   {
  //     id: 4,
  //     title: "Black Crepe Blazer",
  //     brand: "Linea",
  //     rentalPrice: 22,
  //     buyPrice: 140,
  //     image:
  //       "https://images.unsplash.com/photo-1591369822096-2241b71d6fbb?auto=format&fit=crop&q=80&w=2670",
  //     images: [
  //       "https://images.unsplash.com/photo-1591369822096-2241b71d6fbb?auto=format&fit=crop&q=80&w=2670",
  //       "https://images.unsplash.com/photo-1551028719-0c1e984b80a4?auto=format&fit=crop&q=80&w=2670",
  //     ],
  //     category: "Outerwear",
  //     occasion: "Casual",
  //     size: "S",
  //     user: "linea@rewear.com",
  //   },
  // ];

  let listings = [
    {
      id: 1,
      title: "Ivory Embroidered Lehenga",
      brand: "Saanjh Couture",
      rentalPrice: 110,
      buyPrice: 850,
      image:
        "https://images.pexels.com/photos/33343580/pexels-photo-33343580.jpeg",
      images: [
        "https://images.pexels.com/photos/33343580/pexels-photo-33343580.jpeg",
        "https://images.pexels.com/photos/33343580/pexels-photo-33343580.jpeg"
      ],
      category: "Traditional",
      occasion: "Wedding",
      size: "M",
      user: "boutique@rewear.com",
    },
    {
      id: 2,
      title: "Charcoal Three-Piece Suit",
      brand: "Sartoria Roma",
      rentalPrice: 55,
      buyPrice: 420,
      image:
        "https://images.pexels.com/photos/13191614/pexels-photo-13191614.jpeg",
      images: [
        "https://images.pexels.com/photos/13191614/pexels-photo-13191614.jpeg",
      ],
      category: "Suit",
      occasion: "Formal",
      size: "L",
      user: "sartoria@rewear.com",
    },
    {
      id: 3,
      title: "Burgundy Velvet Tuxedo",
      brand: "Notch & Co",
      rentalPrice: 60,
      buyPrice: 1100,
      image:
        "https://images.pexels.com/photos/5922737/pexels-photo-5922737.jpeg",
      images: [
        "https://images.pexels.com/photos/5922737/pexels-photo-5922737.jpeg",
        "https://images.pexels.com/photos/5922737/pexels-photo-5922737.jpeg",
      ],
      category: "Suit",
      occasion: "Party",
      size: "M",
      user: "notchandco@rewear.com",
    },
    {
      id: 4,
      title: "Black Crepe Blazer",
      brand: "Linea",
      rentalPrice: 22,
      buyPrice: 140,
      image:
        "https://images.pexels.com/photos/14622358/pexels-photo-14622358.jpeg",
      images: [
        "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1551028719-0c1e984b80a4?auto=format&fit=crop&q=80&w=2670",
      ],
      category: "Outerwear",
      occasion: "Casual",
      size: "S",
      user: "linea@rewear.com",
    },
    {
      id: 5,
      title: "Midnight Blue Silk Saree",
      brand: "Heritage Weaves",
      rentalPrice: 85,
      buyPrice: 650,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Traditional",
      occasion: "Formal",
      size: "Free",
      user: "heritage@rewear.com",
    },
    {
      id: 6,
      title: "Emerald Cocktail Dress",
      brand: "Vera Wang",
      rentalPrice: 45,
      buyPrice: 580,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Dress",
      occasion: "Party",
      size: "M",
      user: "boutique@rewear.com",
    },
    {
      id: 7,
      title: "Tan Leather Trench",
      brand: "Ralph Lauren",
      rentalPrice: 40,
      buyPrice: 890,
      image: "https://images.pexels.com/photos/19169223/pexels-photo-19169223.jpeg",
      images: [
        "https://images.pexels.com/photos/19169223/pexels-photo-19169223.jpeg"
      ],
      category: "Outerwear",
      occasion: "Casual",
      size: "L",
      user: "sartoria@rewear.com",
    },
    {
      id: 8,
      title: "Black Slim Tuxedo",
      brand: "Hugo Boss",
      rentalPrice: 70,
      buyPrice: 1200,
      image: "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=2670",
        "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Suit",
      occasion: "Formal",
      size: "XL",
      user: "sartoria@rewear.com",
    },
    {
      id: 9,
      title: "Floral Silk Anarkali",
      brand: "Biba Luxe",
      rentalPrice: 35,
      buyPrice: 280,
      image: "https://images.pexels.com/photos/28851457/pexels-photo-28851457.jpeg",
      images: [
        "https://images.pexels.com/photos/28851457/pexels-photo-28851457.jpeg"
      ],
      category: "Traditional",
      occasion: "Party",
      size: "S",
      user: "heritage@rewear.com",
    },
    {
      id: 10,
      title: "Charcoal Wool Overcoat",
      brand: "Burberry",
      rentalPrice: 90,
      buyPrice: 2100,
      image: "https://images.pexels.com/photos/6514828/pexels-photo-6514828.jpeg",
      images: [
        "https://images.pexels.com/photos/6514828/pexels-photo-6514828.jpeg"
      ],
      category: "Outerwear",
      occasion: "Formal",
      size: "L",
      user: "sartoria@rewear.com",
    },
    {
      id: 11,
      title: "Velvet Royal Sherwani",
      brand: "Manish Malhotra",
      rentalPrice: 150,
      buyPrice: 2500,
      image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Traditional",
      occasion: "Wedding",
      size: "M",
      user: "heritage@rewear.com",
    },
    {
      id: 12,
      title: "White Linen Dress",
      brand: "Zimmermann",
      rentalPrice: 50,
      buyPrice: 620,
      image: "https://images.pexels.com/photos/18682273/pexels-photo-18682273.jpeg",
      images: [
        "https://images.pexels.com/photos/18682273/pexels-photo-18682273.jpeg"
      ],
      category: "Dress",
      occasion: "Casual",
      size: "S",
      user: "boutique@rewear.com",
    },
    {
      id: 13,
      title: "Gold Sequin Mini",
      brand: "Balmain",
      rentalPrice: 120,
      buyPrice: 3200,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Dress",
      occasion: "Party",
      size: "XS",
      user: "boutique@rewear.com",
    },
    {
      id: 14,
      title: "Navy Pinstripe Suit",
      brand: "Armani",
      rentalPrice: 80,
      buyPrice: 1800,
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Suit",
      occasion: "Formal",
      size: "M",
      user: "sartoria@rewear.com",
    },
    {
      id: 15,
      title: "Ruby Silk Saree",
      brand: "Sabyasachi",
      rentalPrice: 200,
      buyPrice: 3500,
      image: "https://images.pexels.com/photos/32397666/pexels-photo-32397666.jpeg",
      images: [
        "https://images.pexels.com/photos/32397666/pexels-photo-32397666.jpeg"
      ],
      category: "Traditional",
      occasion: "Wedding",
      size: "Free",
      user: "heritage@rewear.com",
    },
    {
      id: 16,
      title: "Cashmere Crewneck",
      brand: "Loro Piana",
      rentalPrice: 55,
      buyPrice: 950,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Knitwear",
      occasion: "Casual",
      size: "L",
      user: "sartoria@rewear.com",
    },
    {
      id: 17,
      title: "Pastel Pink Lehenga",
      brand: "Anita Dongre",
      rentalPrice: 130,
      buyPrice: 2200,
      image: "https://images.pexels.com/photos/13031589/pexels-photo-13031589.jpeg",
      images: [
        "https://images.pexels.com/photos/13031589/pexels-photo-13031589.jpeg"
      ],
      category: "Traditional",
      occasion: "Wedding",
      size: "M",
      user: "heritage@rewear.com",
    },
    {
      id: 18,
      title: "Distressed Denim Jacket",
      brand: "Levis Vintage",
      rentalPrice: 15,
      buyPrice: 120,
      image: "https://images.pexels.com/photos/19309948/pexels-photo-19309948.jpeg",
      images: [
        "https://images.pexels.com/photos/19309948/pexels-photo-19309948.jpeg",
        "https://images.pexels.com/photos/19309948/pexels-photo-19309948.jpeg",
        "https://images.pexels.com/photos/19309948/pexels-photo-19309948.jpeg"
      ],
      category: "Outerwear",
      occasion: "Casual",
      size: "L",
      user: "linea@rewear.com",
    },
    {
      id: 19,
      title: "Silk Kimono Robe",
      brand: "Vintage Kyoto",
      rentalPrice: 30,
      buyPrice: 450,
      image: "https://images.pexels.com/photos/16612607/pexels-photo-16612607.jpeg",
      images: [
        "https://images.pexels.com/photos/16612607/pexels-photo-16612607.jpeg"
      ],
      category: "Loungewear",
      occasion: "Casual",
      size: "Free",
      user: "boutique@rewear.com",
    },
    {
      id: 20,
      title: "Tweed Chanel Jacket",
      brand: "Chanel",
      rentalPrice: 180,
      buyPrice: 4500,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Outerwear",
      occasion: "Formal",
      size: "S",
      user: "sartoria@rewear.com",
    },
    {
      id: 21,
      title: "Satin Slip Dress",
      brand: "La Perla",
      rentalPrice: 40,
      buyPrice: 320,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2670",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2670"
      ],
      category: "Dress",
      occasion: "Party",
      size: "S",
      user: "boutique@rewear.com",
    },
  ];
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
    const name = email.split("@")[0];
    const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "1d" });
    res.json({ token, user: { name, email } });
  });

  app.get("/api/listings", (req, res) => {
    res.json(listings);
  });

  app.get("/api/listings/:id", (req, res) => {
    const listing = listings.find((l) => l.id === parseInt(req.params.id));
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.get("/api/user/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const userListings = listings.filter((l) => l.user === decoded.email);
      res.json({
        earnings: userListings.length > 0 ? 125.0 : 0,
        listings: userListings,
        pendingOrders: userListings.length > 0 ? 1 : 0,
        completed: userListings.length > 0 ? 3 : 0,
      });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/listings", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const newListing = { id: Date.now(), ...req.body, user: decoded.email };
      listings.push(newListing);
      res.json(newListing);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.post("/api/messages", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const { listingId, text } = req.body;
      const listing = listings.find((l) => l.id === parseInt(listingId));

      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      const newMessage = {
        id: Date.now(),
        listingId: parseInt(listingId),
        senderEmail: decoded.email,
        ownerEmail: listing.user,
        text,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      res.json(newMessage);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.get("/api/messages", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const userMessages = messages.filter(
        (m) =>
          m.senderEmail === decoded.email || m.ownerEmail === decoded.email,
      );
      res.json(userMessages);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.get("/api/listings/:id/reviews", (req, res) => {
    const listingId = parseInt(req.params.id);
    const listingReviews = reviews.filter((r) => r.listingId === listingId);
    res.json(listingReviews);
  });

  app.post("/api/listings/:id/reviews", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const listingId = parseInt(req.params.id);

      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ error: "Valid rating (1-5) is required" });
      }

      const newReview = {
        id: Date.now(),
        listingId,
        userName: decoded.name,
        rating,
        comment,
        date: new Date().toISOString(),
      };

      reviews.push(newReview);
      res.json(newReview);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // Deprecated UI serving from backend (Frontend runs separately now)
  const distPath = path.join(process.cwd(), "../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
