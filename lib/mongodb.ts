import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (!uri) {
  // Safe fallback to prevent Next.js build-time static evaluation crash when MONGODB_URL is absent
  console.warn("⚠️ Warning: MONGODB_URL environment variable is missing.");
  client = new MongoClient("mongodb://localhost:27017/cinelist_fallback");
} else {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri);
    }
    client = global._mongoClient;
  } else {
    client = new MongoClient(uri);
  }
}

export const mongoClient = client;
export const mongoDb = client.db("cinelist");
export default mongoClient;
