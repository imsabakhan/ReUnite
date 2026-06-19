import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddItem />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route
  path="/admin"
  element={<Admin />}
/>
      <Route
  path="/edit/:id"
  element={<EditItem />}
/>
<Route
  path="/register"
  element={<Register />}
/>
    </Routes>
  );
}

export default App;