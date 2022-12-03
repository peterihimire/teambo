import http from "./httpService";

// Constants
const getRolesApi = '/roles';
const addRoleApi = '/roles';
const getPrivilegesApi = '/roles/get/privileges';
const getAllAdminUsersApi = '/users/get/admins';
const addAdminUserApi = '/users/add-admin'

export function getRoles() {
    return http.get(getRolesApi);
}
export function addRole(data: any) {
    return http.post(addRoleApi, data);
}

export function getPrivileges() {
    return http.get(getPrivilegesApi);
}

export function getAllAdminUsers() {
    return http.get(getAllAdminUsersApi);
}

export function addAdminUser(data: any) {
    return http.post(addAdminUserApi, data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getRoles, addRole, getPrivileges, getAllAdminUsers, addAdminUser }