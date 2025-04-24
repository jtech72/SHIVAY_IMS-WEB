//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getSupplierListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_SUPPLIER_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function createSupplierApi(params) {
    const { data } = params
    return api.create(URL.CREATE_SUPPLIER, data);
}

function updateSupplierApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_SUPPLIER, data);
}

function deleteSupplierApi(params) {
    const { data } = params
    return api.create(URL.DELETE_SUPPLIER, data);
}

function listingSupplierApi(params) {
    const { data } = params
    return api.get(URL.LISTING_SUPPLIER, data);
}

export {
    getSupplierListApi,
    createSupplierApi,
    updateSupplierApi,
    deleteSupplierApi,
    listingSupplierApi,
};