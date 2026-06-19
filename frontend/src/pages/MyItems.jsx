import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { Link } from "react-router-dom";

function MyItems() {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/items/my-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMyItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>My Items</h1>

      <div className="items-grid">
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          items.map((item) => (
            <div className="card" key={item._id}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="item-image"
                />
              )}

              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.location}</p>

              <div className="status-container">
                <span
                  className={`status-badge ${
                    item.status === "lost"
                      ? "lost-badge"
                      : "found-badge"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="action-buttons">
               {user && (user.id === item.userId || user.role === "admin") && (
  <Link to={`/edit/${item._id}`}>
    <button className="edit-btn">Edit</button>
  </Link>
)}

               {user && (user.id === item.userId || user.role === "admin") && (
  <button
    className="delete-btn"
    onClick={() => handleDelete(item._id)}
  >
    Delete
  </button>
)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyItems;