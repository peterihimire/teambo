import React from "react";
import { Link } from "react-router-dom";

import Typography from "./../Typography/Typography";

interface Props {
  link?: string;
  text?: any;
  icon?: JSX.Element;
  isActive?: boolean;
  handleClick?: () => void;
}
const AdminSidenavLink: React.FC<Props> = ({
  link,
  text,
  icon,
  isActive,
  handleClick,
}) => {
  return (
    <Link
      to={link ? link : "#"}
      className={`admin-side-nav__link ${isActive ? "active" : null}`}
      onClick={handleClick}
    >
      {icon}
      <Typography type="span" text={text} cssClass="" />
    </Link>
  );
};

export default AdminSidenavLink;
