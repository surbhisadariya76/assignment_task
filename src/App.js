import React, { useState, useEffect } from 'react';
import ItemForm from './Components/ItemForm';
import ItemList from './Components/ItemList';
import Login from './Components/Login';

const fakeItemsAPI = {
  items: [
    { _id: '1', firstName: 'surbhi', lastName: 'Patel' },
    { _id: '2', firstName: 'Parv', lastName: 'Patel' },
  ],
  getItems: () => Promise.resolve({ data: fakeItemsAPI.items }),
  addItem: (item) => {
    const newItem = { _id: Date.now().toString(), ...item };
    fakeItemsAPI.items = [...fakeItemsAPI.items, newItem]; // Create a new array with the new item
    return Promise.resolve({ data: newItem });
  },
  updateItem: (id, updatedItem) => {
    const index = fakeItemsAPI.items.findIndex((item) => item._id === id);
    fakeItemsAPI.items[index] = { ...fakeItemsAPI.items[index], ...updatedItem };
    return Promise.resolve({ data: fakeItemsAPI.items[index] });
  },
  deleteItem: (id) => {
    fakeItemsAPI.items = fakeItemsAPI.items.filter((item) => item._id !== id);
    return Promise.resolve();
  },
};


const fakeAuthAPI = {
  login: (authData) => {
    if (authData.email === 'surbhi@gmail.com' && authData.password === 'password') {
      return Promise.resolve({ data: { token: 'fake-jwt-token' } });
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  },
};

const App = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      fakeItemsAPI
        .getItems()
        .then((response) => setItems(response.data))
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleAddOrUpdate = (formData) => {
    if (isEditing) {
      fakeItemsAPI
        .updateItem(editId, formData)
        .then((response) => {
          setItems((prev) => prev.map((item) => (item._id === editId ? response.data : item)));
          setIsEditing(false);
          setEditId(null);
        })
        .catch((error) => console.error(error));
    } else {
      fakeItemsAPI
        .addItem(formData)
        .then((response) => setItems((prev) => [...prev, response.data]))
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (id) => {
    fakeItemsAPI
      .deleteItem(id)
      .then(() => setItems((prev) => prev.filter((item) => item._id !== id)))
      .catch((error) => console.error(error));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
  };

  const handleLogin = (authData) => {
    fakeAuthAPI
      .login(authData)
      .then((response) => setToken(response.data.token))
      .catch((error) => console.error(error));
  };

  return (
    <div className='container text-center my-5'>
      <h1>CRUD Application</h1>

      {!token && <Login onLogin={handleLogin} />}

      {token && (
        <>
          <ItemForm
            onSubmit={handleAddOrUpdate}
            isEditing={isEditing}
            editId={editId}
            token={token}
          />

          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default App;
