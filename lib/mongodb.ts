import mongoose from "mongoose";

// Extend the global type to include mongoose
declare global {
  var mongoose: {
    conn: any;
    promise: any;
  } | undefined;
}

// Use default MongoDB URI if not set (for development only)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shree-laxmi-finance";

// Check for MongoDB URI with better error handling
if (!process.env.MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI environment variable is not set. Using default local MongoDB.");
  console.warn("📝 Please create a .env.local file with your MongoDB connection string for production.");
  console.warn("Example: MONGODB_URI=mongodb://localhost:27017/shree-laxmi-finance");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Ensure cached is defined
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }
  
  try {
    const conn = await cached.promise;
    cached.conn = conn;
    console.log("✅ MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error("💡 Make sure MongoDB is running locally or set MONGODB_URI in .env.local");
    throw error; // Re-throw to handle in the calling route
  }
}

export default dbConnect;