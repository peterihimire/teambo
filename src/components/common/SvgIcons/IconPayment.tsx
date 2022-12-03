import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconPayment: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "28"}
      height={height || "20"}
      className={`icon-group-user ${cssClass}`}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M4.49954 8.04942C4.49954 7.48344 4.76293 6.94064 5.23177 6.54043C5.70061 6.14023 6.3365 5.91539 6.99954 5.91539H24.8805L23.1528 0.624528C23.1177 0.516526 23.0579 0.415499 22.977 0.327225C22.8961 0.238951 22.7955 0.165162 22.6812 0.110078C22.5668 0.0549938 22.4408 0.0196955 22.3105 0.0062018C22.1801 -0.00729187 22.0479 0.00128395 21.9214 0.0314383L0.731439 5.07629C0.475998 5.13719 0.25933 5.28217 0.129048 5.47936C-0.00123373 5.67656 -0.0344713 5.90984 0.0366392 6.12794L3.52664 16.8152C3.58541 16.9947 3.71136 17.1529 3.88529 17.2656C4.05921 17.3783 4.27156 17.4394 4.48994 17.4395L4.49994 17.4384L4.49954 8.04942Z"
        fill="#8083A3"
      />
      <path
        className={pathCssClass}
        d="M27.9995 10.8237V8.04941C27.9995 7.82302 27.8942 7.6059 27.7066 7.44582C27.5191 7.28573 27.2647 7.1958 26.9995 7.1958H6.99951C6.7343 7.1958 6.47994 7.28573 6.29241 7.44582C6.10487 7.6059 5.99951 7.82302 5.99951 8.04941V10.8237H27.9995Z"
        fill="#8083A3"
      />
      <path
        className={pathCssClass}
        d="M5.99951 12.1041V19.1464C5.99951 19.3728 6.10487 19.5899 6.29241 19.75C6.47994 19.91 6.7343 20 6.99951 20H26.9995C27.2647 20 27.5191 19.91 27.7066 19.75C27.8942 19.5899 27.9995 19.3728 27.9995 19.1464V12.1041H5.99951Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconPayment;