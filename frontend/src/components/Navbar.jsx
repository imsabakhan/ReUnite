import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="logo">
        Re<span>Unite</span>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">

        {/* Always visible */}
        <Link to="/">Home</Link>

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* USER ROLE */}
        {user && user.role === "user" && (
          <>
            <Link to="/add">Report Item</Link>
            <Link to="/my-items">My Items</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* ADMIN ROLE */}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/add">Report Item</Link>
            <Link to="/my-items">My Items</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;