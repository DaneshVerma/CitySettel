const mongoose = require("mongoose");
const Listing = require("./src/models/listing.model");
const Combo = require("./src/models/combo.model");
const { dbUrl } = require("./src/config/environments/config");

const listings = [
  {
    name: "Green Valley PG",
    type: "accommodation",
    description: "Comfortable PG accommodation with all modern amenities",
    price: 6000,
    images: [
      "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?w=400",
    ],
    location: {
      address: "Andheri West",
      city: "Mumbai",
      coordinates: { latitude: 19.1136, longitude: 72.8697 },
      distance: 2.3,
    },
    rating: 4.5,
    reviewCount: 128,
    amenities: ["WiFi", "AC", "Meals", "Laundry"],
    availability: true,
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@example.com",
    },
    accommodationDetails: {
      roomType: "Shared",
      capacity: 3,
      gender: "male",
      meals: true,
    },
  },
  {
    name: "Home Style Tiffin Service",
    type: "food",
    description: "Healthy home-cooked meals delivered daily",
    price: 2000,
    images: [
      "https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?w=400",
    ],
    location: {
      address: "Andheri East",
      city: "Mumbai",
      coordinates: { latitude: 19.1197, longitude: 72.8464 },
      distance: 1.5,
    },
    rating: 4.8,
    reviewCount: 256,
    amenities: ["Breakfast", "Lunch", "Dinner", "Delivery"],
    availability: true,
    owner: {
      name: "Priya Sharma",
      phone: "+91 98123 45678",
      email: "priya@example.com",
    },
    foodDetails: {
      cuisine: ["North Indian", "South Indian"],
      mealType: ["breakfast", "lunch", "dinner"],
      deliveryAvailable: true,
    },
  },
  {
    name: "FitZone Gym",
    type: "gym",
    description: "Well-equipped gym with professional trainers",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1632077804406-188472f1a810?w=400",
    ],
    location: {
      address: "Andheri West",
      city: "Mumbai",
      coordinates: { latitude: 19.1136, longitude: 72.8397 },
      distance: 0.8,
    },
    rating: 4.6,
    reviewCount: 89,
    amenities: ["Cardio", "Weights", "Trainer", "Locker"],
    availability: true,
    owner: {
      name: "Amit Patel",
      phone: "+91 98456 78901",
      email: "amit@example.com",
    },
    gymDetails: {
      equipment: ["Treadmill", "Dumbbells", "Bench Press", "Rowing Machine"],
      trainers: true,
      timings: "6 AM - 10 PM",
    },
  },
  {
    name: "Sunrise Hostel",
    type: "accommodation",
    description: "Budget-friendly hostel for students",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1549881567-c622c1080d78?w=400"],
    location: {
      address: "Bandra West",
      city: "Mumbai",
      coordinates: { latitude: 19.0596, longitude: 72.8295 },
      distance: 3.2,
    },
    rating: 4.3,
    reviewCount: 67,
    amenities: ["WiFi", "Study Room", "Common Kitchen"],
    availability: true,
    owner: {
      name: "Sanjay Verma",
      phone: "+91 98234 56789",
      email: "sanjay@example.com",
    },
    accommodationDetails: {
      roomType: "Shared",
      capacity: 4,
      gender: "any",
      meals: false,
    },
  },
  {
    name: "Mumbai Tiffin Express",
    type: "food",
    description: "Traditional Mumbai style tiffin service",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400",
    ],
    location: {
      address: "Bandra East",
      city: "Mumbai",
      coordinates: { latitude: 19.0544, longitude: 72.8407 },
      distance: 2.8,
    },
    rating: 4.7,
    reviewCount: 198,
    amenities: ["Lunch", "Dinner", "Vegetarian Options"],
    availability: true,
    owner: {
      name: "Meera Desai",
      phone: "+91 98567 89012",
      email: "meera@example.com",
    },
    foodDetails: {
      cuisine: ["Maharashtrian", "Gujarati"],
      mealType: ["lunch", "dinner"],
      deliveryAvailable: true,
    },
  },
  {
    name: "PowerFit Gym",
    type: "gym",
    description: "Premium gym with modern equipment",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400",
    ],
    location: {
      address: "Malad West",
      city: "Mumbai",
      coordinates: { latitude: 19.1864, longitude: 72.8343 },
      distance: 5.2,
    },
    rating: 4.9,
    reviewCount: 142,
    amenities: ["Cardio", "Weights", "Yoga", "Zumba", "Trainer"],
    availability: true,
    owner: {
      name: "Rahul Singh",
      phone: "+91 98678 90123",
      email: "rahul@example.com",
    },
    gymDetails: {
      equipment: ["Cross Trainer", "Smith Machine", "Cable Machine", "Cycle"],
      trainers: true,
      timings: "5 AM - 11 PM",
    },
  },
];

const combos = [
  {
    title: "Student Starter Pack",
    description: "PG Stay + Daily Meals + Gym - Perfect for students",
    price: 9800,
    originalPrice: 10300,
    discount: 5,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1549881567-c622c1080d78?w=400",
    location: {
      city: "Mumbai",
      area: "Andheri",
    },
    rating: 4.5,
    reviewCount: 89,
    availability: true,
  },
  {
    title: "Professional Essentials",
    description: "1BHK + Meals + Fitness Center - For working professionals",
    price: 15500,
    originalPrice: 17000,
    discount: 9,
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?w=400",
    location: {
      city: "Mumbai",
      area: "Bandra",
    },
    rating: 4.7,
    reviewCount: 124,
    availability: true,
  },
  {
    title: "Budget Friendly",
    description: "Shared Room + Tiffin Service - Save more",
    price: 6500,
    originalPrice: 7500,
    discount: 13,
    image: "https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?w=400",
    location: {
      city: "Mumbai",
      area: "Andheri",
    },
    rating: 4.3,
    reviewCount: 56,
    availability: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to database");

    // Clear existing data
    await Listing.deleteMany({});
    await Combo.deleteMany({});
    console.log("Cleared existing data");

    // Insert listings
    const createdListings = await Listing.insertMany(listings);
    console.log(`Inserted ${createdListings.length} listings`);

    // Insert combos
    const createdCombos = await Combo.insertMany(combos);
    console.log(`Inserted ${createdCombos.length} combos`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
