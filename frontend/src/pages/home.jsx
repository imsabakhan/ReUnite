import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  console.log("Home component rendered");

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("useEffect running");
    fetchItems();
  }, []);

  const fetchItems = async () => {
    console.log("Fetching data from backend...");

    try {
      const res = await axios.get(
        "http://localhost:8000/api/items"
      );

      console.log("Response received:", res.data);

      setItems(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  console.log("Items state:", items);

  return (
    <div className="container">
      <div className="header">
        <h1>🎒 ReUnite</h1>
        <p>Lost Something? ReUnite Helps You Find It.</p>
      </div>

      <Link to="/add">
        <button>➕ Report Lost Item</button>
      </Link>

      <hr />

      <h2>Recent Reports</h2>

      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <p>📍 {item.location}</p>

           <p>
  Status:
  <strong
    style={{
      color: item.status === "lost" ? "red" : "green",
    }}
  >
    {" "}{item.status}
  </strong>
</p>

            <p>📧 {item.contactEmail}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;