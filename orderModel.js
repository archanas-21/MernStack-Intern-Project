const mongoose = require('mongoose');

const coffeeItemSchema = new mongoose.Schema({
  coffeeType: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  coffeeItems: [coffeeItemSchema],
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
