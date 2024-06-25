//COMPONENTS
import CheckOutInput from "../../components/checkout/checkout";

// CSS
import "./checkout.css";

export default function CheckOut() {
  
  return (
    <>
      <div className="text-center text-2xl">
        <h2>CheckOut</h2>
      </div>
      <div>
        <CheckOutInput/>
      </div>
    </>
  );
}
