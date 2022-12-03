import { useState } from "react";
import { usePopper } from "react-popper";

const usePooperDropdown = () => {
  const [visible, setVisibility] = useState(false);

  const [referenceRef, setReferenceRef] = useState<HTMLElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 2],
        },
      },
    ],
  });

  function handleDropdownClick(e: any) {
    setVisibility(!visible);
  }

  return {
    setReferenceRef,
    setPopperRef,
    styles,
    attributes,
    handleDropdownClick,
    visible,
  };
};

export default usePooperDropdown;
