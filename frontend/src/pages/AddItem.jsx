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

const [image, setImage] = useState(null);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

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

try {
await axios.post(
  "http://localhost:8000/api/items",
  data
);

  alert("Item Reported Successfully!");

  navigate("/");
} catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);

  alert(
    JSON.stringify(err.response?.data)
  );
}

};

return (
<div style={{ padding: "20px" }}>
Report Lost Item

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
      required
    />

    <br /><br />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleChange}
      required
    />

    <br /><br />

    <input
      type="text"
      name="location"
      placeholder="Location"
      value={formData.location}
      onChange={handleChange}
      required
    />

    <br /><br />

    <input
      type="email"
      name="contactEmail"
      placeholder="Email"
      value={formData.contactEmail}
      onChange={handleChange}
      required
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

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setImage(e.target.files[0])
      }
    />

    <br /><br />

    <button type="submit">
      Submit Report
    </button>
  </form>
</div>

);
}

export default AddItem;