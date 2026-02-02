const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  customerName: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent model overwrite error
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
