import React, { useState } from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import SearchContactsInput from "../../../common/SearchInput/SearchContactsInput";
import ContactNoSelection from "./ContactNoSelection";
import { UserDetails } from "../../../common";
import ContactView from "../../../common/Contact/ContactView";

interface Props {
  contacts?: any;
}
const ContactList: React.FC<Props> = ({ contacts }) => {
  const match = useRouteMatch("/user/contacts");
  const [searchKey, setSearchKey] = useState<any>("");
  const [selectedContactInfo, setSelectedContactInfo] = useState<any>();
  const updateSelectedContactInfo = (contact: any):void => {
    setSelectedContactInfo(contact)
  }
  const allContacts = contacts;
  const url = match?.url;

  const handleSearchKey = (query: any) => {
    setSearchKey(query);
  };

  let filteredContacts = allContacts;
  if (searchKey) {
    filteredContacts = allContacts?.filter((call: any) =>
      call["fullname"].toLowerCase().includes(searchKey.toLocaleLowerCase())
    );
  }
  return (
    <>
      <DashboardLayoutOneLeft>
        <aside className="prev-calls-list">
          <Typography
            type="p"
            cssClass="para-1 m-b-10px"
            text="Search for a Contact"
          />
          <SearchContactsInput
            handleChange={handleSearchKey}
            value={searchKey}
          />

          {filteredContacts?.length === 0
            ? "No Search Found"
            : filteredContacts?.map((contact: any, index:any) => (
                <ContactView key={index} userDetail={contact} userImg={contact.user.image} url={url} updateSelectedContactInfo={updateSelectedContactInfo} />
              ))}
        </aside>
      </DashboardLayoutOneLeft>
      <DashboardLayoutOneRight>
        <Switch>
            <Route exact path={`${url}`}component={ContactNoSelection}/>
            <Route exact path={`${url}/:id`} render={() => <UserDetails contact={selectedContactInfo} />} />
        </Switch>
      </DashboardLayoutOneRight>
    </>
  );
};

export default ContactList;
