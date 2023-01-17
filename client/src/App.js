import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import List from "./pages/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
