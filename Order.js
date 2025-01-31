const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  coffeeItems: [
    {
      coffeeType: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  paymentMethod: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
