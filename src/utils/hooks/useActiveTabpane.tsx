import { useState } from "react";

// interface Props {}
const useActiveTabpane = (initialState: number) => {
  const [activeIndex, setActiveIndex] = useState<any>(initialState);

  const setActivePane = (index: any) => {
    setActiveIndex(index);
  };

  return [activeIndex, setActivePane];
};

export default useActiveTabpane;
