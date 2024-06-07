import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import ProductCard from "./components/card/productCard";
import PRODUCT_EXAMPLE from "./DATA/PRODUCT_EXAMPLE";

function App() {
  const products = PRODUCT_EXAMPLE.map((product, index) => {
    let key = "product_" + index;
    return (
      <div key={key}>
        <ProductCard product={product} />
      </div>
    );
  });
  return <div>{products}</div>;
}

export default App;
