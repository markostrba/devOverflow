import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { dbName: "devflow" })
      .then((result) => {
        console.log("MongoDB connected");
        return result;
      })
      .catch((err) => {
        console.error("MongoDB connection error", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
