//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getDispatchListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_DISPATCH}?search=${search}&page=${page}&limit=${limit}`);
}

function createDispatchApi(params) {
    const { data } = params
    return api.create(URL.CREATE_DISPATCH, data);
}

function updateDispatchApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_DISPATCH, data);
}

function deleteDispatchApi(params) {
    const { data } = params
    return api.create(URL.DELETE_DISPATCH, data);
}

function createStockCheckApi(params) {
    const { data } = params
    return api.create(URL.STOCK_CHECK, data);
}

export {
    getDispatchListApi,
    createDispatchApi,
    updateDispatchApi,
    deleteDispatchApi,
    createStockCheckApi
};