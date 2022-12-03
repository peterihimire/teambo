import React from "react";

type Props = {
  width?: any;
  padding?: any;
};

const ModalChild: React.FC<Props> = ({ children, width, padding }) => {
  const styles = {
    maxWidth: width,
    padding: padding,
  };
  return (
    <div className="modal-child" style={styles}>
      {children}
    </div>
  );
};

export default ModalChild;
