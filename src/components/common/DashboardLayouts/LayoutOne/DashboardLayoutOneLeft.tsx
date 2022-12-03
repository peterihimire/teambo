import React from "react";

type Props = {
  cssClass?: string;
  width?: string;
};
const DashboardLayoutOneLeft: React.FC<Props> = ({
  cssClass,
  width,
  children,
}) => {
  const styles = {
    flexBasis: width,
  };
  return (
    <section
      className={`dashboard__layout-one__left ${cssClass}`}
      style={styles}
    >
      {children}
    </section>
  );
};

export default DashboardLayoutOneLeft;
