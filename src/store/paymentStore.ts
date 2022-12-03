import create from "zustand";
import paymentService from "./../services/paymentService";

interface PaymentStoreStoreType {
  packagePlans: Array<object>;
  fetchPackagePlans: () => void;
  getUserSub: () => void;
  isLoading: boolean;
  isLoadingUserSub: boolean;
  userSub: Object;
}

const initialState = {
  packagePlans: [],
  userSub: {},
};
const paymentStore = create<PaymentStoreStoreType>((set) => ({
  ...initialState,
  isLoading: true,
  isLoadingUserSub: true,
  fetchPackagePlans: async () => {
    await paymentService
      .getAllPlans()
      .then(({ data }) => {
        set((state) => ({ ...state, packagePlans: data, isLoading: false }));
      })
      .catch((err) => console.log(err.response));
  },
  getUserSub: async () => {
    await paymentService
      .getUserSubscription()
      .then(({ data }) => {
        set((state) => ({ ...state, userSub: data, isLoadingUserSub: false }));
      })
      .catch((err) => console.log(err.response));
  },
}));

export default paymentStore;
