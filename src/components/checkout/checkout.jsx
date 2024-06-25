// REACT
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import getProductsFromUserCart from "../../DATA/API/cart/getProductsFromUserCart";

//PRIME REACT
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import createOrder from "../../DATA/API/checkout/createOrder";

export default function CheckOutInput() {
  const navigate = useNavigate();
  const [finalPrice, setfinalPrice] = useState(0);
  const [infoCheckOut, setInfoCheckOut] = useState({
    "payment_method": "",
    "payment_price": finalPrice,
    "address": "",
  });
  const toast = useRef(null);
  const getCart = getProductsFromUserCart();
  const payment_method = [{ name: "Payment on delivery" }];
  const [selectedOption, setSelectedOption] = useState([]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleSubmit = async () => {
    console.log(infoCheckOut);
    const order = await createOrder(infoCheckOut);
    console.log(order);
    if (order.acknowledged === true) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: order.message,
        life: 3000,
      });
      setTimeout(() => {
        navigate("/cart");
      }, 1500);
    }
  };

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
      setInfoCheckOut((prev) => ({
        ...prev,
        payment_price: price,
      }));
      price.toString();
      setfinalPrice(price);
    }

    getUserCart();
  }, [getCart]);

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <div className="contentLogIn flex flex-column justify-content-center align-items-center">
        <div className="card flex flex-column justify-content-center align-items-center gap-4">
          <span className="text-center text-xl">
            Total: {formatCurrency(finalPrice)}
          </span>
          <div className="p-inputgroup flex-1">
            <FloatLabel>
              <Dropdown
                value={selectedOption}
                onChange={(e) => {
                  setInfoCheckOut((prev) => ({
                    ...prev,
                    payment_method: e.target.value.name,
                  }));
                  setSelectedOption(() => e.target.value);
                }}
                options={payment_method}
                optionLabel="name"
                className="w-full md:w-15rem"
              />
              <label htmlFor="Dropdown">Select a payment method</label>
            </FloatLabel>
          </div>
          <div className="p-inputgroup flex-1">
            <FloatLabel>
              <InputText
                value={infoCheckOut.address}
                onChange={(e) => {
                  let address = e.target.value;
                  address.toString();
                  setInfoCheckOut((prev) => ({
                    ...prev,
                    address: address,
                  }));
                }}
              />
              <label htmlFor="InputText">Address</label>
            </FloatLabel>
          </div>
          <div>
            <Toast ref={toast} />
            <Button
              label="Log In"
              disabled={!infoCheckOut.payment_method || !infoCheckOut.address}
              onClick={async () => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
