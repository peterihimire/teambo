import React, { Fragment, useEffect, useState } from "react";
import { useRouteMatch, } from "react-router-dom";
import { messageStore } from "../../../store/messageStore";
import api from "../../../utils/constants/api";
import { useLazyGet } from "../../../utils/hooks/fetchHook";
import SearchMessagesInput from "../SearchInput/SearchMessagesInput";
import Typography from "../Typography/Typography";
import LoadingMessages from "./LoadingMessage";

import MessageLink from "./MessageLink";

interface Props {
  id?: string;
  match?: {
    params: {
      id: string;
    };
  };
}
const MessagesSideLinks: React.FC<Props> = (props) => {
  
  const match = useRouteMatch("/user/messages");
  const [searchKey, setSearchKey] = useState<any>("");
  const { allConversations, setAllUserconversations } = messageStore();
  const { isLoading, get: getAllUserConversations } = useLazyGet(
    api.GET_ALL_USER_CONVERSATION
  );
  const handleSearchKey = (query: any) => {
    setSearchKey(query);
  };
  let filteredConversations = allConversations;
  if (searchKey) {
    filteredConversations = allConversations?.filter((conversation: any) =>
    conversation["title"].toLowerCase().includes(searchKey.toLocaleLowerCase())
    );
    // console.log("Filtered calls: ", filteredCalls);
  }



  useEffect(() => {
    getAllUserConversations().then((data) => {
      setAllUserconversations(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const url = match?.url;

  return (
    <>
      {isLoading ? (
        <LoadingMessages />
      ) : allConversations.length === 0 ? (
        <div className="text-center">
          <Typography
            type="h2"
            cssClass="head-4 m-t-10px"
            text="You don't have any conversation"
          />

          <Typography
            type="p"
            cssClass="head-5 m-t-10px"
            text="Please start a new conversation"
          />
        </div>
      ) : (
        <>
        <SearchMessagesInput
          handleChange={handleSearchKey}
          value={searchKey}
        />
        {filteredConversations?.length === 0
          ? "No Search Found"
          : filteredConversations?.map((conversation: any, index) => (
            <Fragment key={index}>
              <MessageLink
                url={url}
                chatId={conversation.uid}
                conversation={conversation}
              />
            </Fragment>
            ))}
        </>
      )}
    </>
  );
};

export default MessagesSideLinks;
