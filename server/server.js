import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import menuItemRoute from "./routes/menuItemRoute.js";
import orderRoute from "./routes/orderRoute.js";
import analyticsRoute from "./routes/analyticsRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuItemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/analytics", analyticsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the restaurant admin dashboard API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
