import create from "zustand";
import contactService from "./../services/contactService";

interface ContactStoreType {
  contacts: Array<object>;
  fetchContacts: () => void;
  isLoading: boolean;
}

const contactStore = create<ContactStoreType>((set) => ({
  contacts: [],
  isLoading: true,
  fetchContacts: async () => {
    try {
      await contactService.getAllUserContacts().then(({ data }) => {
        set((state) => ({
          contacts: [...data],
          isLoading: false,
        }));
      });
    } catch (error) {
      set((state) => ({ isLoading: false }));
    }
  },
}));

export default contactStore;
