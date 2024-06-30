//REACT
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import getProductsFromUserCart from "../../DATA/API/cart/getProductsFromUserCart";
import deleteProductFromUserCart from "../../DATA/API/cart/deleteProductFromUserCart";
import updateQuantityProductFromUserCart from "../../DATA/API/cart/updateQuantityProductFromUserCart";

//PRIME REACT
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function CartTable() {
  const [products, setProducts] = useState([]);
  const [finalPrice, setfinalPrice] = useState(0);
  const toast = useRef(null);
  const getCart = getProductsFromUserCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserCart() {
      const cart = await getCart;
      let price = 0;
      cart.array_products.forEach((element) => {
        price =
          price +
          (element.product.price -
            (element.product.price * element.product.discount) / 100) *
            element.quantity;
      });
      setfinalPrice(price);
      setProducts(cart.array_products);
    }

    getUserCart();
  }, [getCart]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
    });
  };

  const imageBody = (product) => {
    return (
      <img
        src={product.product.image_url}
        alt={product.product.product_name}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const priceBody = (product) => {
    const price =
      product.product.price -
      (product.product.price * product.product.discount) / 100;
    return product.product.status === "stock"
      ? formatCurrency(price)
      : "Out Of Stock";
  };

  const deleteBody = (product) => {
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

  const useQuantityBody = (product) => {
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

  const handleSubmit = () => {
    if (products.length > 0) {
      navigate("/checkout");
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "The shopping cart is empty",
        life: 3000,
      });
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <div className="flex align-items-center gap-2">
        <span>Total: {formatCurrency(finalPrice)}</span>
        <Button
          icon="pi pi-shopping-cart"
          rounded
          raised
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );

  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={products}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="product.product_name" header="Name" />
        <Column header="Image" body={imageBody} />
        <Column field="price" header="Price" body={priceBody} />
        <Column field="product.description.alc_vol" header="Alc / %Vol" />
        <Column field="product.description.location" header="Location" />
        <Column header="Quantity" body={useQuantityBody} />
        <Column header="Delete" body={deleteBody} />
      </DataTable>
    </div>
  );
}
