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
        `http://localhost:8000/api/items/${id}`
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
        <strong>Description:</strong>
        {" "}
        {item.description}
      </p>

      <p>
        <strong>Category:</strong>
        {" "}
        {item.category}
      </p>

      <p>
        <strong>Location:</strong>
        {" "}
        {item.location}
      </p>

      <p>
        <strong>Status:</strong>
        {" "}
        {item.status}
      </p>

      <p>
        <strong>Contact:</strong>
        {" "}
        {item.contactEmail}
      </p>
    </div>
  );
}

export default ItemDetails;