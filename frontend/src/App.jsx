import "./App.css";
import { Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Customer/Navbar/Navbar";
import Footer from "./components/Customer/Footer/Footer";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import Checkout from "./pages/Checkout/Checkout";
import { useContext, useState } from "react";
import StoreAllProduct from "./components/Store/StoreAllProducts/StoreAllProducts";
import AddProduct from "./components/Store/AddProduct/AddProduct"
import StoreLeftbar from "./components/Store/StoreLeftbar/StoreLeftbar";
import StoreNavbar from "./components/Store/StoreNavbar/StoreNavbar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { role } = useContext(AuthContext);

  return (
    <div className="app">
      {role === "CUSTOMER" && (
        <>
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
        </>
      )}
      {role === "STORE" && (
        <>
          <StoreNavbar />
          <div className="storeAppBody">
            <StoreLeftbar />
            <div className="storeAppContent">
              <Route path="/store/product/all" exact component={StoreAllProduct} />
              <Route path="/store/product/new" component={AddProduct} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/account/profile" component={UpdateProfile} />
              <Route path="/account/password" component={UpdatePassword} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
