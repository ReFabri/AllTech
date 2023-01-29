import express from "express";
const app = express();
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
dotenv.config();

mongoose.set("strictQuery", false);
connectDB();

console.log(
  `To destroy all DB data call this script with the "-d" argument`.yellow
);
console.log(
  `or use `.yellow,
  `"npm run data:import"`.green,
  `or`.yellow,
  `"npm run data:destroy"`.red
);

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported to DB.".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data REMOVED from DB.".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
