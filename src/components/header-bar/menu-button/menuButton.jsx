import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import storageService from "../../../DATA/API/authentication/storageService";

//CSS
import "./menuButton.css";

export default function MenuBar() {
  let user = storageService.getAuthToken();
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
  ];
  if (!user) {
    let logIn = {
      label: "Log In",
      icon: "pi pi-sign-in",
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
    };
    items.push(logIn);
  } else {
    let logOut = {
      label: "Log Out",
      icon: "pi pi-sign-out",
      command: () => {
        storageService.removeAuthToken();
        window.location.reload(true);
      },
    };
    items.push(logOut);
  }

  const toast = useRef(null);
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
