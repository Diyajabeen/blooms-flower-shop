// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({ name: String, price: Number });
const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  address: String,
  deliveryDate: String
});
const Order = mongoose.model("Order", orderSchema);

// Routes
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/orders", async (req, res) => {
  const { items, total, address, deliveryDate } = req.body;
  const order = new Order({ items, total, address, deliveryDate });
  await order.save();
  res.json({ message: "Order placed successfully 🌸" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
