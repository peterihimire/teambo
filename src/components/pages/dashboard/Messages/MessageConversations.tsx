import { useEffect } from 'react';
import {Switch, Route, useRouteMatch} from "react-router-dom";

import MessagesEmpty from './MessagesEmpty';
import MessageChats from './MessageChats';
import DashboardTopNav from "./../DashboardTopNav";
import {DashboardLayoutOneRight, DashboardLayoutOneLeft, DashboardLayoutOne, MessagesSideLinks} from "../../../common";

interface CallsProps {
  match: {
    params: {
      id: string;
    };
  };
  location: any
}
const MessageConversations: React.FC<CallsProps> = (props) => {
  const conversationId = props?.location?.state || false
  // const fetchAllUserConversation = 
  
  useEffect(() => {
    if (conversationId) {

    }

  }, [conversationId])

    const { path } = useRouteMatch();
  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Messages" icon="icon-pen" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft cssClass="color-2">
            <MessagesSideLinks />
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight cssClass="no-padding">
              <Switch>
                <Route exact path={`${path}`}component={MessagesEmpty}/>
                <Route exact path={`${path}/:id`}component={MessageChats}/>
              </Switch>
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default MessageConversations;
