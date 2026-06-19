import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
    contactEmail: "",
  });

  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/items/${id}`);

      const { title, description, category, location, status, contactEmail } = res.data;

      setFormData({
        title,
        description,
        category,
        location,
        status,
        contactEmail,
      });
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("status", formData.status);
      data.append("contactEmail", formData.contactEmail);

      if (image) {
        data.append("image", image);
      }

      await axios.put(`${API_URL}/api/items/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Item updated successfully!");
      navigate("/my-items");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error updating item");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br /><br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <br /><br />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditItem;