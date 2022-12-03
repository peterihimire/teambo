import React from "react";
import Svg from "../Svg/Svg";
import Spinner from "../Spinner/Spinner";

interface Props {
  text?: string | JSX.Element;
  cssClass: string;
  type?: string;
  icon?: string;
  iconClass?: string;
  withIcon?: boolean;
  btnIcon?: string;
  isLoading?: boolean;
  disable?: boolean;
  title?: any;
  handleClick?: () => void;
}
const Button: React.FC<Props> = ({
  text,
  cssClass,
  type,
  icon,
  iconClass,
  withIcon,
  btnIcon,
  isLoading = false,
  disable,
  title,
  handleClick,
}) => {
  return (
    <button
      className={`btn ${cssClass}`}
      type={type ? "submit" : "button"}
      onClick={handleClick}
      disabled={disable}
      title={title ? title : ""}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {withIcon ? <Svg iconId={btnIcon} cssClass={iconClass} /> : null}
          {icon ? <Svg iconId={icon} cssClass={iconClass} /> : text}
        </>
      )}
    </button>
  );
};

export default Button;
