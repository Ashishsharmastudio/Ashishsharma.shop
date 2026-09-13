import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise:
    | Promise<typeof mongoose>
    | null;
}

declare global {
  var mongooseCache:
    | MongooseCache
    | undefined;
}

const cached =
  globalThis.mongooseCache ??
  {
    conn: null,
    promise: null,
  };

globalThis.mongooseCache =
  cached;

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined in environment variables.'
    );
  }

  if (!cached.promise) {
    cached.promise =
      mongoose.connect(
        MONGODB_URI,
        {
          bufferCommands: false,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000,
        }
      );
  }

  try {
    cached.conn =
      await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;