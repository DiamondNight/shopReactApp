import { Password } from "primereact/password";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import authenEvents from "./authenEvents";
import "./authentication.css";

function LogIn() {
  const [valuePassword, setValuePassword] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [errors, setErrors] = useState({});

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
      await authenEvents.logInEvent(valueEmail, valuePassword);
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
      <div className="contentLogIn flex justify-content-center align-items-center">
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
            <Button
              label="Submit"
              onClick={async () => handleSubmit()}
              disabled={!valueEmail || !valuePassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
