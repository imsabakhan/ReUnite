import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../styles/Admin.css";

function Admin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/items`
      );

      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/items/${id}`
      );

      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  const markAsFound = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/items/${id}`,
        {
          status: "found",
        }
      );

      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <div className="stats">
        <div className="stat-card total-card">
          <h3>Total Reports</h3>
          <p>{items.length}</p>
        </div>

        <div className="stat-card lost-card">
          <h3>Lost Items</h3>
          <p>
            {
              items.filter(
                (item) =>
                  item.status === "lost"
              ).length
            }
          </p>
        </div>

        <div className="stat-card found-card">
          <h3>Found Items</h3>
          <p>
            {
              items.filter(
                (item) =>
                  item.status === "found"
              ).length
            }
          </p>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="admin-image"
                  />
                )}
              </td>

              <td>{item.title}</td>

              <td>
                <span
                  className={`admin-status ${
                    item.status === "lost"
                      ? "status-lost"
                      : "status-found"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="admin-actions">
                <button
                  className="admin-found"
                  onClick={() =>
                    markAsFound(item._id)
                  }
                >
                  ✓ Found
                </button>

                <button
                  className="admin-delete"
                  onClick={() =>
                    handleDelete(item._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;