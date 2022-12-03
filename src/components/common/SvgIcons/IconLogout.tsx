import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconLogout: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "18"}
      height={height || "18"}
      className={`icon-users ${cssClass}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        opacity="0.4"
        d="M0.666626 4.37251C0.666626 2.33001 2.35849 0.666672 4.43707 0.666672H8.57133C10.6457 0.666672 12.3333 2.325 12.3333 4.36417V13.6275C12.3333 15.6708 10.6414 17.3333 8.562 17.3333H4.42944C2.35425 17.3333 0.666626 15.675 0.666626 13.6358V12.8525V4.37251Z"
        fill="#EB5757"
      />
      <path
        className={pathCssClass}
        d="M17.149 8.54568L14.7775 6.12151C14.5324 5.87151 14.138 5.87151 13.8937 6.12318C13.6502 6.37484 13.651 6.78068 13.8953 7.03068L15.1947 8.35818H13.9489H6.95696C6.61203 8.35818 6.33203 8.64568 6.33203 8.99985C6.33203 9.35485 6.61203 9.64151 6.95696 9.64151H15.1947L13.8953 10.969C13.651 11.219 13.6502 11.6248 13.8937 11.8765C14.0162 12.0023 14.1761 12.0657 14.3368 12.0657C14.4959 12.0657 14.6558 12.0023 14.7775 11.8782L17.149 9.45484C17.2667 9.33401 17.3333 9.17068 17.3333 8.99985C17.3333 8.82984 17.2667 8.66651 17.149 8.54568Z"
        fill="#EB5757"
      />
    </svg>
  );
};

export default IconLogout;
