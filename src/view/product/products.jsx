import ProductCard from "../../components/card/productCard";
import PRODUCT_EXAMPLE from "../../DATA/PRODUCT_EXAMPLE";

// CSS
import "./products.css";

export default function Products() {
  const products = PRODUCT_EXAMPLE.map((product, index) => {
    let key = "product_" + index;
    return <ProductCard product={product} key={key} />;
  });
  return (
    <>
      <div className="felx text-center text-2xl">
        <h2>Wines</h2>
      </div>
      <div className="container">
        <div className="content">
          <div className="flex flex-wrap justify-content-start gap-5">
            {products}
          </div>
        </div>
      </div>
    </>
  );
}
