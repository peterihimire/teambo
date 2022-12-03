import React, { createRef, Fragment, useEffect, useState } from "react";


//custo import
import EmojiMartPicker from "./EmojiMartPicket";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import { chatStore } from "../../../store/chatStore";
import { textTruncate } from "../../../utils/helpers/textTruncate";

interface MessageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  noExtra?: boolean;
  messageChat?: boolean;
  handleSubmit?: (attachement?: any, message?:string) => void;
  getMessage?: (message: any) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({
  noExtra = false,
  messageChat,
  handleSubmit,
  getMessage,
  ...rest
}) => {
  //local State
  const setAttachments = chatStore((state) => state.setAttachments);
  const setChat = chatStore((state) => state.setChat);

  const [extra, setExtra] = useState(!noExtra);
  const [cursorPosition, setCursorPositon] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const toggleExtra = () => setExtra(!extra);

  const handleFileAttachment = (e: any) => {
    const { files } = e.target;
    const newFiles = [];
    for (let file of files) {
      newFiles.push(file);
    }
    setSelectedFiles(newFiles);
    setAttachments(newFiles);
  };

  const deleteAttachment = (id: number) => {
    const newAttachement = [...selectedFiles];
    newAttachement.splice(id, 1);
    setAttachments(newAttachement);
    setSelectedFiles(newAttachement);
  };

  //ref
  const textBox = createRef<HTMLInputElement>();

  useEffect(() => {
    if (textBox.current) {
      textBox.current.focus();
    }
  }, [textBox]);

  useEffect(() => {
    if (textBox.current && textBox.current.selectionEnd) {
      textBox.current.selectionEnd = cursorPosition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  const toggleOpenEmoji = () => setOpenEmoji((prev) => !prev);

  const addEmoji = (emoji: any) => {
    let inputRef = textBox.current;
    if (inputRef) {
      inputRef.focus();
      const start = message.substring(0, inputRef.selectionStart as number);
      const end = message.substring(inputRef.selectionStart as number);
      const msg = start + emoji.native + end;
      setMessage(msg);
      setChat(msg);
      if (getMessage) {
        getMessage(msg);
      }
      setCursorPositon((prev) => start.length + emoji.native.length);
    }
  };

  const handleTyping = (e: any) => {
    const { value } = e.target;

    setMessage(value);
    setChat(value);
    if (getMessage) {
      getMessage(value);
    }
  };

  return (
    <>
      <div className="message-input">
        <div
          className={`${
            openEmoji && "emoji__active"
          }   message-input__emojibox`}
        >
          <EmojiMartPicker addEmoji={addEmoji} />
        </div>
        <input
          {...rest}
          type="text"
          onChange={handleTyping}
          ref={textBox}
          className="message-input__input"
          placeholder="Type to add your message"
          value={message}
        />
        <div className="message-input__actions">
          {messageChat && (
            <>
              <Button
                handleClick={toggleOpenEmoji}
                cssClass="btn btn-icon-naked message-input__cta"
                icon="icon-smiley"
                iconClass="icon-smiley"
              />
              <Button
                handleClick={toggleExtra}
                cssClass="btn btn-icon-naked message-input__cta"
                icon="icon-plus"
                iconClass="icon-plus"
              />
            </>
          )}
          <Button
            handleClick={() => {
              if (handleSubmit) {
                handleSubmit(selectedFiles, message);
              }
              setMessage("");
              setSelectedFiles([]);
            }}
            cssClass="btn btn-icon btn-icon--0-border btn--primary"
            icon="icon-share-arrow"
            iconClass="icon-share-arrow"
          />
        </div>
      </div>
      <div className="file__previewer-container">
        {selectedFiles.map((file: any, id) => (
          <Fragment key={id}>
            <FilePreviewer
              file={file}
              deleteAttachment={() => deleteAttachment(id)}
            />
          </Fragment>
        ))}
      </div>
      {!extra && (
        <div className="message-input__actions-extra">
          <div className="message-input__file-upload ">
            <input
              type="file"
              className="file-input"
              accept="image/*"
              onChange={handleFileAttachment}
              multiple
            />
            <Button
              cssClass="btn btn-icon-naked message-input__cta"
              icon="icon-attach"
              iconClass="icon-attach"
            />
          </div>
          <Button
            cssClass="btn btn-icon-naked message-input__cta"
            icon="icon-docs"
            iconClass="icon-docs"
          />
          <Button
            cssClass="btn btn-icon-naked message-input__cta"
            icon="icon-bars-hor"
            iconClass="icon-bars-hor"
          />
          <Button
            cssClass="btn btn-icon-naked message-input__cta"
            icon="icon-voice"
            iconClass="icon-voice"
          />
          <Button
            cssClass="btn btn-icon-naked message-input__cta"
            icon="icon-smiley"
            iconClass="icon-smiley"
          />
        </div>
      )}
    </>
  );
};

export default MessageInput;

type FilePreviewProps = {
  file: {
    name: string;
  };
  deleteAttachment: () => void;
};

export const FilePreviewer: React.FC<FilePreviewProps> = ({
  file,
  deleteAttachment,
}) => {
  let name = textTruncate(file.name, 30);

  return (
    <div className="file__previewer-item">
      <Typography type="h4" cssClass="head-14" text={name} />
      <Button
        cssClass="btn btn-icon"
        icon="icon-times"
        iconClass="icon-times"
        handleClick={deleteAttachment}
      />
    </div>
  );
};
