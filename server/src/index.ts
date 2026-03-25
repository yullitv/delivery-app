import express from "express";
import cors from "cors";
import "dotenv/config";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});