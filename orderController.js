const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, coffeeItems, paymentMethod } = req.body;
    const order = new Order({ customerName, coffeeItems, paymentMethod });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an order (PUT)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, coffeeItems, paymentMethod } = req.body;
    
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      customerName,
      coffeeItems,
      paymentMethod,
    }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order (DELETE)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
