import express from "express";
const app = express();
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

mongoose.set("strictQuery", false);

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port ${PORT}`.yellow
      .bold
  );
});
