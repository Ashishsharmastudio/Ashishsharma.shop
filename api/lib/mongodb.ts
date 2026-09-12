import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';

dotenv.config();

// Temporary DNS workaround.
// Your system/ISP IPv6 DNS is timing out when resolving MongoDB SRV records.
// 8.8.8.8 has already been verified to resolve your MongoDB SRV record.
dns.setServers(['8.8.8.8']);

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn(
    'Warning: MONGODB_URI is not defined in environment variables.'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    cached!.promise = null;
    throw error;
  }

  return cached!.conn;
}

export default dbConnect;