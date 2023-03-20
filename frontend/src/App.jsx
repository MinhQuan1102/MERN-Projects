import "./App.css";
import { Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Product from "./pages/Product/Product"
import Cart from "./pages/Cart/Cart";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="appBody">
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/account/profile" component={UpdateProfile} />
        <Route path="/account/password" component={UpdatePassword} />
      
      </div>
    </div>
  );
}

export default App;
