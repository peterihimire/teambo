// import React from "react";
// import ReactDOM from "react-dom";

// interface BackdropProps {
//   show: any;
//   onClick: any;
// }
// const Backdrop: React.FC<BackdropProps> = (props) => {
//   const content = (
//     <aside
//       className={props.show ? "side-drawer show-nav" : "side-drawer"}
//       onClick={props.onClick}
//     >
//       {props.children}
//     </aside>
//   );
//   return ReactDOM.createPortal(
//     content,
//     document.getElementById("drawer-hook")!,
//   );
// };

// export default Backdrop;

import React from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  onClick?: any;
}
const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  const content = <div className="backdrop" onClick={onClick}></div>;
  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")!,
  );
};

export default Backdrop;

// import React from "react";

// import Typography from "./../Typography/Typography";

// interface BadgeProps {
//   text?: any;
//   type?: string;
//   cssClass?: string;
// }
// const Badge: React.FC<BadgeProps> = ({ text, cssClass, type }) => {
//   return (
//     <Typography
//       type="span"
//       text={text}
//       cssClass={`badge ${type} ${cssClass}`}
//     />
//   );
// };

// export default Badge;
