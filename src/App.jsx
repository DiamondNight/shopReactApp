import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import Products from "./view/product/products";
import HeaderBar from "./components/header-bar/headerBar";

function App() {
  return (
    <div className="container">
      <HeaderBar />
      <Products />
    </div>
  );
}

export default App;
