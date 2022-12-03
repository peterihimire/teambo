import React from "react";
import ReactDOM from "react-dom";
// import Typography from "./../Typography/Typography";

interface SideDrawerProps {
  text?: any;
  type?: string;
  cssClass?: string;
  show: any;
  onClick: any;
}
const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const content = (
    <aside
      className={props.show ? "side-drawer show-nav" : "side-drawer"}
      onClick={props.onClick}
    >
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook")!,
  );
};

export default SideDrawer;
