import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";


// export const PORT = process.env.PORT || 4001;
// export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/juniordb";
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI,{
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
    console.log("Mongodb is connected to:", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};