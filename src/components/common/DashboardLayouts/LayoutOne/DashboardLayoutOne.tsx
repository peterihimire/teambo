import React from "react";

interface Props {}
const DashboardLayoutOne: React.FC<Props> = ({ children }) => {
  return <section className="dashboard__layout-one">{children}</section>;
};

export default DashboardLayoutOne;
