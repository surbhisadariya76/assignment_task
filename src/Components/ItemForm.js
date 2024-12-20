import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, isEditing, editId, token }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    if (isEditing && editId) {
      setFormData({ firstName: 'Sample First', lastName: 'Sample Last' }); 
    }
  }, [isEditing, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ firstName: '', lastName: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add User'}</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full p-2 mb-3 me-3 border rounded-md"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full p-2 mb-3 me-3 border rounded-md"
        required
      />
      <button
        type="submit"
        className="btn btn-primary px-5 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {isEditing ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default ItemForm;
