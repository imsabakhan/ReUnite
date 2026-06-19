import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyItems from "./pages/MyItems";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-items"
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;