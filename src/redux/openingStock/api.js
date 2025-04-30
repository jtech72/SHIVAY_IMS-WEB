//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getStockListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_STOCK_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function createStockApi(params) {
    const { data } = params
    return api.create(URL.CREATE_STOCK, data);
}

function updateStockApi(params) {
    const { data } = params
    return api.create(URL.UPDATE_STOCK, data);
}

export {
    getStockListApi, createStockApi, updateStockApi, 
};