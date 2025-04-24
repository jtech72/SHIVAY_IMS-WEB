//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

// Warehouse 

function createWarehouseApi(params) {
    const { data } = params
    return api.create(URL.CREATE_WAREHOUSE, data);
}

function getWarehouseListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_WAREHOUSE_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function updateWarehouseApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_WAREHOUSE, data);
}

function deleteWarehouseApi(params) {
    const { data } = params
    return api.create(URL.DELETE_WAREHOUSE, data);
}

function searchWarehouseApi(params) {
    const { data } = params
    return api.get(URL.SEARCH_WAREHOUSE, data);
}

export {
    createWarehouseApi,
    getWarehouseListApi,
    updateWarehouseApi,
    deleteWarehouseApi,
    searchWarehouseApi
};