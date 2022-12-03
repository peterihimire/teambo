import ReactDOM from "react-dom";

const popperRoot = document.getElementById("popper-root") as HTMLElement;

const PopperContainer: React.FC = ({ children }) => (
  <div>{ReactDOM.createPortal(<div>{children}</div>, popperRoot)}</div>
);

export default PopperContainer;
