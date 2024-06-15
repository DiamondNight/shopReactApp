import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import HeaderBar from "./components/header-bar/headerBar";
import Products from "./view/product/products"
import LogIn from "./components/authentication/logIn"

function App() {
  return (
    <div className="container">
      <HeaderBar />
      <Products/>
      <LogIn/>
    </div>
  );
}

export default App;
