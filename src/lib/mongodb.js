import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Reuse connection across hot reloads in dev
let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null };
}

export default async function connectDB() {
  // Already connected
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Avoid multiple concurrent connects
  if (mongoose.connection.readyState === 2) {
    // connecting
    return cached.conn ?? mongoose.connection;
  }

  const isSrv = MONGODB_URI.startsWith('mongodb+srv://');

  // Establish a new connection
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // Reduce perceived hangs
      serverSelectionTimeoutMS: 7000,
      connectTimeoutMS: 7000,
      socketTimeoutMS: 12000,
      maxPoolSize: 5,
      retryWrites: true,
      // Prefer IPv4 to avoid some DNS/SRV resolver issues
      family: 4,
      appName: 'cards-of-curiosity'
    });
    cached.conn = conn;

    if (isSrv) {
      console.log('Connected to MongoDB via SRV.');
    } else {
      console.log('Connected to MongoDB via standard connection string.');
    }

    return conn;
  } catch (e) {
    const msg = e?.message || 'Unknown MongoDB connection error';
    console.error('MongoDB connect error:', msg);
    throw e;
  }
}

