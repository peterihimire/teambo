import React from "react";
import TextWithDividerItem from "./TextWithDividerItem";

interface textInterface {
  iconName: string;
  data: string;
  divider: string;
}
interface Props {
  texts?: Array<textInterface>;
}
const TextWithDivider: React.FC<Props> = ({ texts = [] }) => {
  return (
    <div className="text-with-divider">
      {texts.map((text, id) => (
        <TextWithDividerItem
          iconName={text.iconName}
          data={text.data}
          divider={text.divider}
          key={id}
        />
      ))}
    </div>
  );
};

export default TextWithDivider;
