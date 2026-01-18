import mongoose from "mongoose";
const uri = "mongodb://127.0.0.1:27017/hospitalmanagement";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectDB;
