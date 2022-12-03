import create from "zustand";
import roleService from "../services/roleService";

interface AdminRolesStoreType {
    roles: Array<any>;
    privileges: Array<string>;
    adminUsers: Array<any>;
    fetchRoles: () => void;
    isLoading: boolean;
    searchFilter: string;
}

const initialState = {
    roles: [],
    privileges: [],
    adminUsers: [],
    searchFilter: "",
    isLoading: false,
}
const adminRolesStore = create<AdminRolesStoreType>((set) => ({
    ...initialState,
    isLoading: true,
    fetchRoles: async () => {
        await roleService.getRoles().then(({ data }) => {
            set((state) => ({ ...state, roles: data, isLoading: false }));
        }).catch(err => console.log(err.response));

        await roleService.getPrivileges().then(({ data }) => {
            set((state) => ({ ...state, privileges: data }));
        }).catch(err => console.log(err.response));

        await roleService.getAllAdminUsers().then(({ data }) => {
            set((state) => ({ ...state, adminUsers: data }));
        }).catch(err => console.log(err.response));
    }
}));

export default adminRolesStore;
