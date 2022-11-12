import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4001;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/juniordb";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
