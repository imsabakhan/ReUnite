console.log("API_URL FROM CONFIG:", API_URL);

import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch items
  const fetchItems = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/items`);

      setItems(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ? true : item.status === filter;

    return matchSearch && matchFilter;
  });

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading items...</p>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <img src="/logo.png" alt="ReUnite Logo" className="logo" />
          <h2>ReUnite</h2>
        </div>
      <div className="nav-links">
  <Link to="/">Home</Link>

  <Link to="/add">
    Report Item
  </Link>

  <Link to="/admin">
    Admin
  </Link>
  
  <Link to="/register">
  Register
</Link>
</div>
      </nav>


      {/* Main Container */}
      <div className="container">
        <div className="header">
          <h1>ReUnite</h1>
          <p>Lost Something? ReUnite Helps You Find It.</p>
          <p>Connecting lost belongings with their rightful owners.</p>
        </div>

        <Link to="/add">
          <button>➕ Report Lost Item</button>
        </Link>

        <hr />

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {/* Filter */}
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("lost")}>Lost</button>
          <button onClick={() => setFilter("found")}>Found</button>
        </div>

        <h2>Recent Reports</h2>

        <div className="items-grid">
          {filteredItems.length === 0 ? (
            <p>No items found</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="card">
                <Link
                  to={`/item/${item._id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="item-image"
                      loading="lazy"
                    />
                  )}

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>📍 {item.location}</p>
                </Link>

                <div className="status-container">
                  <span
                    className={`status-badge ${
                      item.status === "lost"
                        ? "lost-badge"
                        : "found-badge"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div className="action-buttons">
                  <a href={`mailto:${item.contactEmail}`}>
                    <button className="contact-btn">📧 Contact</button>
                  </a>

                  <Link to={`/edit/${item._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;