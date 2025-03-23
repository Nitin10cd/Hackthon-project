import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error(` Error Occurred: ${err.message}`);
    process.exit(1); 
  }
};

export default connectDb;
