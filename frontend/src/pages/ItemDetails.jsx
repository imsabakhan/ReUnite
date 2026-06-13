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
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back</Link>

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
        {item.location}
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
        <strong>Contact:</strong>{" "}
        {item.contactEmail}
      </p>

      <p>
        <strong>Reported On:</strong>{" "}
        {new Date(
          item.createdAt
        ).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ItemDetails;