import { Fragment, useEffect, useState } from "react";


import {ModalChild, ModalLayout, Typography, Button} from "../../../../common";
import api from "../../../../../utils/constants/api";
import { textTruncate } from "../../../../../utils/helpers/textTruncate";
import { useLazyGet } from "../../../../../utils/hooks/fetchHook";
import authService from "../../../../../services/authService";

interface Props {
  handleClick: () => void;
  conversationId: string;
}
const ConversationFilesModal: React.FC<Props> = ({
  handleClick,
  conversationId,
}) => {
  const [files, setFiles] = useState<Array<any>>([]);
  const assetToken = authService.getAssetToken();

  //api
  const { get: getAllAttachments } = useLazyGet(
    api.GET_ALL_FILE_ATTACHMENTS(conversationId || "")
  );

  useEffect(() => {
    getAllAttachments()
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {});

    // eslint-disable-next-line
  }, []);

  const getAttachmentUrl = (attachmentName: string) => {
    return (
      "https://timbo-api.herokuapp.com/app/attachment?cId=" +
      conversationId +
      "&fl=" +
      attachmentName +
      "&at=" +
      assetToken +
      "&action=download"
    );
  };

  return (
    <ModalLayout>
      <ModalChild width="45.8rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-50px">
          <Typography type="h3" text="Files" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <div className="file__previewer-container">
          {files.map((file: any, id) => (
            <Fragment key={id}>
              <a
                target="_blank"
                href={`${getAttachmentUrl(file)}`}
                rel="noreferrer"
              >
                <FileAttachmentCard file={file} />
              </a>
            </Fragment>
          ))}
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default ConversationFilesModal;

type FileAttachmentCardProps = {
  file: string;
};

export const FileAttachmentCard: React.FC<FileAttachmentCardProps> = ({
  file,
}) => {
  let name = textTruncate(file, 30);

  return (
    // <button className="btn">
    <div className="file__previewer-item btn">
      <Typography type="h4" cssClass="head-14" text={name} />
    </div>
    // </button>
  );
};
