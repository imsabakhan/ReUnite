import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
    contactEmail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  await axios.post(
  "https://reunite-j7qe.onrender.com/api/items",
  formData
);

setFormData({
  title: "",
  description: "",
  category: "",
  location: "",
  status: "lost",
  contactEmail: "",
});

alert("Item Reported Successfully!");

navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error saving item");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Report Lost Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          value={formData.contactEmail}
          onChange={handleChange}
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
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default AddItem;