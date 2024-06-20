//REACT
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

//CSS
import "./headerBar.css";

//PRIME REACT
import { Menubar } from "primereact/menubar";
import MenuButton from "./menu-button/menuButton";
import { Toast } from "primereact/toast";

//COMPONENTS
import storageService from "../../DATA/API/authentication/storageService";

export default function HeaderBar() {
  let user = storageService.getAuthToken();
  const navigate = useNavigate();
  const items = [
    {
      label: "Wines",
      icon: "pi pi-home",
      command: ()=>{
        navigate("/")
      }
    },
    {
      separator: true,
    },
    {
      label: "Cart",
      icon: "pi pi-shopping-cart",
      command: () => {
        if (!user) {
          toast.current.show({
            severity: "error",
            summary: "Log In Require",
          });
        } else {
          navigate("/cart");
        }
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div
      className="flex align-items-center gap-2 "
      style={{ position: "absolute" }}
    >
      <MenuButton />
    </div>
  );

  const toast = useRef(null);
  return (
    <div className="card">
      <Toast ref={toast} />
      <Menubar model={items} start={start} end={end} className="content py-2" />
    </div>
  );
}
