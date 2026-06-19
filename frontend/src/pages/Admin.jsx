import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "../styles/Admin.css";

function Admin() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // ✅ Admin protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Fetch items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ GET TOKEN INSIDE FUNCTIONS (important fix)
  const getToken = () => localStorage.getItem("token");

  // ✅ MARK AS FOUND
  const markAsFound = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/items/${id}/found`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE (FIXED - THIS WAS MISSING)
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this item?");
      if (!confirmDelete) return;

      await axios.delete(`${API_URL}/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="stats">
        <div className="stat-card total-card">
          <h3>Total Reports</h3>
          <p>{items.length}</p>
        </div>

        <div className="stat-card lost-card">
          <h3>Lost Items</h3>
          <p>{items.filter(i => i.status === "lost").length}</p>
        </div>

        <div className="stat-card found-card">
          <h3>Found Items</h3>
          <p>{items.filter(i => i.status === "found").length}</p>
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
                  onClick={() => markAsFound(item._id)}
                >
                  ✓ Found
                </button>

                <button
                  className="admin-delete"
                  onClick={() => handleDelete(item._id)}
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