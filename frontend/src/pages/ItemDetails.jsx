import API_URL from "../config";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/items/${id}`);
      setItem(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

const markAsFound = async () => {
  try {
    const res = await axios.put(
      `${API_URL}/api/items/${id}/found`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItem(res.data);
    alert("Item marked as found");
  } catch (err) {
    console.log(err);
  }
};

  if (loading || !item) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <Link to="/">Back</Link>

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
            item.status === "lost" ? "lost-badge" : "found-badge"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      </p>

      <a href={`mailto:${item.contactEmail}`}>
        <button className="contact-btn">
          Contact Owner
        </button>
      </a>

      {user && user.role === "admin" && item.status === "lost" && (
        <button
          onClick={markAsFound}
          style={{
            marginLeft: "10px",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Mark as Found
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