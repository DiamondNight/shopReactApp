//REACT
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//CSS
import "./authentication.css";

//PRIME REACT
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

//COMPONENTS
import authenEvents from "./authenEvents";

function LogIn() {
  const [valuePassword, setValuePassword] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useRef(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!valueEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(valueEmail)) {
      newErrors.email = "Email is not valid";
    }
    if (!valuePassword) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      let logIn = await authenEvents.logInEvent(valueEmail, valuePassword);

      if (logIn.status == "Error") {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: logIn.message,
          life: 3000,
        });
      }
      if (logIn.status == "Ok") {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: logIn.message,
          life: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const header = <div className="font-bold mb-3">Pick a password</div>;

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <div className="text-center text-2xl">
        <h2>Log In</h2>
      </div>
      <div className="contentLogIn flex flex-column justify-content-center align-items-center">
        <div className="card flex flex-column justify-content-center align-items-center gap-4">
          <div className="p-inputgroup flex-1">
            <FloatLabel>
              <InputText
                value={valueEmail}
                onChange={(e) => {
                  setValueEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              <label htmlFor="InputText">Email</label>
            </FloatLabel>
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>
          <div className="p-inputgroup flex-1">
            <FloatLabel>
              <Password
                value={valuePassword}
                onChange={(e) => {
                  setValuePassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                header={header}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>
            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}{" "}
          </div>
          <div>
            <Toast ref={toast} />
            <Button
              label="Log In"
              onClick={async () => handleSubmit()}
              disabled={!valueEmail || !valuePassword}
            />
          </div>
        </div>
      </div>
        <Button label="Register" link onClick={()=> navigate("/register")}/>
    </div>
  );
}

export default LogIn;
