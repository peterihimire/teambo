import { Fragment, useState } from "react";
import Lightbox from "react-image-lightbox";

//custo import
import {MyChat, YourChat} from "../../../../common";

type ChatBoxProps = {
  allMessages: any;
  user: any;
  conversationId: any;
  assetToken: any;
  handleUserDetails?: any;
  setUserDetailsModal?: any;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  allMessages,
  user,
  conversationId,
  assetToken,
  handleUserDetails,
  setUserDetailsModal,
}) => {

 

  const imgUrl = (attachmentName: string) => {
    return (
      "https://api.jointimbo.com/app/assets?cId=" +
      conversationId +
      "&fl=" +
      attachmentName + "&type=attachment"+
      "&at=" +
      assetToken
    );
  };

  const [photoIndex, setPhotoIndex] = useState(0);
  const [openImageBox, setOpenImageBox] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any>({});

  return (
    <>
      {allMessages.map((message: any) => (
        <Fragment key={message.uid}>
          {message.sender.uid === user.uid ? (
            <MyChat message={message} />
          ) : (
            <YourChat
              message={message}
              handleClick={() => {
                handleUserDetails(message);

                setUserDetailsModal((prevState: any) => !prevState);
              }}
            />
          )}
          <div
            className="message-chats__discussion-attachments"
            style={{
              marginLeft: message.sender.uid === user.uid ? "auto" : "",
              justifyContent: message.sender.uid === user.uid ? "flex-end" : "",
            }}
          >
            {message.attachments.length > 0 &&
              message.attachments.map((attachment: any, id: number) => (
                <div
                  key={id}
                  onClick={() => {
                    setCurrentMessage(message);
                    setPhotoIndex(id);
                    setOpenImageBox(true);
                  }}
                >
                  <div className="message-attachment">
                    <img src={imgUrl(attachment)} alt="attachment" />
                  </div>

                  {/* <h3>{attachment}</h3> */}
                </div>
              ))}
          </div>
          {openImageBox && (
            <Lightbox
              mainSrc={imgUrl(currentMessage.attachments[photoIndex])}
              nextSrc={imgUrl(
                currentMessage.attachments[
                  (photoIndex + 1) % currentMessage.attachments.length
                ]
              )}
              prevSrc={imgUrl(
                currentMessage.attachments[
                  (photoIndex + currentMessage.attachments.length - 1) %
                    currentMessage.attachments.length
                ]
              )}
              onCloseRequest={() => setOpenImageBox(false)}
              onMovePrevRequest={() => {
                setPhotoIndex(
                  (prevPhotoIndex) =>
                    (prevPhotoIndex + currentMessage.attachments.length - 1) %
                    currentMessage.attachments.length
                );
              }}
              onMoveNextRequest={() =>
                setPhotoIndex(
                  (prevPhotoIndex) =>
                    (prevPhotoIndex + 1) % currentMessage.attachments.length
                )
              }
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default ChatBox;
