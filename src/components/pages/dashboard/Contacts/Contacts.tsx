import React, { useState, useEffect } from "react";

import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardTopNav from "./../DashboardTopNav";
import contactService from "../../../../services/contactService";
import ContactsEmpty from "./ContactsEmpty";
import ContactList from "./ContactList";
import LoadingContacts from "./LoadingContacts";

interface Props {
  history?: any;
}
const Contacts: React.FC<Props> = ({ history }) => {
  const [contacts, setContacts] = useState<any>([]);
  const [isLoadingContacts, setisLoadingContacts] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setisLoadingContacts(true);
      try {
        await contactService.getAllUserContacts().then(({ data }) => {
          setContacts(data);
          setisLoadingContacts(false);
        });
      } catch (error) {
        setisLoadingContacts(false);
      }
    })();
  }, []);

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Contacts" />

        <DashboardLayoutOne>
          {isLoadingContacts ? (
            <LoadingContacts />
          ) : contacts.length >= 1 ? (
            <ContactList contacts={contacts} />
          ) : (
            <ContactsEmpty />
          )}
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default Contacts;
