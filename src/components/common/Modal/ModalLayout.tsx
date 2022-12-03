import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const ModalLayout: React.FC = ({ children }) => {
  return ReactDOM.createPortal(<div className="modal-layout"> {children} </div>, modalRoot);
};

export default ModalLayout;
