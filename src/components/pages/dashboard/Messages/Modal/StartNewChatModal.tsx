import { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import {ModalChild, ModalLayout, Typography, Button, TagInput, UserContact, Input} from "../../../../common";
import { messageStore } from "../../../../../store/messageStore";
import { usePost } from "../../../../../utils/hooks/fetchHook";
import api from "../../../../../utils/constants/api";

interface Props {
  handleClick: () => void;
}
const StartNewChatModal: React.FC<Props> = ({ handleClick }) => {

  const history = useHistory()
  const [allContacts, setAllGroupContacts] = messageStore((store) => [
    store.group.allContacts,
    store.setAllGroupContacts,
  ]);

  //the api to post the group details
  const {isLoading: postLoading, post} = usePost(api.POST_START_CONVERSATION)

  //contacts on our platform should be the oonly one you can call
  // const platFormContacts = allContacts.filter((contact) => contact.user.uid);

  const [title, setTitle] = useState("");

  const createConversation = async () => {
    const conversationTitle = title.trim();
    const data: any = {};

    //get all the participants and extract their id 
    data.participants = allContacts.map(contact => contact.user.uid)

    //check if the conversation Title exist in order to set the group name 
    //or use default provided by the api
    if (conversationTitle) {
      data.title = conversationTitle;
    }
 
    try{
       const conversationResponse:any =  await post(data)
       setAllGroupContacts([])

        history.push({pathname: `/user/messages/${conversationResponse.data.uid}`, state: conversationResponse.data.uid})
        // history.push({pathname: `/user/messages/${id}`, state: id})
    }
    catch(err) {
      
    }

  };

  const isGroup = allContacts.length > 1 ? "Create Group" : "Start Chat";

  return (
    <ModalLayout>
      <ModalChild width="46.5rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-30px">
          <Typography type="h3" text="Start new chat" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        <Input
          onChange={(e: any) => setTitle(e.target.value)}
          value={title}
          name="title"
          label="title"
          iconId="icon-message"
        />
        <TagInput
          contacts={allContacts}
          setContacts={setAllGroupContacts}
          label="Type name to start chat"
        />

        <Typography type="p" text="Invited" cssClass="p-1 m-t-40px m-b-20px" />

        {allContacts.map((contact: any, id: number) => (
          <Fragment key={id}>
            <UserContact userDetail={contact} />
          </Fragment>
        ))}

        <div className="modal-invite-people__actions m-t-60px">
          <Button
            cssClass="btn btn--small btn--all-grey btn-icon-n-text"
            withIcon={true}
            btnIcon="icon-link-2"
            iconClass="icon-link-2 btn-icon-n-text__icon"
            text="Copy Link"
          />

          <Button
            disable={allContacts.length === 0}
            cssClass="btn btn--small btn--primary"
            isLoading={postLoading}
            text={isGroup}
            handleClick={createConversation}
          />
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default StartNewChatModal;
