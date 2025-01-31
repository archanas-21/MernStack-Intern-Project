import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    coffeeItems: [{ coffeeType: '', size: '', quantity: 1, price: 0 }],
    paymentMethod: 'Cash',
  });

  const coffeeMenu = {
    Espresso: { small: 150, medium: 200, large: 250 },
    Latte: { small: 180, medium: 230, large: 280 },
    Cappuccino: { small: 200, medium: 250, large: 300 },
  };

  const handleCoffeeItemChange = (e, index) => {
    const { name, value } = e.target;
    const newCoffeeItems = [...formData.coffeeItems];
    newCoffeeItems[index][name] = value;

    if (name === 'coffeeType' || name === 'size' || name === 'quantity') {
      newCoffeeItems[index].price = calculatePrice(newCoffeeItems[index]);
    }

    setFormData({ ...formData, coffeeItems: newCoffeeItems });
  };

  const calculatePrice = (coffeeItem) => {
    const { coffeeType, size, quantity } = coffeeItem;
    return coffeeMenu[coffeeType]?.[size] * quantity || 0;
  };

  const addCoffeeItem = () => {
    setFormData({
      ...formData,
      coffeeItems: [
        ...formData.coffeeItems,
        { coffeeType: '', size: '', quantity: 1, price: 0 },
      ],
    });
  };

  const removeCoffeeItem = (index) => {
    const newCoffeeItems = formData.coffeeItems.filter((_, i) => i !== index);
    setFormData({ ...formData, coffeeItems: newCoffeeItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      alert('Order placed successfully');
      setFormData({
        customerName: '',
        coffeeItems: [{ coffeeType: '', size: '', quantity: 1, price: 0 }],
        paymentMethod: 'Cash',
      });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h3>Place New Order</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          required
        />
        {formData.coffeeItems.map((coffeeItem, index) => (
          <div key={index}>
            <select
              name="coffeeType"
              value={coffeeItem.coffeeType}
              onChange={(e) => handleCoffeeItemChange(e, index)}
              required
            >
              <option value="">Select Coffee Type</option>
              <option value="Espresso">Espresso</option>
              <option value="Latte">Latte</option>
              <option value="Cappuccino">Cappuccino</option>
            </select>

            <select
              name="size"
              value={coffeeItem.size}
              onChange={(e) => handleCoffeeItemChange(e, index)}
              required
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>

            <input
              type="number"
              name="quantity"
              value={coffeeItem.quantity}
              onChange={(e) => handleCoffeeItemChange(e, index)}
              required
              min="1"
            />

            <input
              type="number"
              name="price"
              value={coffeeItem.price}
              readOnly
              disabled
            />

            <button type="button" onClick={() => removeCoffeeItem(index)}>Remove Item</button>
          </div>
        ))}

        <button type="button" onClick={addCoffeeItem}>Add Another Coffee</button>
        <br />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          required
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
