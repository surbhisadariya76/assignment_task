import React from 'react';
import '../App.css'

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Users List</h2>
      {items.length > 0 ? (
        <ul className="space-y-4 list-group">
          {items.map((item) => (
            <li
              key={item._id}
              className="d-flex justify-content-center gap-2 items-center align-content-center  list-item p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200"
            >
              <div>
                <p className="text-lg font-medium">{item.firstName}</p>
              </div>
              <div>  <p className="text-gray-600">{item.lastName}</p></div>
            
              <div className="d-flex gap-2 ms-5 align-items-center">
                <button
                  onClick={() => onEdit(item)}
                  className="btn btn-success px-3 py-1 rounded-md text-white hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="btn btn-danger px-3 py-1 rounded-md text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ItemList;
