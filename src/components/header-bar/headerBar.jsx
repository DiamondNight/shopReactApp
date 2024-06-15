import { Menubar } from "primereact/menubar";
import MenuButton from "./menu-button/menuButton";
import "./headerBar.css"

export default function HeaderBar() {
  const items = [
    {
      label: "Wines",
      icon: "pi pi-home",
    },
    {
      separator: true,
    },
    {
      label: "Cart",
      icon: "pi pi-shopping-cart",
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

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} className="content py-2" />
    </div>
  );
}
