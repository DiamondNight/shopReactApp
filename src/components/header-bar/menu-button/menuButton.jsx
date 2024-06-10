import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

//CSS
import "./menuButton.css";

export default function MenuBar() {
  let user = false;
  const items = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        if (!user) {
          toast.current.show({
            severity: "error",
            summary: "Log In Require",
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Profile",
          });
        }
      },
    },
    {
      label: "Orders",
      icon: "pi pi-box",
      command: () => {
        if (!user) {
          toast.current.show({
            severity: "error",
            summary: "Log In Require",
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Profile",
          });
        }
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        user = true;
        if (!user) {
          toast.current.show({
            severity: "error",
            summary: "Log In Require",
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Profile",
          });
        }
      },
    },
  ];
  const toast = useRef(null);
  if (user) {
    let logOut = {
      label: "Log Out",
      icon: "pi pi-sign-out",
      command: () => {
        if (!user) {
          toast.current.show({
            severity: "error",
            summary: "Log In Require",
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Profile",
          });
        }
      },
    };
    items.push(logOut);
  }

  return (
    <div
      style={{ position: "relative", right: 50, bottom: 30, height: "500px" }}
    >
      <Toast ref={toast} />
      <SpeedDial
        model={items}
        direction="down"
        transitionDelay={80}
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        buttonClassName="p-button-outlined custom-sd-button mt-2"
      />
    </div>
  );
}
