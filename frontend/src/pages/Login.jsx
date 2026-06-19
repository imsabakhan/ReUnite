import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../config";
import { useEffect } from "react";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
}, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${API_URL}/api/auth/login`,
      formData
    );

    login(res.data.user, res.data.token);

    alert("Login Successful!");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
  <div className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <Link to="/register">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;