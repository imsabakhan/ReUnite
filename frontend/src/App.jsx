import { Routes, Route } from "react-router-dom";
import ItemDetails from "./pages/ItemDetails";
import Home from "./pages/home";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddItem />} />
      <Route path="/items/:id" element={<ItemDetails />} />
    </Routes>
  );
}

export default App;