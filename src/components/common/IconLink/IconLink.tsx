import React from "react";
import { Link, useLocation } from "react-router-dom";

import Badge from "../Badge/Badge";
import Typography from "./../Typography/Typography";

interface Props {
  title?: string;
  subTitle?: string;
  Icon?: JSX.Element;
  bagdeText?: any;
  cssClass?: string;
  link?: any;
}
const IconLink: React.FC<Props> = ({
  title,
  subTitle,
  Icon,
  bagdeText,
  cssClass,
  link,
}) => {

  const location = useLocation();
  return (
    <Link to={link ? link : "#"} className={`icon-links ${location.pathname.startsWith(`${link}`) ? 'active' : ''} ${cssClass}`}  >
      {Icon}
      <div className="m-l-10px">
        <Typography
          type="h5"
          text={title || ""}
          cssClass="head-14 icon-links__title"
        />
        <Typography
          type="p"
          text={subTitle || ""}
          cssClass="p-3 icon-links__sub-title"
        />
      </div>
      {bagdeText && (
        <Badge text={bagdeText} type="ok" cssClass="icon-links__badge" />
      )}
    </Link>
  );
};

export default IconLink;
