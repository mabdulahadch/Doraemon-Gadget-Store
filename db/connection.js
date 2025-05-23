import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB= async ()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected Successfully!");
    }catch{
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}


export default connectDB;