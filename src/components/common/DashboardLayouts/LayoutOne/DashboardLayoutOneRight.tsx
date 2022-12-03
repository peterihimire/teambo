import React from "react";

interface Props {
  cssClass?: string;
  padding?: string;
}
const DashboardLayoutOneRight: React.FC<Props> = ({
  children,
  cssClass,
  padding,
}) => {
  const styles = {
    padding,
  };
  return (
    <section
      className={`dashboard__layout-one__right ${cssClass}`}
      style={styles}
    >
      {children}
    </section>
  );
};

export default DashboardLayoutOneRight;
