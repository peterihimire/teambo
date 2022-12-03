import React from "react";

type Props = {
  grid?: number;
  children?: React.ReactNode;
};

const GridView: React.FC<Props> = ({ grid, children }) => {
  const styles = {
    gridTemplateColumns: `repeat(${grid}, 1fr)`,
  };
  return (
    <div className="grid-view" style={styles}>
      {children}
    </div>
  );
};

export default GridView;
