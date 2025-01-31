import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editableOrder, setEditableOrder] = useState(null);

  // Fetch orders from the backend when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle order deletion
  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));  // Remove from state
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Function to handle order update
  const handleUpdateOrder = async () => {
    if (!editableOrder) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${editableOrder._id}`, editableOrder);
      const updatedOrders = orders.map(order =>
        order._id === editableOrder._id ? response.data : order
      );
      setOrders(updatedOrders);
      setEditableOrder(null);  // Clear the form
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <strong>{order.customerName}</strong>:
            {order.coffeeItems.map((item, index) => (
              <div key={index}>
                {item.coffeeType} ({item.size}) x {item.quantity} - ₹{item.price} | Payment: {order.paymentMethod}
              </div>
            ))}
            <button onClick={() => setEditableOrder(order)}>Edit</button>
            <button onClick={() => deleteOrder(order._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editableOrder && (
        <div>
          <h3>Edit Order</h3>
          <input
            type="text"
            value={editableOrder.customerName}
            onChange={(e) => setEditableOrder({ ...editableOrder, customerName: e.target.value })}
            placeholder="Customer Name"
          />
          {editableOrder.coffeeItems.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item.coffeeType}
                onChange={(e) => {
                  const newItems = [...editableOrder.coffeeItems];
                  newItems[index].coffeeType = e.target.value;
                  setEditableOrder({ ...editableOrder, coffeeItems: newItems });
                }}
                placeholder="Coffee Type"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...editableOrder.coffeeItems];
                  newItems[index].quantity = e.target.value;
                  setEditableOrder({ ...editableOrder, coffeeItems: newItems });
                }}
                placeholder="Quantity"
              />
            </div>
          ))}
          <button onClick={handleUpdateOrder}>Update Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
