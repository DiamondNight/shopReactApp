//REACT
import { useState, useEffect } from "react";

//CSS
import "./cart.css";

//PRIME REACT
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import getProductsFromUserCart from "../../DATA/API/cart/getProductsFromUserCart";
import deleteProductFromUserCart from "../../DATA/API/cart/deleteProductFromUserCart";
import updateQuantityProductFromUserCart from "../../DATA/API/cart/updateQuantityProductFromUserCart";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const getCart = getProductsFromUserCart();

  useEffect(() => {
    async function getUserCart() {
      const cart = await getCart;
      setProducts(cart.array_products);
    }
    getUserCart();
  }, [getCart]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={product.product.image_url}
        alt={product.product.product_name}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    const price =
      product.product.price -
      (product.product.price * product.product.discount) / 100;
    return formatCurrency(price);
  };

  const deleteBodyTemplate = (product) => {
    const id = product.product._id;
    return (
      <Button
        icon="pi pi-trash"
        rounded
        text
        onClick={() => {
          deleteProductFromUserCart(id);
        }}
      />
    );
  };

  const useQuantityBodyTemplate = (product) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const handleSubmitQuantity = async (type) => {
      if (type == "minus" && quantity != 1) {
        const result = await updateQuantityProductFromUserCart(
          product.product._id,
          quantity - 1
        );
        setQuantity(quantity - 1);
        console.log(result);
        return result;
      } else if (type == "plus") {
        const result = await updateQuantityProductFromUserCart(
          product.product._id,
          quantity + 1
        );
        setQuantity(quantity + 1);
        console.log(result);
        return result;
      }
    };
    return (
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-minus"
          rounded
          text
          onClick={() => handleSubmitQuantity("minus")}
        />
        <p>{quantity}</p>
        <Button
          icon="pi pi-plus"
          rounded
          text
          onClick={() => handleSubmitQuantity("plus")}
        />
      </div>
    );
  };

  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  return (
    <>
      <div className="text-center text-2xl">
        <h2>Cart</h2>
      </div>
      <div className="contentCart">
        <div className="card">
          <DataTable
            value={products}
            footer={footer}
            tableStyle={{ minWidth: "60rem" }}
          >
            <Column field="product.product_name" header="Name" />
            <Column header="Image" body={imageBodyTemplate} />
            <Column field="price" header="Price" body={priceBodyTemplate} />
            <Column field="product.description.alc_vol" header="Alc / %Vol" />
            <Column field="product.description.location" header="Location" />
            <Column header="Quantity" body={useQuantityBodyTemplate} />
            <Column header="Delete" body={deleteBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </>
  );
}
