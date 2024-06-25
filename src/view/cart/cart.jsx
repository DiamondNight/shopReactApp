// COMPONENTS
import CartTable from "../../components/cart/cartTable";
//CSS
import "./cart.css";

export default function Cart() {
  return (
    <>
      <div className="text-center text-2xl">
        <h2>Cart</h2>
      </div>
      <div className="contentCart">
        <CartTable />
      </div>
    </>
  );
}
