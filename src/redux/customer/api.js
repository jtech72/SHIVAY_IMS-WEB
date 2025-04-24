//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getCustomerListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_CUSTOMER_LIST}?search=${search}&page=${page}&limit=${limit}`);
}
function createCustomerApi(params) {
    const { data } = params
    return api.create(URL.CREATE_CUSTOMER, data);
}

function updateCustomerApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_CUSTOMER, data);
}

function deleteCustomerApi(params) {
    const { data } = params
    return api.create(URL.DELETE_CUSTOMER, data);
}

function listingCustomerApi(params) {
    const { data } = params
    return api.get(URL.LISTING_CUSTOMER, data);
}


export {
    getCustomerListApi,
    createCustomerApi,
    updateCustomerApi,
    deleteCustomerApi,
    listingCustomerApi,
};