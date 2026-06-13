import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;