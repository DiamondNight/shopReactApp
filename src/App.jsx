//REACT
import { Routes, Route } from "react-router-dom";

//CSS
import "./App.css";

//PRIME REACT
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

//COMPONENTES
import HeaderBar from "./components/header-bar/headerBar";
import LogIn from "./components/authentication/logIn";
import Register from "./components/authentication/register";
import Products from "./view/product/products";
import Cart from "./view/cart/cart";
import CheckOut from "./view/checkout/checkout";

function App() {
  return (
    <div className="container">
      <HeaderBar />
      <Routes>
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Products />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/checkout" exact element={<CheckOut />} />
      </Routes>
    </div>
  );
}

export default App;
