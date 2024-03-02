import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const MONGODB_URL = process.env.MONGODB_URL;
const connectToDatabase = async () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Server connected to Database");
    })
    .catch((err) => {
      console.log("ERRR! Connection to Database failed to established");
      console.log(err);
    });
};

export default connectToDatabase;
