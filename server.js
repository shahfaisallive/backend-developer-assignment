import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import connectToDatabase from "./config/db.config.js";

// express and cors integration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Serving static files
app.use(express.static("client"));

// Serving Routes
app.use("/api", router);
app.get("/payment-form", (req, res) => {
  res.sendFile("PaymentForm.html", { root: "./client" });
});

// server initialization
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  connectToDatabase();
  console.log("Server is running on Port: " + PORT);
});
