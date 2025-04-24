//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getUsersListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_USERS_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function createUsersApi(params) {
    const { data } = params
    return api.create(URL.CREATE_USERS, data);
}

function updateUsersApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_USERS, data);

}

function deleteUsersApi(params) {
    const { data } = params
    return api.create(URL.DELETE_USERS, data);
}

function listingUsersApi(params) {
    const { data } = params
    return api.get(URL.LISTING_USERS, data);
}

export {
    getUsersListApi,
    createUsersApi,
    updateUsersApi,
    deleteUsersApi,
    listingUsersApi
};