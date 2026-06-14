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

  if (!item) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ⬅ Back to Home
      </Link>

      <div className="card details-card">
        <h1>{item.title}</h1>

        <p>
          <strong>Description:</strong>{" "}
          {item.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {item.category}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          📍 {item.location}
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

        <p>
          <strong>Reported On:</strong>{" "}
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "N/A"}
        </p>

        <a href={`mailto:${item.contactEmail}`}>
          <button className="contact-btn">
            📧 Contact Owner
          </button>
        </a>
      </div>
    </div>
  );
}

export default ItemDetails;