import create from "zustand";

interface OnboardingStoreType {
  newUserEmail: string;
  setNewUserEmail: (email: any) => void;
}
const onboardingStore = create<OnboardingStoreType>((set) => ({
  newUserEmail: "",
  setNewUserEmail: (email) => {
    set((store) => ({ newUserEmail: email }));
  },
}));

export default onboardingStore;