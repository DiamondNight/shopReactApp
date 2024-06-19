//REACT
import { useRef, useState } from "react";

//CSS
import "./authentication.css";

//PRIME REACT
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

//COMPONENTS
import authenEvents from "./authenEvents";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

function Register() {
  const [valuePassword, setValuePassword] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valueName, setValueName] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!valueName) {
      newErrors.name = "Name is required";
    }
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
      const userRegister = await authenEvents.registerEvent(
        valueEmail,
        valuePassword,
        valueName
      );
      console.log(userRegister);
      if (userRegister.status == "OK") {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: userRegister.message,
          life: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: userRegister.message,
          life: 3000,
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const header = <div className="font-bold mb-3">Pick a password</div>;

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <div className="text-center text-2xl">
        <h2>Register</h2>
      </div>
      <div className="contentLogIn flex justify-content-center align-items-center">
        <div className="card flex flex-column justify-content-center align-items-center gap-4">
          <div className="p-inputgroup flex-1">
            <FloatLabel>
              <InputText
                value={valueName}
                onChange={(e) => {
                  setValueName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
              />
              <label htmlFor="InputText">Name</label>
            </FloatLabel>
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
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
          </div>
          {errors.password && (
            <small className="p-error">{errors.password}</small>
          )}
          <div>
            <Toast ref={toast} />
            <Button
              label="Register"
              onClick={async () => handleSubmit()}
              disabled={!valueName || !valueEmail || !valuePassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
