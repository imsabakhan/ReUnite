import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddItem />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
  );
}

export default App;