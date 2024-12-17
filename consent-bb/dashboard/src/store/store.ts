import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// Setup initial state
type State = {
  filterDataAgreement: string;
  filterDataAttribute: string;
  filterViewLogs: any;
  userRecordsFilter: any;
};

// Setup actions
type Action = {
  updateFilterDataAgreement: (
    filterDataAgreement: State["filterDataAgreement"]
  ) => void;
  updateFilterDataAttribute: (
    filterDataAttribute: State["filterDataAttribute"]
  ) => void;
  updateFilterViewLogs: (filterViewLogs: State["filterViewLogs"]) => void;
};

// Setup store
export let store = (set: any) => ({
  filterDataAgreement: "all",
  disabledPurposeDropDown: true,
  disabledLawfulBasisDropDown: true,
  changeAvatar: false,
  changeAdminName: false,
  updateFilterDataAgreement: (filterDataAgreement: any) =>
    set(() => {
      return { filterDataAgreement: filterDataAgreement };
    }),
  updateDisabledPurposeDropDown: (disabledPurposeDropDown: any) =>
    set(() => ({ disabledPurposeDropDown: disabledPurposeDropDown })),
  updateDisabledLawfulBasisDropDown: (disabledLawfulBasisDropDown: any) =>
    set(() => ({ disabledLawfulBasisDropDown: disabledLawfulBasisDropDown })),
  updateChangeAvatar: (changeAvatar: any) =>
    set(() => ({ changeAvatar: changeAvatar })),
  updateChangeAdminName: (changeAdminName: any) =>
    set(() => ({ changeAdminName: changeAdminName })),
});

let devtoolsStore = devtools(store);
// let persistStore = persist(devtoolsStore, { name: 'filterSetting'});

export const useFilterStore = create(devtoolsStore);
