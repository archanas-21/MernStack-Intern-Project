const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

// Route to fetch all orders
router.get('/orders', getOrders);

// Route to create a new order
router.post('/orders', createOrder);

// Route to update an existing order
router.put('/orders/:id', updateOrder);

// Route to delete an order
router.delete('/orders/:id', deleteOrder);

module.exports = router;
