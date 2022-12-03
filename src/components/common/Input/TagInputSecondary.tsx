
import React, { useRef, useState,  } from "react";
import Typography from "./../Typography/Typography";
import Svg from "./../Svg/Svg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>  {
  label?: any;
setFieldValue?: any
}
const TagInputSecondary: React.FC<Props> = ({
  label,
  setFieldValue,
    ...rest
}) => {
  const inputFocus = useRef<HTMLInputElement>(null);
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<string[]>(["Johnny Peterson"]);



  const handleChange = (e: any) => {
    setTagText(e.target.value);
  };


  const handleAddTag = () => {
    if (tagText.length > 0) {
        console.log('here')
      setTags((tags) => [...tags, tagText]);
      
      if(setFieldValue) {
        setFieldValue('tags', [...tags,tagText])
      }
    } else return;
    setTagText("");
  };
  const handleRemoveTag = (id: any) => {
    let newTags = tags;
    newTags.splice(id, 1);
    setTags([...newTags]);
     
    if(setFieldValue) {
        setFieldValue('tags', [...newTags])
      }
  };

  return (
    <>
      {label && (
        <label htmlFor={label} className="input__label m-b-5px">
          {label}
        </label>
      )}
      
        <div className="tag__holder ">
          {tags.map((item, id) => (
            <Tag
              text={item}
              key={id}
              handleRemove={() => handleRemoveTag(id)}
            />
          ))}
          <input
            ref={inputFocus}
            type="text"
            name="tagText"
            id=""
            list="contact_list"
            value={tagText}
            onChange={(e) => {
                handleChange(e)
            }}
            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            className="tag__input"
          
          />
        </div>
      
    </>
  );
};
export default TagInputSecondary;

interface TagProps {
  text: string;
  handleRemove: any;
}
export const Tag: React.FC<TagProps> = ({ text, handleRemove }) => {
  return (
    <div className="tag-input">
      <Typography type="p" text={text} cssClass="tag__text" />
      <Svg
        iconId="icon-times"
        cssClass="icon-times pointer"
        handleClick={handleRemove}
      />
    </div>
  );
};
