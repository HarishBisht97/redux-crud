// App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from './actions';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = () => {
    dispatch(addItem(formData));
    setFormData({
      id: null,
      name: '',
      description: '',
      quantity: 0,
      price: 0,
    });
  };

  const handleEditItem = (id, updatedItem) => {
    dispatch(editItem(id, updatedItem));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </form>
      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() =>
                    handleEditItem(item.id, {
                      ...item,
                      name: prompt('Enter updated name:', item.name),
                      description: prompt('Enter updated description:', item.description),
                      quantity: parseInt(prompt('Enter updated quantity:', item.quantity), 10),
                      price: parseFloat(prompt('Enter updated price:', item.price)),
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
