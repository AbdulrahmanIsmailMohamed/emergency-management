import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Successful connection");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err; // Throw the error for the calling code to handle
    });
};
