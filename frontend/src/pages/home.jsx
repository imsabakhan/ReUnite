import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
const [items, setItems] = useState([]);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
     const res = await axios.get(
  "https://reunite-j7qe.onrender.com/api/items"
);

      setItems(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
  <img
    src="/logo.png"
    alt="ReUnite Logo"
    className="logo"
  />

  <h2>ReUnite</h2>
</div>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/add">
            Report Item
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

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {/* Filter Buttons */}
       <div className="filters">
  <button onClick={() => setFilter("all")}>
    All
  </button>

  <button onClick={() => setFilter("lost")}>
    Lost
  </button>

  <button onClick={() => setFilter("found")}>
    Found
  </button>
</div>

        <h2>Recent Reports</h2>

        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
         items
  .filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((item) =>
    filter === "all"
      ? true
      : item.status === filter
  )
 .map((item) => (
  <Link
    key={item._id}
    to={`/item/${item._id}`}
    style={{
      textDecoration: "none",
      color: "inherit"
    }}
  >
    <div className="card">
      <h3>{item.title}</h3>

      <p>{item.description}</p>

      <p>📍 {item.location}</p>

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

      <p>📧 {item.contactEmail}</p>
    </div>
  </Link>
))
        )}
      </div>
    </>
  );
}

export default Home;