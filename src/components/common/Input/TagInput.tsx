import Select from "react-select";

import React, { useRef, useState, useEffect } from "react";
import Typography from "./../Typography/Typography";
import Svg from "./../Svg/Svg";
import { useLazyGet } from "../../../utils/hooks/fetchHook";
import api from "../../../utils/constants/api";
import { compareFilterArray } from "./../../../utils/helpers/compareFilterArray";

interface Props {
  label?: any;
  contacts?: any;
  setContacts?: (payload: any) => void;
  participants?: Array<any>;
}
const TagInput: React.FC<Props> = ({
  label,
  contacts,
  setContacts,
  participants = [],
}) => {
  const inputFocus = useRef<HTMLInputElement>();
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<string[]>(["Johnny Peterson"]);
  const [fetchedContacts, setFetchedContacts] = useState<any>([]);
  const { get: getContacts } = useLazyGet(api.GET_ALL_CONTACTS);

  useEffect(() => {
    // if (inputFocus.current) {
    //   inputFocus.current.focus();
    // }
    console.log(fetchedContacts);
    let newData;
    getContacts()
      .then((data) => {
        console.log(data)
        newData = data
          .map((d: any) => {
            d.label = d.fullname;
            d.value = d.label;

            return d;
          })
          .filter((contact: any) => contact.user);
        const notMembers = compareFilterArray(
          newData,
          "user",
          participants,
          "uid"
        );

        setFetchedContacts(notMembers);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contacts) {
      setTags(contacts);
      console.log(tags);
    }
  }, [contacts, tags]);

  const handleChange = (e: any) => {
    setTagText(e.target.value);
  };

  const handleAddTag = () => {
    if (tagText.length > 0) {
      setTags((tags) => [...tags, tagText]);
    } else return;
    setTagText("");
  };
  const handleRemoveTag = (id: any) => {
    let newTags = tags;
    newTags.splice(id, 1);
    setTags([...newTags]);
  };

  return (
    <>
      {label && (
        <label htmlFor={label} className="input__label m-b-10px display-block">
          {label}
        </label>
      )}
      {contacts ? (
        <Select
          isMulti
          options={fetchedContacts}
          // value={contacts}
          className="tag__select"
          onChange={(value: any) => {
            if (setContacts) {
              setContacts(value);
            }
          }}
        />
      ) : (
        <div className="tag__holder ">
          {tags.map((item, id) => (
            <Tag
              text={item}
              key={id}
              handleRemove={() => handleRemoveTag(id)}
            />
          ))}
          <input
            ref={inputFocus as React.RefObject<HTMLInputElement>}
            type="text"
            name="tagText"
            id="tagText"
            list="contact_list"
            value={tagText}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            className="tag__input"
          />
        </div>
      )}
    </>
  );
};
export default TagInput;

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
