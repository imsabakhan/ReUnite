import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await axios.get(
        `https://reunite-j7qe.onrender.com/api/items/${id}`
      );

      setItem(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsFound = async () => {
    try {
      const res = await axios.put(
        `https://reunite-j7qe.onrender.com/api/items/${id}/found`
      );

      setItem(res.data);

      alert("✅ Item marked as found!");
    } catch (err) {
      console.log(err);
      alert("Failed to update item");
    }
  };

  if (!item) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <Link to="/">⬅ Back</Link>

      <h1>{item.title}</h1>

      <p>
        <strong>Description:</strong> {item.description}
      </p>

      <p>
        <strong>Category:</strong> {item.category}
      </p>

      <p>
        <strong>Location:</strong> {item.location}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`status-badge ${
            item.status === "lost"
              ? "lost-badge"
              : "found-badge"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      </p>

      <a href={`mailto:${item.contactEmail}`}>
        <button className="contact-btn">
          📧 Contact Owner
        </button>
      </a>

      {" "}

      {item.status === "lost" && (
        <button
          onClick={markAsFound}
          style={{
            marginLeft: "10px",
            backgroundColor: "#22c55e"
          }}
        >
          ✅ Mark as Found
        </button>
      )}

      <p>
        <strong>Reported On:</strong>{" "}
        {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ItemDetails;