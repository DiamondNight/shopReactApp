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
import Products from "./view/product/products";
import LogIn from "./components/authentication/logIn";
import Register from "./components/authentication/register";

function App() {
  return (
    <div className="container">
      <HeaderBar />
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
