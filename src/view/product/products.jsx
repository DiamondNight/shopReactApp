import { useEffect, useState } from "react";
import ProductCard from "../../components/card/productCard";
import useGetProducts from "../../DATA/API/PRODUCTS/getProducts";

// CSS
import "./products.css";

export default function Products() {
  const productDataPromise = useGetProducts("all");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      const data = await productDataPromise;
      setProducts(data);
    }

    fetchProductData();
  }, [productDataPromise]);

  const productList = products.map((product, index) => {
    let key = "product_" + index;
    return <ProductCard product={product} key={key} />;
  });
  console.log(productList);
  return (
    <>
      <div className="felx text-center text-2xl">
        <h2>Wines</h2>
      </div>
      <div className="container">
        <div className="content">
          <div className="flex flex-wrap justify-content-start gap-5">
            {productList}
          </div>
        </div>
      </div>
    </>
  );
}
