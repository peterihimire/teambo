import create, { SetState, GetState } from "zustand";
import companyService from "../services/companyService";

type useStoreType = {
  companyReport: any;
  getCompanyReport: () => void | any;
};

export const companyReportStore = create<useStoreType>(
  (set: SetState<useStoreType>, get: GetState<useStoreType>) => ({
    companyReport: null,
    getCompanyReport: async () => {
      const response: any = await companyService.getCompanySettingsReport();
      set({
        companyReport: {
          ...response.data.data
        },
      });
    },
  })
);
