import dns from "node:dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const globalMongoose = globalThis;

if (!globalMongoose.__mongooseCache) {
  globalMongoose.__mongooseCache = {
    connection: null,
    promise: null,
  };
}

const cache = globalMongoose.__mongooseCache;

export async function connectToDatabase() {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB || undefined,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cache.connection = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw new Error(`Database connection failed: ${error.message}`);
  }

  return cache.connection;
}
